import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connection from "@/app/config/db";
import { UserToken } from "@/app/utils/types";

/**
 * @method GET
 * @route http://localhost:3000/api/products/getrequestes
 * @description Request to buy product
 * @access public
 */
export async function GET(request: NextRequest) {
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
    const [requests]: any = await db.query(
      `SELECT * FROM product_buyed WHERE In_witing = TRUE`
    );

    return NextResponse.json(
      { message: "Requests fetched successfully", requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (db) db.release(); // Ensure the database connection is released
  }
}
