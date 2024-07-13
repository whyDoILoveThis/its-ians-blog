import React, { useEffect, useState } from "react";
import { fbGetUsersBlogs } from "@/firebase/fbGetUsersBlogs";
import BlogCard from "../Cards/BlogCard";
import Loader from "../Loader";
import { useAuth } from "@clerk/nextjs";
import { scrollToTop } from "@/utils";

interface Props {
  firstName: MaybeString;
  theUserId: string;
}

const AllBlogs = ({ firstName, theUserId }: Props) => {
  const { userId } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const itsMe = userId === theUserId;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogs = await fbGetUsersBlogs({ userId: theUserId });
        setBlogs(fetchedBlogs);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Handle error as needed
      }
    };

    {
      theUserId && fetchBlogData();
    }
  }, [theUserId]);

  if (!blogs || !firstName || loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center">{firstName}&#39;s Blogs</h1>
      {blogs.length <= 0 && !loading ? (
        <p className="mt-4 text-lg">
          {itsMe ? "You haven't" : "This user hasn't"} created any blogs yet
        </p>
      ) : (
        <ul className="flex flex-col gap-4 p-4">
          {blogs.map((blog, index) => (
            <div
              onClick={() => {
                scrollToTop();
                setLoading(true);
              }}
            >
              <BlogCard key={index} blog={blog} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllBlogs;
