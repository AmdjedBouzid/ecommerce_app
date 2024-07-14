import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";

/**
 * @method GET
 * @route http://localhost:3000/api/products/[id]
 * @description GET product by id
 * @access private
 */
interface Params {
  id: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  let db;

  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    db = await connection.getConnection();
    const [pro]: any = await db.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);

    if (pro.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const product = pro[0];
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release(); // Ensure the database connection is released
    }
  }
}
