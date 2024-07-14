import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAppContext } from "@/context/login";
import { SquareChevronDown } from "lucide-react";
export default function DropDownSearchusersBy() {
  const { SetSearcheUserBy } = useAppContext();
  return (
    <Dropdown>
      <DropdownTrigger>
        <SquareChevronDown></SquareChevronDown>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" onClick={() => SetSearcheUserBy("NAME")}>
          by name
        </DropdownItem>
        <DropdownItem key="copy" onClick={() => SetSearcheUserBy("EMAILE")}>
          by emaile
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
