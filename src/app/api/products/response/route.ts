import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { BuyProduct, UserToken } from "@/app/utils/types";
import { getCurrentDateTime } from "@/app/utils/date";

/**
 * @method POST
 * @route http://localhost:3000/api/products/response
 * @description Accept or reject product purchase
 * @access private
 */

export async function POST(request: NextRequest) {
  let db;
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { message: "You must be an admin" },
        { status: 403 }
      );
    }
    db = await connection.getConnection();
    const body = await request.json();
    const { id_product, amount, id_user, date_request, action } = body;

    const [users]: any = await db.query(`SELECT * FROM users WHERE id = ?`, [
      id_user,
    ]);
    const [products]: any = await db.query(
      `SELECT * FROM product WHERE id = ?`,
      [id_product]
    );
    const [productBuyRequest]: any = await db.query(
      `SELECT * FROM product_buyed WHERE id_product = ? AND id_user = ? AND date_request = ?`,
      [id_product, id_user, date_request]
    );

    if (
      users.length === 0 ||
      products.length === 0 ||
      productBuyRequest.length === 0
    ) {
      return NextResponse.json(
        { message: "Product, user, or request not found" },
        { status: 404 }
      );
    }

    const pr = productBuyRequest[0];
    if (pr.Is_Accepted || pr.Is_Regected) {
      return NextResponse.json(
        { message: "Request has already been processed" },
        { status: 400 }
      );
    }

    const currentDateTime = getCurrentDateTime();

    if (action === "accept") {
      await db.query(
        `UPDATE product_buyed SET Is_Accepted = true, In_witing = false, Is_Regected = false, date_accept = ? WHERE id_product = ? AND id_user = ? AND date_request = ?`,
        [currentDateTime, id_product, id_user, date_request]
      );
      await db.query(`UPDATE product SET counter = counter - ? WHERE id = ?`, [
        amount,
        id_product,
      ]);
      const [Remainnig_products]: any = await db.query(
        `SELECT * FROM  product WHERE id =${id_product}`
      );
      const Remainnig_product = Remainnig_products[0];
      if (Remainnig_product.counter === 0) {
        await db.query(`DELETE FROM product WHERE id=${id_product}`);
      }
      return NextResponse.json(
        { message: "Product purchase accepted" },
        { status: 200 }
      );
    } else if (action === "reject") {
      await db.query(
        `UPDATE product_buyed SET Is_Accepted = false, In_witing = false, Is_Regected = true, date_regect = ? WHERE id_product = ? AND id_user = ? AND date_request = ?`,
        [currentDateTime, id_product, id_user, date_request]
      );
      await db.query(`UPDATE TABLE product SET counter=counter+${pr.amount}`);
      return NextResponse.json(
        { message: "Product purchase rejected" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    db?.release();
  }
}
