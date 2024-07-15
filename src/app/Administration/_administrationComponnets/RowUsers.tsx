"use client ";
import React, { use, useState } from "react";
import { Button } from "@nextui-org/react";
import { UserIcon } from "./UserIcon";
import { Lock } from "lucide-react";
import { UserDetails } from "@/app/utils/types";
import { User } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context/login";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { json } from "stream/consumers";
import { DOMAIN } from "@/app/utils/constants";
interface RowUserProps {
  user: UserDetails;
}
function RowUsers({ user }: RowUserProps) {
  const { Users, setUsers } = useAppContext();

  const token = window?.localStorage?.getItem("Token") as string;
  const [IsSpinner, SetIsSpinner] = useState(false);
  const [IsSpinner2, SetIsSpinner2] = useState(false);
  const HundlerDeleteUser = async () => {
    try {
      SetIsSpinner(true);
      const response = await axios.delete(
        `${DOMAIN}/api/users/delete/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(Users.filter((u) => u.id !== user.id));
        toast.success(response.data.message, {
          position: "top-center",
        });
        SetIsSpinner(false);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
        console.log(response.data.message);
        SetIsSpinner(false);
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-center",
      });
      SetIsSpinner(false);
    }
  };
  const SetModiratorHandler = async (id: number) => {
    try {
      SetIsSpinner2(true);
      const response = await axios.put(
        `${DOMAIN}/api/users/setmodirator`,
        { id: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? { ...u, isAdmin: true } : u))
        );
        // SortState();
        toast.success(response.data.message, {
          position: "top-center",
        });
        SetIsSpinner2(false);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
        console.log(response.data.message);
        SetIsSpinner2(false);
      }
    } catch (error) {
      console.error("Error setting moderator:", error);
      toast.error("An error occurred", {
        position: "top-center",
      });
      SetIsSpinner2(false);
    }
  };
  const DelteModiratorHandler = async (id: number) => {
    try {
      SetIsSpinner2(true);
      const response = await axios.put(
        `${DOMAIN}/api/users/deletemodirator`,
        { id: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id ? { ...u, isAdmin: false } : u
          )
        );
        // SortState();
        toast.success(response.data.message, {
          position: "top-center",
        });
        SetIsSpinner2(false);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
        console.log(response.data.message);
        SetIsSpinner2(false);
      }
    } catch (error) {
      console.error("Error setting moderator:", error);
      toast.error("An error occurred", {
        position: "top-center",
      });
      SetIsSpinner2(false);
    }
  };
  // const SortState = () => {
  //   const sortedUsers = Users.sort((a, b) => {
  //     if (a.IsSuperAdmin && !b.IsSuperAdmin) {
  //       return -1;
  //     }
  //     if (!a.IsSuperAdmin && b.IsSuperAdmin) {
  //       return 1;
  //     }
  //     if (a.isAdmin && !b.isAdmin) {
  //       return -1;
  //     }
  //     if (!a.isAdmin && b.isAdmin) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   setUsers(sortedUsers);
  // };
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {user.name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {user.email}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {user.isAdmin ? <Lock color="#38bc4e" /> : <User color="#f51441" />}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {
          <Image
            src={
              user.img_profile !== null
                ? user.img_profile
                : "data:image/jpeg;base64,/9j/4AAQSkZJR"
            }
            height={50}
            width={50}
            alt="profile image"
            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
          />
        }
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {user.phone_number}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <Button
          color="danger"
          variant="bordered"
          startContent={<UserIcon />}
          onClick={HundlerDeleteUser}
        >
          {IsSpinner ? <Spinner color="danger" /> : "Delete User"}
        </Button>
      </td>
      {!user.isAdmin && !user.IsSuperAdmin ? (
        <td className="whitespace-nowrap px-4 py-2">
          <Button
            color="success"
            variant="bordered"
            startContent={<Lock color="#38bc4e" />}
            onClick={() => SetModiratorHandler(user.id)}
          >
            {IsSpinner2 ? <Spinner color="success" /> : "  Make Mod"}
          </Button>
        </td>
      ) : (
        <td className="whitespace-nowrap px-4 py-2">
          <Button
            color="success"
            variant="bordered"
            startContent={<Lock color="#38bc4e" />}
            onClick={() => DelteModiratorHandler(user.id)}
          >
            {IsSpinner2 ? <Spinner color="success" /> : "  Make user"}
          </Button>
        </td>
      )}
      <td className="whitespace-nowrap px-4 py-2"></td>
    </tr>
  );
}

export default RowUsers;
