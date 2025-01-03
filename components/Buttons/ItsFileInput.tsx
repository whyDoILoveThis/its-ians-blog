"use client";
import React, { useState } from "react";

interface Props {
  handleFileChange: () => void;
}
const ItsFileInput = ({ handleFileChange }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className=" cursor-pointer w-fit flex justify-center relative">
      <span
        className={`dashed-border-2 bg-white bg-opacity-10 ${
          isHovering && "bg-opacity-20"
        } text-3xl text-slate-300 rounded-lg p-1 px-6 border-slate-500`}
      >
        📤
      </span>
      <input
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className=" w-full h-full cursor-pointer absolute opacity-0"
      />
    </div>
  );
};

export default ItsFileInput;
