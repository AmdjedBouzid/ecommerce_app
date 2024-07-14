import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";

/**
 * @method GET
 * @route http://localhost:3000/api/products/categories
 * @description GET all categories
 * @access public
 */
export async function GET(request: NextRequest) {
  var db;
  try {
    db = await connection.getConnection();

    // Query to get all distinct categories from the product table
    const [categories]: any = await db.query(
      "SELECT DISTINCT category FROM product"
    );

    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
