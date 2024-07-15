"use client";
import React, { useEffect, useState } from "react";
import RowRequest from "./RowRequest";
import axios from "axios";
import { useAppContext } from "@/context/login";
import { RorR, request } from "@/app/utils/types";
import { DOMAIN } from "@/app/utils/constants";

function TableRequest() {
  const {
    ProductFav,
    SetProductFav,
    RequeseForProduct,
    SetRequeseForProduct,
    Users,
    setUsers,
    products,
    setProducts,
  } = useAppContext();
  const [Rowrequest, SetrowRequest] = useState<RorR[]>([]);

  const fetchRequests = async () => {
    try {
      const Token = window.localStorage.getItem("Token");
      const response = await axios.get(`${DOMAIN}/api/products/getrequestes`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      if (response.status === 200) {
        SetRequeseForProduct(response.data.requests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findProductByid = (id: number) => {
    console.log("products", products);
    const product = products?.find((p) => p.id === id);
    if (!product) {
      console.log(`Product with id ${id} not found`);
    }
    return product;
  };

  const findUserByid = (id: number) => {
    console.log("Users", Users);
    const user = Users?.find((u) => u.id === id);
    if (!user) {
      console.log(`User with id ${id} not found`);
    }
    return user;
  };

  const formattedRequests = (requests: request[]): RorR[] => {
    return requests.map((request) => {
      const user = findUserByid(request.id_user);
      const product = findProductByid(request.id_product);
      return {
        email: user?.email || "",
        img_Profile: user?.img_profile || "",
        id_product: product?.id ?? -1, // Default value if product id is undefined
        name_product: product?.name || "",
        img_product: product?.img || "",
        amount: request.amount,
        date_request: request.date_request,
      };
    });
  };

  useEffect(() => {
    // Ensure that users and products are loaded before fetching requests
    if (Users && products) {
      fetchRequests();
    }
  }, [Users, products]);

  useEffect(() => {
    if (RequeseForProduct.length > 0) {
      const rows = formattedRequests(RequeseForProduct);
      SetrowRequest(rows);
    }
  }, [RequeseForProduct]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm static">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              profile
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Product
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              name of Product
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              image
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              date request
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Rowrequest.map((req) => (
            <RowRequest key={req.date_request} request={req} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableRequest;
