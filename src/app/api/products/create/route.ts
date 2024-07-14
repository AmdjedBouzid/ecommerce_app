import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import { UserDetails, UserToken } from "@/app/utils/types";
import { verifyToken } from "@/app/utils/verifyToken";
import jwt from "jsonwebtoken";
/**
 * @method POST
 * @route http://localhost:3000/api/products/create
 * @description create new product
 * @access public
 */
export async function POST(request: NextRequest) {
  var db;
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
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    if (decoded.isAdmin === false) {
      return NextResponse.json(
        { message: " you are not admin" },
        { status: 400 }
      );
    }
    const { name, description, img, counter, price, category } = body;

    // Validate input
    if (
      !name ||
      !description ||
      !img ||
      typeof counter !== "number" ||
      typeof price !== "number" ||
      !category
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Check if the product already exists
    const [existingProductResult]: any = await db.query(
      `SELECT COUNT(*) AS count FROM product WHERE name = ? AND description = ? AND img = ? AND category = ?`,
      [name, description, img, category]
    );

    const existingProductCount = existingProductResult[0].count;

    if (existingProductCount > 0) {
      // Update the existing product
      await db.query(
        `UPDATE product SET counter = counter + ?, price = ? WHERE name = ? AND description = ? AND img = ? AND category = ?`,
        [counter, price, name, description, img, category]
      );
      db.release();
      return NextResponse.json(
        {
          message: "Product updated successfully",
        },
        { status: 200 }
      );
    } else {
      await db.query(
        "INSERT INTO product (name, description, img, counter, price, category) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, img, counter, price, category]
      );

      return NextResponse.json(
        {
          message: "Product created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    db?.release();
  }
}
