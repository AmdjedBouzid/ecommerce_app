import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";

/**
 * @method GET
 * @route http://localhost:3000/api/products
 * @description GET all products
 * @access private
 */
export async function GET(request: NextRequest) {
  try {
    const db = await connection.getConnection();
    const [allProducts] = await db.query("SELECT * FROM product");
    // db.release(); // Release the database connection
    return NextResponse.json({ products: allProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
