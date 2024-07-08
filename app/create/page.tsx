"use client";
import BlogForm from "@/components/main/BlogForm";
import { useAuth, useUser } from "@clerk/nextjs";

const Page = () => {
  const user = useUser();
  console.log(user);

  return (
    <div>
      <BlogForm />
    </div>
  );
};

export default Page;
