"use client";
import React, { useEffect } from "react";
import RowUsers from "./RowUsers";
import { useAppContext } from "@/context/login";
import axios from "axios";
import { UserDetails, UserToken } from "@/app/utils/types";
import InputSearche from "./InputSearche";

function TableUsers() {
  const { Users, setUsers, InputSearchUsers, SearcheUserBy, SetSearcheUserBy } =
    useAppContext();

  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

  const FetchUsers = async () => {
    var token: string;
    if (typeof window === undefined) {
      token = "";
    } else {
      token = window?.localStorage?.getItem("Token") as string;
    }
    try {
      const response = await axios.get(`${DOMAIN}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
        // console.log("users fetches suxsusfelly", Users);
      } else {
        console.log("error fetching users", response);
      }
    } catch (error) {
      console.log("error fetching users", error);
    }
  };
  useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <div className="overflow-x-auto">
      <InputSearche />
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              email
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              is Admin ?
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Profile image
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Phone number
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {SearcheUserBy === "NAME"
            ? Users.filter((user) => {
                return InputSearchUsers === ""
                  ? user
                  : user.name.toLowerCase().includes(InputSearchUsers);
              }).map((user) => {
                return <RowUsers key={user.id} user={user} />;
              })
            : Users.filter((user) => {
                return InputSearchUsers === ""
                  ? user
                  : user.email.includes(InputSearchUsers);
              }).map((user) => {
                return <RowUsers key={user.id} user={user} />;
              })}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
