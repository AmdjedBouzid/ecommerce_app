import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connection from "@/app/config/db";
import { UserDetails, UserToken } from "@/app/utils/types";
import bcrypt from "bcryptjs";
/**
 * @method GET
 * @route http://localhost:3000/api/users/me
 * @description Get actual user
 * @access Public
 */
export async function GET(request: NextRequest) {
  var db = await connection.getConnection();
  const NewHeaders = new Headers(request.headers);
  NewHeaders.set("cache-control", "no-cache");
  const authHeader = NewHeaders.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header is missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;
  try {
    const decoded = jwt.verify(token, token_password) as UserToken;

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
  } finally {
    if (db) {
      db.release();
    }
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
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header is missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const token_password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;

  try {
    const decoded = jwt.verify(token, token_password) as UserToken;
    const [user]: any = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (!user.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const UserFinded = user[0] as UserDetails;
    const body = await request.json();
    let { name, email, phoneNumber, oldPassword, newPassword, img } = body;

    name = name || UserFinded.name;
    email = email || UserFinded.email;
    phoneNumber = phoneNumber || UserFinded.phone_number;
    img = img || UserFinded.img_profile;
    console.log(email);
    if (newPassword) {
      if (!oldPassword) {
        return NextResponse.json(
          { message: "Old password is required" },
          { status: 400 }
        );
      }

      const isValidPassword = await bcrypt.compare(
        oldPassword,
        UserFinded.password
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 400 }
        );
      }

      const saltRounds = parseInt(
        process.env.NEXT_PUBLIC_SALT_NUMBER as string
      );
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.query(
        "UPDATE users SET name=?, email=?, img_profile=?, phone_number=?, password=? WHERE id=?",
        [name, email, img, phoneNumber, hashedPassword, UserFinded.id]
      );
    } else {
      await db.query(
        "UPDATE users SET name=?, email=?, img_profile=?, phone_number=? WHERE id=?",
        [name, email, img, phoneNumber, UserFinded.id]
      );
    }

    const [UserUpdatedList]: any = await db.query(
      "SELECT * FROM users WHERE id=?",
      [UserFinded.id]
    );
    const UserUpdated = UserUpdatedList[0];

    return NextResponse.json(
      { message: "Profile updated successfully", UserUpdated },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating profile", error },
      { status: 500 }
    );
  } finally {
    db.release();
  }
}
