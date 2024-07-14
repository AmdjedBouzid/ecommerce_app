import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { UserToken } from "@/app/utils/types";

/**
 * @method POST
 * @route http://localhost:3000/api/addtofavorate
 * @description Add product to favorite list
 * @access Public
 */
export async function POST(request: NextRequest) {
  let db;
  try {
    db = await connection.getConnection();

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded: UserToken;

    try {
      decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const [users]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (users.length === 0) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    const body = await request.json();
    const { id } = body;
    const [Products]: any = await db.query(
      `SELECT * FROM product WHERE id=${id}`
    );
    if (Products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }
    const user = users[0];
    const ID_LIST = user.id_list as number;
    const [Existe_Products]: any = await db.query(
      `SELECT * FROM store WHERE id_list=${ID_LIST} AND id_product=${id}`
    );
    if (Existe_Products.length > 0) {
      return NextResponse.json(
        {
          message: "product existe in your favorate liste",
        },
        { status: 201 }
      );
    }
    await db.query("INSERT INTO store (id_list, id_product) VALUES (?, ?)", [
      ID_LIST,
      id,
    ]);

    return NextResponse.json(
      { message: "Product added to favorite list" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}

/**
 * @method DELETE
 * @route http://localhost:3000/api/addtofavorate
 * @description delete product from favorite list
 * @access Public
 */
export async function DELETE(request: NextRequest) {
  let db;
  try {
    db = await connection.getConnection();

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded: UserToken;

    try {
      decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const [users]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (users.length === 0) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    const body = await request.json();
    const { id } = body;
    const [Products]: any = await db.query(
      `SELECT * FROM product WHERE id=${id}`
    );
    if (Products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }
    const user = users[0];
    const ID_LIST = user.id_list as number;
    const [Existe_Products]: any = await db.query(
      `SELECT * FROM store WHERE id_list=${ID_LIST} AND id_product=${id}`
    );
    if (Existe_Products.length === 0) {
      return NextResponse.json(
        {
          message: "product dont't existe in your favorate liste",
        },
        { status: 201 }
      );
    }
    await db.query("DELETE FROM store WHERE id_list = ? AND id_product = ?", [
      ID_LIST,
      id,
    ]);

    return NextResponse.json(
      { message: "Product deleted from favorite list" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
