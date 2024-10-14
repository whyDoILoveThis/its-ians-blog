"use client";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../Buttons/ThemeToggle";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { scrollToTop } from "@/utils";
import { fbGetUserById } from "@/firebase/fbGetUserById";

const Nav = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        setUser(await fbGetUserById(userId));
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        setUser(await fbGetUserById(userId));
      } else {
        setUser(null);
      }
    };
    getUser();
  }, [userId]);

  return (
    <nav className="fixed top-0 w-full z-[9999] bg-slate-500 bg-opacity-25 bg-blur-10 flex items-center justify-between py-1 px-4">
      <Link
        onClick={() => {
          scrollToTop();
        }}
        className="text-xl font-bold"
        href={"/"}
      >
        ITS Ian&#39;s Blog
      </Link>
      <div className="flex items-center">
        {user !== null && (
          <div className="mr-4">
            <Link
              onClick={() => {
                scrollToTop();
              }}
              className="hover:underline"
              href={"/create"}
            >
              Create
            </Link>
          </div>
        )}

        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Nav;
