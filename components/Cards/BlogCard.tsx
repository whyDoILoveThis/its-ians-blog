import React from "react";
import Image from "next/image";
import RenderMarkdown from "../main/RenderMarkdown";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <li className="w-[300px] p-2 border-thin rounded-3xl flex flex-col items-center">
      {blog.imageUrl && (
        <Image width={150} height={100} src={blog.imageUrl} alt={blog.title} />
      )}
      <h2>{blog.title}</h2>
    </li>
  );
};

export default BlogCard;
