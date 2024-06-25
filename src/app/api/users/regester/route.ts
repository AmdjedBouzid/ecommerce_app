// import { LeanDocument } from 'mongoose';
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { regester } from "@/app/utils/validation";
import connection from "@/app/config/db";
import { any, array, number, string } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Jwtpaylod } from "@/app/utils/types";
const secret = process.env.JWT_SECRET || "your-256-bit-secret";
import { jeneratejwt } from "@/app/utils/jenerateToken";
interface jwtpailodUser {
  id: number;
  email: string;
  isAdmin: boolean;
}

/**

 * @method POST
 * @route http://localhost:3000/api/users/regester
 * @description register a user
 * @access public 
 */

export async function POST(request: NextRequest) {
  try {
    const db = await connection.getConnection();
    const bady = await request.json();
    const validation = regester.safeParse(bady);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const [User, quary]: any = await db.query(
      `SELECT * FROM users WHERE email = '${bady.email}'`
    );
    if (User.length > 0) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    } else {
      const Salt_Number = process.env.NEXT_PUBLIC_SALT_NUMBER as string;
      const salt = await bcrypt.genSalt(parseInt(Salt_Number));
      const hashpassword = await bcrypt.hash(bady.password, salt);

      db.query(
        `INSERT INTO users (name, email, password) VALUES ('${bady.username}', '${bady.email}', '${hashpassword}')`
      );
      const [User]: any = await db.query(
        `SELECT * FROM users WHERE email = '${bady.email}'`
      );
      const jwtPayloadUser: Jwtpaylod = {
        id: User.id,
        email: User.email,
        isAdmin: User.isAdmin,
        password: User.password,
      };

      const token = jeneratejwt(jwtPayloadUser);
      console.log(token);
      return NextResponse.json(
        {
          message: "sucsusful",
          user: { name: bady.username, email: bady.email },
          token: token,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "error " }, { status: 500 });
  }
}
