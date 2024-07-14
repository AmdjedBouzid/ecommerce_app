import React, { useState } from "react";
import { Badge, Avatar } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { useAppContext } from "@/context/login";

export default function ShopeIcon() {
  const { ProductToshope, SetProductToshope } = useAppContext();

  return (
    <div className="flex gap-4 items-center">
      <Badge
        content={ProductToshope?.length}
        color="danger"
        shape="rectangle"
        showOutline={false}
      >
        <ShoppingCart
          size={32}
          color="#FB88B4"
          strokeWidth={2.25}
          absoluteStrokeWidth
        />
      </Badge>
    </div>
  );
}
