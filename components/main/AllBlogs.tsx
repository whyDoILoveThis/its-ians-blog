import React, { useEffect, useState } from "react";
import { fbGetAllBlogs } from "@/firebase/fbGetAllBlogs";
import BlogCard from "../Cards/BlogCard";

interface Props {
  userId: string;
}

const AllBlogs = ({ userId }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogs = await fbGetAllBlogs({ userId });
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Handle error as needed
      }
    };

    {
      userId && fetchBlogData();
    }
  }, [userId]);

  return (
    <div>
      <h1>Blogs</h1>
      <ul className="flex flex-col gap-4 p-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
