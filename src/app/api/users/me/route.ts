import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connection from "@/app/config/db";
import { Jwtpaylod, UserDetails } from "@/app/utils/types";
import bcrypt from "bcryptjs";
/**
 * @method GET
 * @route http://localhost:3000/api/users/me
 * @description Get a user
 * @access Public
 */
export async function GET(request: NextRequest) {
  const db = await connection.getConnection();

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header is missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;
  try {
    const decoded = jwt.verify(token, token_password) as Jwtpaylod;

    const [user]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const UserFinded = user[0];

    return NextResponse.json({ UserFinded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

/**
 * @method PUT
 * @route http://localhost:3000/api/users/me
 * @description update a user
 * @access Public
 */
export async function PUT(request: NextRequest) {
  const db = await connection.getConnection();

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header is missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;
  try {
    const decoded = jwt.verify(token, token_password) as Jwtpaylod;

    const [user]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const UserFinded = user[0] as UserDetails;

    const body = await request.json();
    var { name, email, phoneNumber, oldPassword, newPassword, img } = body;
    if (name === "") {
      name = UserFinded.name;
    }
    if (email === "") {
      email = UserFinded.email;
    }
    if (phoneNumber === "") {
      phoneNumber = UserFinded.phone_number;
    }
    if (img === "") {
      img = UserFinded.img_profile;
    }
    if (newPassword === "") {
      oldPassword = UserFinded.password;
      await db.query(
        "UPDATE users SET name=?, email=?, img_profile=?, phone_number=? WHERE id=?",
        [name, email, img, phoneNumber, UserFinded.id]
      );
      const [UserUpdatedList]: any = await db.query(
        "SELECT * FROM users WHERE id=?",
        [UserFinded.id]
      );
      const UserApdated = UserUpdatedList[0];
      return NextResponse.json(
        {
          message: "your profile are updated suxasfully etuk,ytkuetgil.",
          UserApdated: UserApdated,
        },
        { status: 200 }
      );
    } else {
      if (oldPassword === "") {
        return NextResponse.json(
          { message: "set the old password" },
          { status: 400 }
        );
      } else {
        const isValidPassword = await bcrypt.compare(
          oldPassword,
          UserFinded.password
        );
        const Salt_Number = process.env.NEXT_PUBLIC_SALT_NUMBER as string;
        const salt = await bcrypt.genSalt(parseInt(Salt_Number));
        const hashpassword = await bcrypt.hash(newPassword, salt);
        console.log(hashpassword);
        if (isValidPassword) {
          const Salt_Number = process.env.NEXT_PUBLIC_SALT_NUMBER as string;
          const salt = await bcrypt.genSalt(parseInt(Salt_Number));
          const hashpassword = await bcrypt.hash(newPassword, salt);

          await db.query(
            "UPDATE users SET name=?, email=?, img_profile=?, phone_number=?,password=?  WHERE id=?",
            [name, email, img, phoneNumber, hashpassword, UserFinded.id]
          );
          const [UserUpdatedList]: any = await db.query(
            "SELECT * FROM users WHERE id=?",
            [UserFinded.id]
          );
          const UserApdated = UserUpdatedList[0];
          return NextResponse.json(
            {
              message: "your profile are updated suxasfully",
              UserApdated: UserApdated,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              message: "your old password is incorrect",
            },
            { status: 400 }
          );
        }
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
