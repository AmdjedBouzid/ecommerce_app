"use client";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useFetchUser from "@/app/utils/usehot";
import { useAppContext } from "@/context/login";
import axios from "axios";
export default function Home() {
  const { setUser, setIsLogedIn, user, isLogedIn } = useAppContext();
  const router = useRouter();
  const getUserDetails = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
      console.error("No token found. Please log in first.");
      return;
    }

    try {
      const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;
      const response = await axios.get(`${DOMAIN}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData = response.data.UserFinded;
        setUser(userData);
        setIsLogedIn(true);
        console.log("user", userData);
      } else {
        console.error("Failed to fetch user details:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    const user = window.localStorage.getItem("user") as string;
    if (user !== null) {
      setUser(JSON.parse(user));
      setIsLogedIn(true);
      router.refresh();
    } else {
      getUserDetails();
    }
  }, [setUser, setIsLogedIn]);
  return (
    <main className="">
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src="/istockphoto-489803256-1024x1024.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl text-primary">
                your best shopping web site
              </h2>

              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
                qui hic atque tenetur quis eius quos ea neque sunt, accusantium
                soluta minus veniam tempora deserunt? Molestiae eius quidem quam
                repellat.
              </p>

              <Link
                href="Products"
                className="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-secondry focus:outline-none focus:ring focus:ring-primary"
              >
                go to shoppe now !
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
