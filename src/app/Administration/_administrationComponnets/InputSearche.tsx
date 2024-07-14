import React from "react";
import { useAppContext } from "@/context/login";
import DropDownSearchusersBy from "./DropDownSearchusersBy";
function InputSearche() {
  const { InputSearchUsers, SetInputSearchUsers } = useAppContext();

  return (
    <div className="relative w-48">
      <label htmlFor="Search" className="sr-only">
        {" "}
        Search
      </label>

      <input
        type="text"
        id="Search"
        placeholder="Search "
        className=" rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        value={InputSearchUsers}
        onChange={(e) => SetInputSearchUsers(e.target.value)}
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <DropDownSearchusersBy />
      </span>
    </div>
  );
}

export default InputSearche;
