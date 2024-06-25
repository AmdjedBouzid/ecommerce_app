import React from "react";
import Button from "./Button";
const GroupButton = () => {
  return (
    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
      <Button />
      <Button /> <Button /> <Button /> <Button /> <Button /> <Button />{" "}
      <Button /> <Button /> <Button /> <Button /> <Button /> <Button />{" "}
      <Button /> <Button />
    </span>
  );
};

export default GroupButton;
