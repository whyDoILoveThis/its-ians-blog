"use client";
import UserCardRegular from "@/components/Cards/UserCardRegular";
import Loader from "@/components/Loader";
import AllBlogs from "@/components/main/AllBlogs";
import SearchBlogs from "@/components/main/SearchBlogs";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import React, { useEffect, useState } from "react";

const Page = ({ params: { theUserId } }: { params: { theUserId: string } }) => {
  const [theUser, setTheUser] = useState<User | null>();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setTheUser(await fbGetUserById(theUserId));
    };

    fetchUser();
  }, [theUserId]);

  if (!theUser) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <UserCardRegular user={theUser} />
      <div className="flex justify-center gap-2 mb-2">
        {showSearch && (
          <button
            onClick={() => {
              setShowSearch(false);
            }}
            className="btn"
          >
            {theUser.firstName}&#39;s Blogs
          </button>
        )}
        {!showSearch && (
          <button
            onClick={() => {
              setShowSearch(true);
            }}
            className="btn"
          >
            Search
          </button>
        )}
      </div>
      {showSearch ? (
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-center">{theUser.firstName}&#39;s Blogs</h1>
          <SearchBlogs userId={theUserId} />
        </div>
      ) : (
        <AllBlogs firstName={theUser?.firstName} theUserId={theUserId} />
      )}
    </div>
  );
};

export default Page;
