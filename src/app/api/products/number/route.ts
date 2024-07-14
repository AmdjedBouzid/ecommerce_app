import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
/**
 * @method GET
 * @route http://localhost:3000/api/products/number
 * @description GET  number of products
 * @access public
 */

export async function GET(request: NextRequest) {
  var db;
  try {
    db = await connection.getConnection();
    const NewHeaders = new Headers(request.headers);
    NewHeaders.set("cache-control", "no-cache");
    const [products]: any = await db.query("SELECT * FROM product ");
    const numberOfProducts = products.length as number;

    return NextResponse.json(
      { message: "products fetched successfully", numberOfProducts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    if (db) {
      db.release();
    }
  }
}
