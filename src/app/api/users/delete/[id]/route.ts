import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import { UserDetails, UserToken } from "@/app/utils/types";
import jwt from "jsonwebtoken";
/**
 * @method DELETE
 * @route http://localhost:3000/api/users/delete/[id]
 * @description delete user
 * @access Private for super admin
 */
interface params {
  id: number;
}
export async function DELETE(request: NextRequest, { params }: any) {
  var db;
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
    const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    if (decoded.isAdmin === false || decoded.IsSuperAdmin === false) {
      return NextResponse.json(
        { message: " you are not admin" },
        { status: 400 }
      );
    }
    const [user]: any = await db.query(
      `SELECT * FROM users  WHERE id = ${params.id}`
    );

    if (user.length === 0) {
      return NextResponse.json(
        {
          messahe: `user with id=${params.id} don't exist`,
        },
        { status: 404 }
      );
    } else {
      const User = user[0] as UserDetails;

      if (User.IsSuperAdmin) {
        return NextResponse.json(
          { message: "you can not delete super admin" },
          { status: 404 }
        );
      }
    }

    if (decoded.id === parseInt(params.id)) {
      return Response.json(
        { message: "you can not delete your self" },
        { status: 404 }
      );
    }
    await db.query(`DELETE FROM users WHERE  id= ${parseInt(params.id)}`);
    return Response.json(
      { message: "user deleted suxasfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  } finally {
    if (db) {
      db.release();
    }
  }
}
