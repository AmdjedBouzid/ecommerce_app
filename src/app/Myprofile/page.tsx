"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./myprofile.module.css";
import {
  Phone,
  Mail,
  Users,
  ShoppingBag,
  CircleChevronDown,
  User,
  LockKeyhole,
} from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/context/login";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import useFetchUser from "@/app/utils/usehot";
const Page = () => {
  const router = useRouter();
  const { user, setUser, isLogedIn, setIsLogedIn } = useAppContext();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN1;

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setUser(null);
    setIsLogedIn(false);
    router.push("/Login");
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("Token") : null;

  const [email, setEmail] = useState(user?.email);
  const [back, setback] = useState(false);
  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [img, setImg] = useState<string | null | undefined>(user?.img_profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEdit = () => {
    const editElement = document.getElementById("edit");
    if (editElement) {
      if (back) {
        editElement.style.display = "none";
        setback(false);
      } else {
        editElement.style.display = "flex";
        setback(true);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageResult = event.target?.result as string | null | undefined;
        setImg(imageResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${DOMAIN}/api/users/me`,
        {
          name,
          email,
          phoneNumber,
          oldPassword,
          newPassword,
          img,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.UserApdated;
        setUser(updatedUser);
        console.log(user);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toggleEdit();
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.edit} id="edit">
        <div className={styles.editcenter}>
          <div className={styles.return}>
            <h1>Edit Profile</h1>
            <button onClick={toggleEdit}>
              <CircleChevronDown />
            </button>
          </div>

          <div className={styles.lastedit}>
            <label htmlFor="name" style={{ fontWeight: "200" }}>
              Name
            </label>
            <div className={styles.emailinput}>
              <User />
              <input
                type="text"
                placeholder="First Name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-1">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                    }}
                  />
                </div>
              )}
            </div>

            <label htmlFor="phone" style={{ fontWeight: "200" }}>
              Phone Number
            </label>
            <div className={styles.emailinput}>
              <Phone />
              <input
                type="text"
                placeholder="+213 -- --- --"
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <label
              htmlFor="email"
              style={{ fontWeight: "200", fontSize: "15px" }}
            >
              Email
            </label>
            <div className={styles.emailinput}>
              <Mail />
              <input
                type="email"
                placeholder="example@mail.com"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <p style={{ fontSize: "10px", color: "red" }}>
                Do you want to update your password? If yes, set the old
                password and the new password.
              </p>
              <label
                htmlFor="old_password"
                style={{ fontWeight: "200", fontSize: "15px" }}
              >
                Old Password
              </label>
              <div className={styles.emailinput}>
                <LockKeyhole />
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <label
                htmlFor="new_password"
                style={{ fontWeight: "200", fontSize: "15px" }}
              >
                New Password
              </label>
              <div className={styles.emailinput}>
                <LockKeyhole />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.lastbuttons}>
              <button
                type="button"
                className={styles.button}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.divtitle}>
          <h1>My Profile</h1>
        </div>

        <div className={styles.userprofile}>
          <div>
            <Image
              src={user?.img_profile || "/default-profile.png"}
              height={60}
              width={60}
              alt="Profile Image"
            />
          </div>

          <div className={styles.nameuser}>
            <h2>{user?.name}</h2>
            <h4>{user?.isAdmin ? "ADMINISTRATOR" : "USER"}</h4>
          </div>
        </div>

        <div className={styles.userinfo}>
          <div className={styles.personelnfo}>
            <h1 className={styles.title}>Personal Info:</h1>
            <div className={styles.line} style={{ width: "60%" }}>
              <Phone />
              <h5>{user?.phone_number}</h5>
            </div>
            <div className={styles.line}>
              <Mail />
              <h5>{user?.email}</h5>
            </div>
          </div>

          <div className={styles.acountnfo}>
            <h1 className={styles.title}>Account Info:</h1>
            <div className={styles.line} style={{ width: "60%" }}>
              <Users />
              <h5>Salesman Staff</h5>
            </div>
            <div className={styles.line}>
              <ShoppingBag />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={toggleEdit} className={styles.button}>
            Edit Profile
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
