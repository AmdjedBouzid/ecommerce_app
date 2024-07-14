import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";

/**
 * @method GET
 * @route http://localhost:3000/api/products/pagination?pagenumber=?&category=
 * @description GET products with pagination
 * @access private
 */
export async function GET(request: NextRequest) {
  var db;
  try {
    db = await connection.getConnection();
    const NewHeaders = new Headers(request.headers);
    NewHeaders.set("cache-control", "no-cache");

    const pageNumber = request.nextUrl.searchParams.get("pagenumber") || "0";
    const category = request.nextUrl.searchParams.get("category") || "All";
    const page = parseInt(pageNumber) || 0;
    const pageSize = 6;
    const offset = page * pageSize;

    let ProductPagination: any;
    let NumberOfProducts: number;

    if (category === "All") {
      [ProductPagination] = await db.query(
        "SELECT * FROM product LIMIT ? OFFSET ?",
        [pageSize, offset]
      );
    } else {
      [ProductPagination] = await db.query(
        "SELECT * FROM product WHERE category = ? LIMIT ? OFFSET ?",
        [category, pageSize, offset]
      );
    }

    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products: ProductPagination,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products with pagination:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  } finally {
    if (db) {
      db.release();
    }
  }
}
