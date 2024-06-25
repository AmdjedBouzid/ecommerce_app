"use client";
import React, { useState, useEffect } from "react";
import styles from "./administration.module.css";
import { MessageCircleX, ShieldCheck } from "lucide-react";

interface UmptiInputProps {
  response: {
    success: boolean;
    message: string;
  };
  id: string;
}

const UmptiInput = ({ response, id }: UmptiInputProps) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
  }, []);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof document !== "undefined") {
      const imp = document.getElementById(id) as HTMLElement;
      if (imp) {
        imp.style.display = "none";
      }
    }
  };

  return (
    <div className={styles.umptiInput} id={id}>
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white p-4"
      >
        <div className="flex items-start gap-4">
          {!response.success ? (
            <MessageCircleX color="red" />
          ) : (
            <ShieldCheck color="green" />
          )}

          <div className="flex-1">
            <strong className="block font-medium text-gray-900">
              Message from server
            </strong>
            <p className="mt-1 text-sm text-gray-700">
              {response ? response.message : "Loading..."}
            </p>
          </div>

          <button
            className="text-gray-500 transition hover:text-gray-600"
            onClick={handleClick}
          >
            <span className="sr-only">Dismiss popup</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UmptiInput;
