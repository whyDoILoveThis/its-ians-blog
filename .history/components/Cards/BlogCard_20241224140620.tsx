import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  console.log(blog.id);

  return (
    <li className="w-[310px] p-2 border border-slate-500 border-opacity-50 bg-black bg-opacity-10 rounded-3xl">
      <Link
        className="link !flex flex-col items-center"
        href={`/blog/${blog.docId}/${blog.creatorUid}`}
      >
        {blog.imageUrl && (
          <Image
            className="rounded-md"
            width={260}
            height={100}
            src={blog.imageUrl}
            alt={blog.title}
          />
        )}
        <h2 className="text-center font-bold mt-0">{blog.title}</h2>
        <p className="text-slate-500">{blog.createdAt}</p>
      </Link>
    </li>
  );
};

export default BlogCard;
