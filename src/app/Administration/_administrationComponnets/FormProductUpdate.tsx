"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import UmptiInput from "./umptiInput";
import { Flag } from "lucide-react";
import styles from "./administration.module.css";
import { CircleX } from "lucide-react";
import Image from "next/image";

interface UmptiInputProps {
  response: { success: boolean; message: string };
}
interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  counter: number;
  category: string;
}
interface FormProductUpdateProps {
  product: Product;
  onClose: () => void;
  onUpdateState: (product: Product) => void;
}

const FormProductUpdate: React.FC<FormProductUpdateProps> = ({
  product,
  onClose,
  onUpdateState,
}) => {
  const [name, setName] = useState(product.name);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [img, setimg] = useState<string>("");
  const [counter, setcounter] = useState(`${product.counter}`);
  const [price, setprice] = useState(`${product.price}`);
  const [res, setResponse] = useState<UmptiInputProps["response"]>({
    success: false,
    message: "",
  });
  console.log(product);
  const [displayResponse, setdisplyReponce] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = window.localStorage.getItem("Token");
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
  const onUpdateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setdisplyReponce(true);
    let imp = document.getElementById("imp") as HTMLElement;
    imp.style.display = "flex";

    try {
      const response = await axios.put(
        `${DOMAIN}/api/products/update`,
        {
          name,
          description,
          img,
          counter: parseFloat(counter),
          price: parseFloat(price),
          category,
          id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setResponse({
          success: true,
          message: response.data.message,
        });
        const updatedProduct: Product = {
          id: product.id,
          name,
          img,
          price: parseFloat(price),
          description,
          counter: parseFloat(counter),
          category,
        };
        onUpdateState(updatedProduct);
        // Clear the form fields
        setName("");
        setDescription("");
        setimg("");
        setcounter("");
        setprice("");
        setCategory("");
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setResponse({
          success: false,
          message: "Failed to create",
        });
      }
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imag = event.target?.result as string;
        setimg(imag);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcounter(value);
  };

  const handlepriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setprice(value);
  };
  return (
    <div
      className="bg-gray-100"
      style={{ height: "90%", position: "absolute" }}
    >
      <div className={styles.ClooButton}>
        <button onClick={onClose}>
          <CircleX />
        </button>
      </div>
      <UmptiInput response={res} id="imp" />
      <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div
            className="lg:col-span-2"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontWeight: "700", fontSize: "28px" }}>
              update Product
            </h1>
            <p>
              do you want to update the product{" "}
              <span style={{ fontWeight: "700", fontSize: "28px" }}>
                {product.name}
              </span>
              ?
            </p>
            <Image
              src={product.img}
              alt="Add Product Example"
              width={250}
              height={150}
            />
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name of product
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name of product"
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="counter">
                    Amount
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Amount"
                    type="text"
                    id="counter"
                    value={counter}
                    onChange={handleCounterChange}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="category">
                    Category
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Category"
                    type="text"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Price"
                    type="text"
                    id="price"
                    value={price}
                    onChange={handlepriceChange}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="description">
                    Description
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Description"
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="image">
                  Image
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Image"
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img src={img} alt="Preview" className="h-32" />
                </div>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  onClick={onUpdateRequest}
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProductUpdate;
