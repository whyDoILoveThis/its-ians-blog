import React, { useEffect, useState } from "react";
import { fbGetUsersBlogs } from "@/firebase/fbGetUsersBlogs";
import BlogCard from "../Cards/BlogCard";
import Loader from "../Loader";

interface Props {
  firstName: MaybeString;
  userId: string;
}

const AllBlogs = ({ firstName, userId }: Props) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogs = await fbGetUsersBlogs({ userId });
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
  if (!blogs || !firstName) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="text-center">{firstName}&#39;s Blogs</h1>
      <ul className="flex flex-col gap-4 p-4">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
