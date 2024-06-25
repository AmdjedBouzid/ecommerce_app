import { NextRequest, NextResponse } from "next/server";
import { products } from "../../../utils/data";
import { request } from "http";
/**
 *
 * @method GET
 * @route http://localhost:3000/api/articles/:id
 * @description Get  single  article by  id
 * @access public
 */

export function GET(request: NextRequest, props: any) {
  const product = products.find((product) => product.id == +props.params.id);
  if (product) return NextResponse.json(product, { status: 200 });

  return NextResponse.json(
    { messge: `error the product with id=${+props.params.id} not existed` },
    { status: 404 }
  );
}

/**
 *
 * @method PUT
 * @route http://localhost:3000/api/articles/:id
 * @description update article
 * @access public
 */

export async function PUT(request: NextRequest, props: any) {
  const product = products.find((product) => product.id == +props.params.id);
  if (product) {
    const body = await request.json();
    console.log(body);
    return NextResponse.json({ message: "update sucssusful" }, { status: 200 });
  }

  return NextResponse.json(
    { messge: `error the product with id=${+props.params.id} not existed` },
    { status: 404 }
  );
}
