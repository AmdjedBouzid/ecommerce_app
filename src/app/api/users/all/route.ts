import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { UserDetails, UserToken } from "@/app/utils/types";
import { number } from "zod";
/**
 * @method GET
 * @route http://localhost:3000/api/users/all
 * @description Get all users
 * @access Private
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
    if (decoded.isAdmin === false) {
      return NextResponse.json(
        { message: " you are not admin" },
        { status: 400 }
      );
    }
    const [users] = await db.query("SELECT * FROM users");
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching users" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
