import styles from "../products.module.css";
import { CircleDollarSign, Heart } from "lucide-react";
import { Shapes } from "lucide-react";
import Link from "next/link";
import { Button, Spinner } from "@nextui-org/react";
interface product {
  product: Product;
}
import { Product } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
function ProductCarde({ product }: product) {
  const [Add_To_favorate_Spinner, Set_Add_To_favorate_Spinner] =
    useState(false);
  const router = useRouter();
  const description = " adipisicing elit. Illoculpa" as string;
  const HundlerAddtoFavorate = async (id: number) => {
    const Token = window.localStorage.getItem("Token");
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

    try {
      Set_Add_To_favorate_Spinner(true);
      const response = await axios.post(
        `${DOMAIN}/api/addtofavorate`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      Set_Add_To_favorate_Spinner(false);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      Set_Add_To_favorate_Spinner(false);
      toast.error(error.data.message);
    }
  };
  return (
    <div className={styles.productcard}>
      <img
        alt=""
        src={product.img}
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-2">
        <dl>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between ",
              alignItems: "center",
            }}
          >
            <p className="text-lg font-semibold ">{product.name}</p>
            <div
              className="text-sm text-primary flex "
              style={{ alignItems: "center" }}
            >
              <h6 className="mr-2"> {product.price}</h6>
              <CircleDollarSign />
            </div>
          </div>

          <div>
            <p className="font-medium overflow-hidden h-9 text-small">
              {product.description}
            </p>
          </div>
        </dl>

        <div className=" flex items-center gap-8 text-xs">
          {/* <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Parking</p>

              <p className="font-medium">2 spaces</p>
            </div>
          </div> */}

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div
              className="mt-1.5 sm:mt-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <p className="text-gray-500 ">{product.category}</p>

              <p className="font-medium">
                <Shapes />
              </p>
            </div>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 items-center">
            <Button
              onClick={() => HundlerAddtoFavorate(product.id)}
              isIconOnly
              color="danger"
              aria-label="Like"
              disabled={Add_To_favorate_Spinner}
            >
              {Add_To_favorate_Spinner ? (
                <Spinner color="default" className="" />
              ) : (
                <Heart />
              )}
            </Button>
          </div>
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div
              className=" sm:mt-0"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Button
                onClick={() => {
                  router.replace(`/ProductDetailles/${product.id}`);
                }}
                radius="full"
                className="bg-primary text-white shadow-lg"
              >
                detailles
              </Button>
            </div>
          </div>

          {/* <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bedroom</p>

              <p className="font-medium">4 rooms</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCarde;
