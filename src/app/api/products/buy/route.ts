import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { BuyProduct, UserToken } from "@/app/utils/types";
import { getCurrentDateTime } from "@/app/utils/date";
import { Item } from "@radix-ui/react-dropdown-menu";

/**
 * @method POST
 * @route http://localhost:3000/api/products/buy
 * @description Request to buy product
 * @access public
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

    db = await connection.getConnection();

    const [users]: any = await db.query(`SELECT * FROM users WHERE id = ?`, [
      decoded.id,
    ]);

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    const user = users[0];
    const ID_LIST = user.id_tosope_liste;
    console.log("id of liste", ID_LIST);
    const body = await request.json();

    for (const item of body.numberOfProducts) {
      const { id, amount } = item;
      console.log({ id, amount });
      const [products]: any = await db.query(
        `SELECT * FROM product WHERE id = ?`,
        [id]
      );

      if (products.length === 0) {
        return NextResponse.json(
          { message: `Product with id ${id} not found` },
          { status: 404 }
        );
      }

      const product = products[0];

      if (product.counter < amount) {
        return NextResponse.json(
          { message: `Not enough stock for product id ${id}` },
          { status: 400 }
        );
      }

      const dateRequest = getCurrentDateTime();

      await db.query(
        `INSERT INTO product_buyed (id_user, id_product, amount, date_request, In_witing) VALUES (?, ?, ?, ?, ?)`,
        [user.id, id, amount, dateRequest, true]
      );
      await db.query(
        `DELETE FROM toshope_store WHERE id_Toshope_Liste = ? AND id_product = ? AND amount IS NULL`,
        [ID_LIST, id]
      );
    }

    return NextResponse.json(
      { message: "Products successfully bought" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error processing the request:", error);
    return NextResponse.json(error);
  } finally {
    if (db) db.release();
  }
}
