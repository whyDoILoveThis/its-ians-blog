"use client";
import AllBlogs from "@/components/main/AllBlogs";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import React, { useEffect, useState } from "react";

const Page = ({ params: { theUserId } }: { params: { theUserId: string } }) => {
  const [theUser, setTheUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      setTheUser(await fbGetUserById(theUserId));
    };

    fetchUser();
  }, [theUserId]);

  return (
    <div>
      <AllBlogs firstName={theUser?.firstName} userId={theUserId} />
    </div>
  );
};

export default Page;
