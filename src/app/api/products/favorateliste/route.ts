import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { UserToken } from "@/app/utils/types";

/**
 * @method GET
 * @route http://localhost:3000/api/products/favorateliste
 * @description get products of favorite list
 * @access Public
 */
export async function GET(request: NextRequest) {
  var db;

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
    const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    const [users]: any = await db.query(
      `SELECT * FROM users WHERE id=${decoded.id}`
    );
    if (users.length === 0) {
      return NextResponse.json({ message: "no users found" }, { status: 400 });
    }
    const USER = users[0];
    const ID_LIST = USER.id_list;

    const [products]: any = await db.query(
      `SELECT p.*
       FROM product p
       JOIN store s ON p.id = s.id_product
       JOIN list_favorite lf ON s.id_list = lf.id
       WHERE lf.id = ?`,
      [ID_LIST]
    );

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    if (db) {
      db.release();
    }
  }
}
