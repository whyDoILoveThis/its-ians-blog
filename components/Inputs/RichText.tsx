import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextProps {
  setText: (text: string) => void;
  text: string;
}

const RichText: React.FC<RichTextProps> = ({ setText, text }) => {
  const handleChange = (value: string) => {
    setText(value); // Update parent component state with the text
  };

  console.log("Quill: ", text);

  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={handleChange}
      placeholder="Write something..."
    />
  );
};

export default RichText;
