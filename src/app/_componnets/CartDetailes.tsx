"use client";
import React, { useEffect, useState } from "react";
import CarteDetaillesItem from "./CarteDetaillesItem";
import { useAppContext } from "@/context/login";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Product } from "../utils/types";
import { DOMAIN } from "../utils/constants";

function CartDetailes() {
  const router = useRouter();
  const {
    ProductToshope,
    TotalPrice,
    SetTotalPrice,
    numberOfProducts,
    SetProductToshope,
  } = useAppContext();
  useEffect(() => {
    router.refresh();
  }, [ProductToshope]);
  // const totalProducts = ProductToshope?.length || 0;
  const [totl, settotal] = useState(0);
  const [FinelNumberOfProducts, SetFinelNumberOfProducts] = useState(0);
  useEffect(() => {
    const s = TotalPrice.reduce((acc, curr) => acc + curr.price, 0);
    settotal(s);
    const f = numberOfProducts.reduce((acc, curr) => acc + curr.amount, 0);
    SetFinelNumberOfProducts(f);
  }, [TotalPrice, numberOfProducts, ProductToshope]);

  console.log(numberOfProducts);

  const [DeleteFaforateSpinner, SetDeleteFaforateSpinner] = useState(false);
  const handleCheckout = async () => {
    try {
      SetDeleteFaforateSpinner(true);
      const Token = window.localStorage.getItem("Token");

      const response = await axios.post(
        `${DOMAIN}/api/products/buy`,
        {
          numberOfProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      SetDeleteFaforateSpinner(false);
      console.log(response);
      if (response.status === 200) {
        const inptu: Product[] = [];
        SetProductToshope(inptu);
        toast.success(response.data.message);
      } else {
        toast.success("error buing products");
      }
    } catch (error) {
      console.error(error); // Consider adding error handling here
      toast.success("error buing products");
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {ProductToshope &&
                ProductToshope.map((product) => (
                  <CarteDetaillesItem key={product.id} product={product} />
                ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Number of Products</dt>
                    <dd>{FinelNumberOfProducts}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Total Price</dt>
                    <dd>{totl}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">
                      2 Discounts Applied
                    </p>
                  </span>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleCheckout}
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartDetailes;
