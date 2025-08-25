import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";
import PrivateIcon from "../Icons/PrivateIcon";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <li className="w-[310px] p-2 border border-slate-500 border-opacity-50 bg-black bg-opacity-10 rounded-3xl">
      <Link
        className="link !flex flex-col items-center relative"
        href={`/blog/${blog.docId}/${blog.creatorUid}`}
      >
        {blog.isPrivate && (
          <div
            className="absolute bottom-0 left-0 flex items-center justify-center bg-purple-400 bg-opacity
          -70 text-black rounded-full"
          >
            <PrivateIcon />
          </div>
        )}
        {blog.imageUrl && (
          <Image
            className="rounded-md"
            width={260}
            height={100}
            src={blog.imageUrl}
            alt={blog.title}
          />
        )}
        <h2 className="text-center font-bold mt-0 text-wrap text-slate-800 dark:text-slate-200">
          {blog.title}
        </h2>
        <p className="text-slate-500">{blog.createdAt}</p>
      </Link>
    </li>
  );
};

export default BlogCard;
