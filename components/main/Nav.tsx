import React from "react";
import ThemeToggle from "../Buttons/ThemeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Nav = () => {
  return (
    <nav className=" bg-slate-500 bg-opacity-25 flex items-center justify-between py-1 px-4">
      <Link className="text-xl font-bold" href={"/"}>
        ITS Ian&#39;s Blog
      </Link>
      <div className="flex items-center">
        <div className="mr-4">
          <Link className="hover:underline" href={"/create"}>
            Create
          </Link>
        </div>

        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Nav;
