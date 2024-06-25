import React from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
interface Dropdown {
  SetSearcheBy: (s: string) => void;
}
function DropDownNextUISearch({ SetSearcheBy }: Dropdown) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Searche by</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Example with disabled actions"
        disabledKeys={["edit", "delete"]}
      >
        <DropdownItem key="new" onClick={() => SetSearcheBy("NAME")}>
          name
        </DropdownItem>
        <DropdownItem key="copy" onClick={() => SetSearcheBy("PRICE")}>
          price
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDownNextUISearch;
