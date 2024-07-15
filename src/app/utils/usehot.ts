"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { UserToken, UserDetails } from "./types";
// export const useAuth = () => {
//   const router = useRouter();
//   const [isLogedIn, setIsLogedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   const getUserDetails = async () => {
//     const token = window.localStorage.getItem("Token");

//     if (!token) {
//       console.error("No token found. Please log in first.");
//       return;
//     }

//     try {
//       const response = await axios.get(`${DOMAIN}/api/users/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setUser(response.data);
//         setIsLogedIn(true);
//         router.refresh();
//         router.refresh();
//         router.refresh();
//         // console.log("User details fetched successfully:", response.data);
//       } else {
//         // console.error("Failed to fetch user details:", response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch user details:", error);
//     }
//   };

//   useEffect(() => {
//     getUserDetails();
//   }, [isLogedIn, user]);

//   return { isLogedIn, user, getUserDetails };
// };

import { useAppContext } from "@/context/login";
import { DOMAIN } from "./constants";

const useFetchUser = () => {
  const { setUser, setIsLogedIn } = useAppContext();

  useEffect(() => {
    const getUserDetails = async () => {
      const token = localStorage.getItem("Token");

      if (!token) {
        console.error("No token found. Please log in first.");
        return;
      }

      try {
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
      }
    };

    const getStoredUser = () => {
      const token = localStorage.getItem("Token");

      if (!token) {
        return false;
      }

      const Token_Password = process.env.NEXT_PUBLIC_TOKEN_PASSWORD as string;

      try {
        const user = jwt.verify(token, Token_Password) as UserDetails;
        setUser(user);
        setIsLogedIn(true);
        return true;
      } catch (error) {
        console.error("Token verification failed:", error);
        return false;
      }
    };

    getUserDetails();
  }, [setUser, setIsLogedIn]);
};

export default useFetchUser;
