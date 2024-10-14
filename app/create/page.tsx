"use client";
import BlogForm from "@/components/main/BlogForm";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Page = () => {
  const user = useUser();
  console.log(user);

  const { userId } = useAuth();
  const [theUser, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        setUser(await fbGetUserById(userId));
      };
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    if (theUser === null && !userId) {
      router.push("/");
    }
  }, [userId]);

  return <div>{theUser !== null ? <BlogForm /> : <Loader />}</div>;
};

export default Page;
