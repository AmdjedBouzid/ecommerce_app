import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface DropDownProps {
  categories: string[];
  hunlelfilter: (category: string) => void;
  setcategory: (category: string) => void;
}

export default function DropeDownNextUi({
  categories,
  hunlelfilter,
  setcategory,
}: DropDownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Filter by</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Categories">
        <DropdownItem
          key="all"
          className="text-danger"
          color="danger"
          onClick={() => {
            setcategory("All"), hunlelfilter("All");
          }}
        >
          All
        </DropdownItem>
        {categories.map((category) => (
          <DropdownItem key={category} onClick={() => hunlelfilter(category)}>
            {category}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
