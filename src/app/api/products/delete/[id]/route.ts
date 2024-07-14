import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import { verifyToken } from "@/app/utils/verifyToken";
import { UserDetails, UserToken } from "@/app/utils/types";
import jwt from "jsonwebtoken";
import { boolean } from "zod";
/**
 * @method DELETE
 * @route http://localhost:3000/api/products/delete/[id]
 * @description DELETE product by id
 * @access private
 */
export async function DELETE(request: NextRequest, { params }: any) {
  var db;
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImVtYWlsIjoiYW1kamVkM0BnbWFpbC5jb20iLCJpc0FkbWluIjowLCJwYXNzd29yZCI6IiQyYSQxMCR5bjZGM3pWL3loQS5jRnZ3OG03OUh1VjFienZ4cTJmR0FpbVgyR1Q3SzVRY3RmcWtidTdYdSIsImlhdCI6MTcxNzk4MDgzNiwiZXhwIjoxNzE5NzA4ODM2fQ.8q58Q_hCDq-kQEP53m9xHS1KCBdeJvOlhb49SoOkDzw
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { message: " you are not admin" },
        { status: 400 }
      );
    }

    db = await connection.getConnection();

    const [products]: any = await db.query(
      `SELECT * FROM product WHERE id = ?`,
      [params.id]
    );

    if (products.length > 0) {
      await db.query(`DELETE FROM product WHERE id = ?`, [params.id]);
      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Product does not exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
