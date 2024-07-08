import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <li className="w-[300px] p-2 border-thin rounded-3xl">
      <Link
        className="flex flex-col items-center"
        href={`/blog/${blog.id}/${blog.creatorUid}`}
      >
        {blog.imageUrl && (
          <Image
            width={150}
            height={100}
            src={blog.imageUrl}
            alt={blog.title}
          />
        )}
        <h2>{blog.title}</h2>
      </Link>
    </li>
  );
};

export default BlogCard;
