import React from "react";

interface Props {
  id?: string;
  type?: string;
  accept?: string;
  value?: string;
  onChange?: (e: string) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  id,
  type,
  accept,
  value,
  onChange,
  handleChange,
}: Props) => {
  return (
    <div className="input">
      <input
        className=" bg-transparent focus:outline-none"
        id={id ? id : "title"}
        value={value && value}
        accept={accept && accept}
        onChange={(e) => {
          onChange && onChange(e.target.value);
          handleChange && handleChange;
        }}
        type={type ? type : "text"}
      />
    </div>
  );
};

export default InputText;
