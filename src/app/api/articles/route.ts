import { NextRequest, NextResponse } from "next/server";
import { products } from "@/app/utils/data";
import { z } from "zod";
import { cteatobjectvalidation } from "@/app/utils/validation";
import db from "../../config/db";
/**
 *
 * @method GET
 * @route http://localhost:3000/api/articles
 * @description Get  all articles
 * @access public
 */
export function GET(request: NextRequest) {
  return NextResponse.json(products, { status: 200 });
}

/**
 *
 *
 * @method POST
 * @route http://localhost:3000/api/articles
 * @description Get  all articles
 * @access public
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = cteatobjectvalidation.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { messame: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  const newProduct = {
    id: products.length + 1,
    userId: 101,
    title: body.title,
    body: body.body,
  };
  products.push(newProduct);
  return NextResponse.json({ newProduct }, { status: 201 });
}
