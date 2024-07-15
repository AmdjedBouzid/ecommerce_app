"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownMenuDemo from "./Dropdown";
import axios from "axios";
import { useAppContext } from "@/context/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useFetchUser from "@/app/utils/usehot";
import { HeartIcon, LockKeyhole, Search } from "lucide-react";
import Styles from "./componnets.module.css";
import Cart from "./Cart";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import ShopeIcon from "./ShopeIcon";
import CartFavorate from "./CartFavorate";
import { DOMAIN } from "../utils/constants";
export default function NavBar() {
  useFetchUser();
  const router = useRouter();
  const {
    user,
    setUser,
    isLogedIn,
    setIsLogedIn,
    SetProductToshope,
    setUsers,
    setProducts,
  } = useAppContext();
  const [ShowCart, SetSowCart] = useState(false);
  const [ShowCartFav, SetSowCartFav] = useState(false);
  // const getUserDetails = async () => {
  //   const token = localStorage.getItem("Token");

  //   if (!token) {
  //     console.error("No token found. Please log in first.");
  //     return;
  //   }

  //   try {
  //
  //     const response = await axios.get(`${DOMAIN}/api/users/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const userData = response.data.UserFinded;
  //       setUser(userData);
  //       setIsLogedIn(true);
  //       console.log("user", userData);
  //     } else {
  //       console.error("Failed to fetch user details:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user details:", error);
  //     router.push("/login");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setUser(null);
    setIsLogedIn(false);
    window.localStorage.setItem("user", "null");
    router.push("/Login");
  };
  const fetchToshopeProducts = async () => {
    try {
      const Token = window.localStorage.getItem("Token");
      const response = await axios.get(`${DOMAIN}/api/addtotoshopeliste`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        SetProductToshope(response.data.products);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const fetchProducts = async () => {
    var token: string;
    if (typeof window === undefined) {
      token = "";
    } else {
      token = window?.localStorage?.getItem("Token") as string;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        console.log("Fetched products:", data.products);
      } else {
        console.log("Failed to get products", response.body);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchToshopeProducts();
    FetchUsers();
    fetchProducts();
  }, []);
  return (
    <Navbar isBordered className="bg-pink-50">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image src="/logo.svg" height={50} width={50} alt="imge" />
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        {isLogedIn ? (
          <Button
            isIconOnly
            color="danger"
            aria-label="Like"
            onClick={() => {
              SetSowCartFav(!ShowCartFav);
            }}
          >
            <HeartIcon />
          </Button>
        ) : (
          <></>
        )}
        {ShowCartFav ? <CartFavorate /> : <></>}

        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/Products" aria-current="page" color="#primary">
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            {user?.isAdmin ? (
              <Link color="foreground" href="/Administration">
                Administration
              </Link>
            ) : (
              <></>
            )}
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {isLogedIn ? (
          <button
            className="border-5"
            color="danger"
            aria-label="Like"
            onClick={() => SetSowCart(!ShowCart)}
          >
            <ShopeIcon />
            {ShowCart ? <Cart /> : <></>}
          </button>
        ) : (
          <></>
        )}
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {isLogedIn ? (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?.img_profile}
              />
            ) : (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            )}
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            disableAnimation={true}
          >
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              href="/Myprofile"
            >
              <p className="font-semibold">Profile</p>
              <p className="font-semibold">{user?.name}</p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link href="/">
                <span className="color-primary">Home</span>
              </Link>
            </DropdownItem>
            {user?.isAdmin ? (
              <DropdownItem key="settings" href="/Administration">
                Administration
              </DropdownItem>
            ) : (
              <DropdownItem hideSelectedIcon={false} />
            )}
            {!isLogedIn ? (
              <DropdownItem key="system">
                <Link href="/Login" style={{ width: "100%", height: "100%" }}>
                  Login
                </Link>
              </DropdownItem>
            ) : (
              <DropdownItem style={{ display: "none" }} />
            )}
            {!isLogedIn ? (
              <DropdownItem key="system">
                <Link href="/SigneUp">Signe Up</Link>
              </DropdownItem>
            ) : (
              <DropdownItem className="display-none" />
            )}
            {isLogedIn ? (
              <DropdownItem key="system" onClick={handleLogout}>
                <Link href="/SigneUp">Log OUt</Link>
              </DropdownItem>
            ) : (
              <DropdownItem />
            )}
            <DropdownItem href="/Products">Products</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
