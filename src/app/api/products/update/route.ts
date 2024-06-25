import { NextResponse, NextRequest } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { Jwtpaylod } from "@/app/utils/types";
import { cookies } from "next/headers";
/**
 * @method PUT
 * @route http://localhost:3000/api/products/update
 * @description update product
 * @access private
 */
export async function PUT(request: NextRequest) {
  const db = await connection.getConnection();
  const body = await request.json();

  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, "amdjedamdjed05062004") as Jwtpaylod;
    console.log(decoded);
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  if (!decoded.isAdmin) {
    return NextResponse.json({ message: "You are not admin" }, { status: 400 });
  }

  const { name, description, img, counter, price, category, id } = body;

  // Validate input
  if (
    !name ||
    !description ||
    !img ||
    typeof counter !== "number" ||
    typeof price !== "number" ||
    !category ||
    !id
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  // Check if the product exists
  const [existingProductResult]: any = await db.query(
    `SELECT * FROM product WHERE id = ?`,
    [id]
  );

  if (existingProductResult.length === 0) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // Update the product
  try {
    await db.query(
      `UPDATE product SET name = ?, description = ?, img = ?, counter = ?, price = ?, category = ? WHERE id = ?`,
      [name, description, img, counter, price, category, id]
    );

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}
