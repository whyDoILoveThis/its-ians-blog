import React from "react";

interface Props {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  color?: string;
}

const Button = ({ text, type, color }: Props) => {
  return (
    <button
      className={`btn ${color && `btn-${color}`} w-fit`}
      type={type ? type : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
