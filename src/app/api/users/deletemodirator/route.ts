import { json } from "stream/consumers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connection from "@/app/config/db";
import { UserDetails, UserToken } from "@/app/utils/types";

/**
 * @method PUT
 * @route http://localhost:3000/api/users/deletemodirator
 * @description Set   moderator as simple user
 * @access Super Admin
 */
export async function PUT(request: NextRequest) {
  let db;
  try {
    db = await connection.getConnection();
    const body = await request.json();

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    const JWT_PASSWORD = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_PASSWORD) as UserToken;

    if (!decoded.IsSuperAdmin) {
      return NextResponse.json(
        { message: "You are not a super admin" },
        { status: 403 }
      );
    }
    const { id } = body;
    const [users]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    const UserFinded = users[0] as UserDetails;
    if (UserFinded.isAdmin === false) {
      return NextResponse.json(
        {
          message: `User ${decoded.name} is early simple user`,
        },
        { status: 200 }
      );
    }
    await db.query(
      `UPDATE users SET isAdmin = FALSE WHERE id = ${UserFinded.id}`
    );
    const [UsersModified]: any = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [UserFinded.id]
    );
    const UserModified = UsersModified[0] as UserDetails;
    return NextResponse.json(
      {
        message: `User ${UserModified.name} has been modified to simple user`,
        UserModified,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
