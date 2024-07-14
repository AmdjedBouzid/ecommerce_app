import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";

/**
 * @method GET
 * @route http://localhost:3000/api/category/[cat]
 * @description GET product by id
 * @access private
 */
interface params {
  cat: string;
}
export async function GET(request: NextRequest, { params }: any) {
  var db;
  try {
    if (!params.cat) {
      return NextResponse.json(
        { error: "Product category is required" },
        { status: 400 }
      );
    }
    //id
    db = await connection.getConnection();
    const [product]: any = await db.query(
      "SELECT * FROM product WHERE category = ?",
      [params.cat]
    );
    // // db.release(); // Release the database connection

    if (product.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
