// NavBar.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownMenuDemo from "./Dropdown";
import axios from "axios";
import { useAppContext } from "@/context/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function NavBar() {
  const router = useRouter();
  const { user, setUser, isLogedIn, setIsLogedIn } = useAppContext();

  // const getUserDetails = async () => {
  //   const token = localStorage.getItem("Token");

  //   if (!token) {
  //     console.error("No token found. Please log in first.");
  //     return;
  //   }

  //   try {
  //     const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
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

  return (
    <header className="bg-gray-100 shadow-md " style={{ width: "100%" }}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image
          src="/logo.svg"
          width={70}
          height={70}
          alt="Picture of the author"
        />

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-primary transition hover:text-secondry font-bold text-lg"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-secondry font-bold text-lg"
                  href="/About"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-secondry font-bold text-lg"
                  href="/Products"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-secondry font-bold text-lg"
                  href="/Clients"
                >
                  best clients
                </Link>
              </li>
              {user?.isAdmin ? (
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-secondry font-bold text-lg"
                    href="/Administration"
                  >
                    Administration
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!user && !isLogedIn ? (
                <>
                  <Link
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondry"
                    href="Login"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-secondry sm:block"
                    href="/SigneUp"
                  >
                    Signe Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center">
                  <Link href="/Myprofile">
                    <h1 className="font-bold text-lg mr-2">{user?.name}</h1>
                  </Link>
                  <Link href="/Myprofile">
                    <Image
                      src={user?.img_profile || ""}
                      alt=""
                      className="h-12 w-12 rounded-full border-2 border-primary"
                      height={70}
                      width={70}
                    />
                  </Link>
                </div>
              )}
            </div>
            <DropdownMenuDemo
              user={user}
              isLogedIn={isLogedIn}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
