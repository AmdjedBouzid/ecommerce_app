import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { UserToken } from "@/app/utils/types";

/**
 * @method POST
 * @route http://localhost:3000/api/addtotoshopeliste
 * @description Add product to to shope  list
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
    const ID_LIST = user.id_tosope_liste as number;
    const [existingProduct]: any = await db.query(
      "SELECT * FROM toshope_store WHERE id_Toshope_Liste = ? AND id_product = ?",
      [ID_LIST, id]
    );

    if (existingProduct.length > 0) {
      return NextResponse.json(
        { message: "Product already exists in the to shope list" },
        { status: 400 }
      );
    }
    await db.query(
      "INSERT INTO toshope_store (id_Toshope_Liste, id_product) VALUES (?, ?)",
      [ID_LIST, id]
    );
    // await db.query(
    //   `UPDATE product SET counter = counter - ${amount} WHERE id =${id} `
    // );
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
 * @method GET
 * @route http://localhost:3000/api/addtotoshopeliste
 * @description Get products in toshope list with their amount
 * @access Public
 */
export async function GET(request: NextRequest) {
  let db;
  try {
    db = await connection.getConnection();
    const NewHeaders = new Headers(request.headers);
    NewHeaders.set("cache-control", "no-cache");
    const authHeader = NewHeaders.get("Authorization");
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

    const user = users[0];
    const ID_LIST = user.id_tosope_liste as number;

    const [products]: any = await db.query(
      `SELECT p.*, ts.amount
         FROM toshope_store ts
         JOIN product p ON ts.id_product = p.id
         WHERE ts.id_Toshope_Liste = ?`,
      [ID_LIST]
    );

    return NextResponse.json(
      { message: "Products fetched successfully", products },
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
 * @route http://localhost:3000/api/addtotoshopeliste
 * @description Get products in toshope list with their amount
 * @access Public
 */
export async function DELETE(request: NextRequest) {
  let db;
  try {
    db = await connection.getConnection();
    const NewHeaders = new Headers(request.headers);
    const authHeader = NewHeaders.get("Authorization");
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

    const user = users[0];
    const ID_LIST = user.id_tosope_liste as number;

    const [toShopeProducts]: any = await db.query(
      `SELECT * FROM toshope_store WHERE id_Toshope_Liste=${ID_LIST} AND id_product =${body.id}`
    );
    if (toShopeProducts.length === 0) {
      return NextResponse.json(
        { message: "Products d'ont existe in your toshope liste " },
        { status: 201 }
      );
    }
    await db.query(
      `DELETE FROM toshope_store WHERE id_Toshope_Liste=${ID_LIST} AND id_Product=${body.id}`
    );
    return NextResponse.json(
      { message: "Product, deleted  successfully" },
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
