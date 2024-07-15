"use client";
import ProductsContainerDetailes from "../../Products/_ProductsComponnets/ProductsContainerDetailes";
import { useState, useEffect } from "react";
import styles from "./productdetailles.module.css"; // Correct import for CSS modules
import { BadgeDollarSign, Heart, Salad } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { Product } from "@/app/utils/types";
import { Button, Spinner } from "@nextui-org/react";
import { Sparkle } from "lucide-react";
import axios from "axios";
import { headers } from "next/headers";
import { toast } from "react-toastify";

import { useAppContext } from "@/context/login";
import { HeartIcon } from "@/app/_componnets/HeartIcon";
import { DOMAIN } from "@/app/utils/constants";
interface ProductDetailsProps {
  params: {
    id: number;
  };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  console.log(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const path = usePathname().split("/");
  const [Add_To_favorate_Spinner, Set_Add_To_favorate_Spinner] =
    useState(false);
  useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/products/${params.id}`);
        const data = await res.json();
        console.log(data.product);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/products/all`);
        const data = await res.json();
        setProducts(data.products);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchProducts();
  }, [params.id]);

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  const filteredProducts =
    products &&
    products.filter(
      (pro) => pro.category === product?.category && pro.id !== product.id
    );
  // const [Add_To_favorate_Spinner, Set_Add_To_favorate_Spinner] =
  //   useState(false);
  const HundlerAddtoFavorate = async (id: number) => {
    const Token = window.localStorage.getItem("Token");

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
    <div className={styles.productDetails}>
      <nav aria-label="Breadcrumb" className="flex mb-10">
        <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
          <li className="flex items-center">
            <a
              href="/"
              className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ms-1.5 text-xs font-medium"> Home </span>
            </a>
          </li>
          <li className="relative flex items-center">
            <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
            <p className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
              {path[1]}
            </p>
          </li>
          <li className="relative flex items-center">
            <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
            <p className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900">
              {path[2]}
            </p>
          </li>
        </ol>
      </nav>
      <div className={styles.top}>
        <div className={styles.leftimage}>
          <img src={product?.img} height={400} width={400} alt="image" />
        </div>
        <div className={styles.right}>
          <div className={styles.flowroot}>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Product</dt>
                <dd className="text-gray-700 sm:col-span-2">{product?.name}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Category</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {product?.category}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Price</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {product?.price}
                  <BadgeDollarSign color="#9d0b0b" strokeWidth={0.5} />
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Description</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {product?.description}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">
                  {" "}
                  {/* <Button
                    className="flex center"
                    color="danger"
                    variant="bordered"
                    startContent={Add_To_favorate_Spinner ? <Sparkle /> : <></>}
                    onClick={() => HundlerAddtoFavorate(params.id)}
                  >
                    {Add_To_favorate_Spinner ? (
                      <Spinner
                        label="Loading..."
                        color="warning"
                        className="mt-3"
                      />
                    ) : (
                      "Add to favorites"
                    )}
                  </Button> */}
                  <Button
                    onClick={() => HundlerAddtoFavorate(params.id)}
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
                </dt>{" "}
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="bottom" style={{ marginTop: "50px", padding: "40px" }}>
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Similar Products
        </h2>
        {filteredProducts.length > 0 ? (
          <ProductsContainerDetailes products={filteredProducts} />
        ) : (
          <h3>No product with this category</h3>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
