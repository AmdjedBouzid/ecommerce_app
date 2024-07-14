import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
import jwt from "jsonwebtoken";
import { UserToken } from "@/app/utils/types";
/**
 * @method GET
 * @route http://localhost:3000/api/products/all
 * @description GET all products
 * @access public
 */
export async function GET(request: NextRequest) {
  var db;
  try {
    db = await connection.getConnection();

    const NewHeaders = new Headers(request.headers);
    NewHeaders.set("cache-control", "no-cache");
    // const authHeader = NewHeaders.get("Authorization");
    // if (!authHeader) {
    //   return NextResponse.json(
    //     { message: "No token provided" },
    //     { status: 400 }
    //   );
    // }
    // const token = authHeader.split(" ")[1];
    // const decoded = jwt.verify(token, "amdjedamdjed05062004") as UserToken;
    // if (decoded.isAdmin === false) {
    //   return NextResponse.json(
    //     { message: " you are not admin" },
    //     { status: 400 }
    //   );
    // }
    const [allProducts]: any = await db.query("SELECT * FROM product");
    // const allProduct = allProducts[0];
    return NextResponse.json({ products: allProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
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
