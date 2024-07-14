// import { LeanDocument } from 'mongoose';
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { regester } from "@/app/utils/validation";
import connection from "@/app/config/db";
import { any, array, number, string } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDetails, UserToken } from "@/app/utils/types";
const secret = process.env.JWT_SECRET || "your-256-bit-secret";
import { jeneratejwt } from "@/app/utils/jenerateToken";

/**

 * @method POST
 * @route http://localhost:3000/api/users/regester
 * @description register a user
 * @access public 
 */

export async function POST(request: NextRequest) {
  var db;
  try {
    db = await connection.getConnection();
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
        `INSERT INTO users (name, email, password,img_profile) VALUES ('${bady.username}', '${bady.email}', '${hashpassword}','data:image/jpeg;base64,/9j/4AAQSkZJR
        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')`
      );
      const [User]: any = await db.query(
        `SELECT * FROM users WHERE email = '${bady.email}'`
      );

      const jwtPayloadUser: UserToken = {
        id: User[0].id,
        email: User[0].email,
        isAdmin: User[0].isAdmin,

        phone_number: User[0].phone_number,

        name: User[0].name,

        IsSuperAdmin: User[0].IsSuperAdmin,
      };

      await db.query(
        `INSERT INTO list_favorite (iduser) VALUES (${jwtPayloadUser.id})`
      );
      const [listes]: any = await db.query(
        `SELECT * FROM list_favorite WHERE iduser=${jwtPayloadUser.id}`
      );
      if (listes.length === 0) {
        return NextResponse.json(
          { message: "Error creating favorite list" },
          { status: 400 }
        );
      }
      const LISTE = listes[0];
      await db.query(
        `UPDATE users SET id_list = ${LISTE.id} WHERE id=${jwtPayloadUser.id}`
      );
      //---------------------------------------------------------

      await db.query(
        `INSERT INTO toshope_liste (iduser) VALUES (${jwtPayloadUser.id})`
      );
      const [toshope_liste]: any = await db.query(
        `SELECT * FROM toshope_liste WHERE iduser=${jwtPayloadUser.id}`
      );
      if (toshope_liste.length === 0) {
        return NextResponse.json(
          { message: "Error creating favorite list" },
          { status: 400 }
        );
      }
      const TOSHOPE_LISTE = toshope_liste[0];
      await db.query(
        `UPDATE users SET id_tosope_liste = ${TOSHOPE_LISTE.id} WHERE id=${jwtPayloadUser.id}`
      );
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
    return NextResponse.json({ message: "error ", error }, { status: 500 });
  } finally {
    if (db) {
      db.release();
    }
  }
}
