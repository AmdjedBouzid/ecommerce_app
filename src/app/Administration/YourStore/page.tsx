"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/_componnets/Table"; // Ensure the correct path
import axios from "axios";

const Page = () => {
  // const handleRefresh = () => {
  //   setRefresh(!refresh);
  // };

  return (
    <div style={{ padding: "10px" }}>
      <Table />
    </div>
  );
};

export default Page;
