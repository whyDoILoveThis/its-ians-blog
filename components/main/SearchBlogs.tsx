import React, { useState } from "react";
import { fbSearchUsers } from "@/firebase/fbSearchUsers"; // Import the search function
import UserCardRegular from "../Cards/UserCardRegular";
import { fbSearchBlogs } from "@/firebase/fbSearchBlogs";
import BlogCard from "../Cards/BlogCard";
import Loader from "../Loader";

interface Props {
  userId: string;
}

const BlogSearch = ({ userId }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const blogs = await fbSearchBlogs(searchQuery, userId);

        setResults(blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error searching users:", error);
        // Handle error as needed
      }
    } else {
      setLoading(false);
    }
  };
  console.log(searchQuery);

  return (
    <div className="flex flex-col items-center justify-center w-[300px]">
      <form className="input flex justify-between" onSubmit={handleSearch}>
        <input
          className="bg-transparent w-[150px] focus:outline-none"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <div className="m-2 flex flex-col gap-2">
            {results.map((blog, index) => (
              <BlogCard blog={blog} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
