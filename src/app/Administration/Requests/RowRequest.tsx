"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { RorR } from "@/app/utils/types";

interface RowRequestProps {
  request: RorR;
}

function RowRequest({ request }: RowRequestProps) {
  console.log(request);
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {request.email}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Image
          src={request.img_Profile}
          width={60}
          height={60}
          alt="Profile Picture"
          style={{ borderRadius: "50%" }}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {request.id_product}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {request.name_product}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Image
          src={request.img_product}
          width={60}
          height={60}
          alt="Product Image"
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {request.amount}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {request.date_request}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <Button color="success" className="shadow-sm">
          Accept
        </Button>
        <Button color="danger" className="shadow-sm">
          Reject
        </Button>
      </td>
    </tr>
  );
}

export default RowRequest;
