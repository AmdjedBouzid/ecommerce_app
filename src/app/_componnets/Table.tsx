"use client";
import React, { useState, useEffect } from "react";
import Row from "./Row";
import FormProductUpdate from "@/app/Administration/_administrationComponnets/FormProductUpdate";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@nextui-org/react";
import DropeDownNextUi from "./DropeDownNextUi";
import { useAppContext } from "@/context/login";
import DropDownNextUISearch from "./DropDownNextUISearch";
import Product from "../../../Nouveau dossier/next-ts-ecommerce-master/models/Product";
interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  counter: number;
  category: string;
}

const Table = () => {
  const router = useRouter();
  const { products, setProducts } = useAppContext();
  // set categories in arry
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setcategory] = useState("All");
  //..............................................................
  const [SearcheBy, SetSearcheBy] = useState("NAME");
  const [SearchInput, SetSearchInput] = useState("");
  console.log(SearcheBy);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${DOMAIN}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        console.log("Fetched products:", data.products);
      } else {
        console.log("Failed to get products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const [filterProduct, SetFilterProduct] = useState<Product[]>();
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedProduct(null);
  };
  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setShowUpdateForm(false);
    setSelectedProduct(null);
  };

  const HundlefilterProducts = (category: string) => {
    if (category === "All") {
      SetFilterProduct(products);
    }
    const filtered: Product[] = products.filter(
      (product) => product.category === category
    );
    SetFilterProduct(filtered);
  };
  const HundlerInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetSearchInput(e.target.value);
    // if (category === "All") {
    //   SetFilterProduct(products.filter((p) => true));
    //   console.log("filtred", filterProduct);
    // }
    // var filtred2 = filterProduct as Product[];
    // if (SearcheBy === "NAME") {
    //   SetFilterProduct(filtred2.filter((p) => p.name.includes(SearchInput)));
    //   console.log(filterProduct);
    // }
    // if (SearcheBy === "PRICE") {
    //   SetFilterProduct(
    //     filtred2.filter((p) => p.price === parseFloat(SearchInput))
    //   );
    // }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "50px",
          paddingRight: "50px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DropeDownNextUi
          categories={categories}
          hunlelfilter={HundlefilterProducts}
          setcategory={setcategory}
        />
        <div
          className="flex  flex-nowrap md:flex-nowrap "
          style={{ alignItems: "center" }}
        >
          <Input
            type="email"
            label="Searche"
            style={{ height: "30px", display: "flex", justifyContent: "end" }}
            value={SearchInput}
            onChange={HundlerInputChage}
          />
          <DropDownNextUISearch SetSearcheBy={SetSearcheBy} />
        </div>
      </div>
      {showUpdateForm && selectedProduct && (
        <FormProductUpdate
          product={selectedProduct}
          onClose={handleCloseUpdateForm}
          onUpdateState={handleProductUpdate}
        />
      )}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-primary">
              Name of product
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-primary">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-primary">
              Amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-primary">
              Image
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-primary">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!Array.isArray(filterProduct) ||
          filterProduct === undefined ||
          filterProduct.length === 0
            ? Array.isArray(products) &&
              products.map((product) => (
                <Row
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  onUpdate={handleUpdateClick}
                />
              ))
            : Array.isArray(filterProduct) &&
              filterProduct.map((product) => (
                <Row
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  onUpdate={handleUpdateClick}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
