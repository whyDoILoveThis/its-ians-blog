"use client";
import { SignIn, SignUp, SignUpButton } from "@clerk/nextjs";
import React, { useState } from "react";
import GuestLoginButton from "../Buttons/GuestLoginButton";
import HeaderImage from "@/images/splash-header-img.png";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../Icons/ArrowRight";
import ArrowRightLong from "../Icons/ArrowRightLong";

const SignMeIn = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [arrowHover, setArrowHover] = useState(false);
  const bgOpacity = 20;
  const textColor = "purple";

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 text-white">
      <Link
        onMouseEnter={() => {
          setArrowHover(true);
        }}
        onMouseLeave={() => {
          setArrowHover(false);
        }}
        href={"/user/user_2iqJuHsepKWDsGxo2o6rczQpvYq"}
        className="w-fit hover:!no-underline hover:bg-opacity-10 transition-all flex justify-center items-center bg-black bg-opacity-20 rounded-xl p-4 mb-4"
      >
        <p
          className={`flex items-center gap-1 text-xl dark:text-${textColor}-400 text-${textColor}-500 hover:text-${textColor}-700 font-semibold`}
        >
          <span>Ian&#39;s Blogs</span>
          <span className={`transition-all ${arrowHover && "translate-x-1"}`}>
            {arrowHover ? <ArrowRightLong /> : <ArrowRight />}
          </span>
        </p>
      </Link>

      <div
        className={`flex flex-col md:flex-row gap-8 items-center justify-center max-w-7xl mx-auto rounded-2xl shadow-lg bg-black bg-opacity-${bgOpacity} p-8 pt-4`}
      >
        <div
          className={`flex flex-col text-gray-800 dark:text-slate-200 items-center p-6 bg-white bg-opacity-10 rounded-xl shadow-xl max-w-xs w-full`}
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            Create a Blog!
          </h2>
          <p className="text-center text-sm mb-4 px-4">
            Sign up to create and share your own blogs. Tell people what you
            think by leaving a comment!😁
          </p>
          <GuestLoginButton />
        </div>

        <div className="flex flex-col justify-center items-center w-full max-w-md space-y-6">
          {!showSignIn ? (
            <div className="w-full">
              <SignUp routing="hash" />
              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <button
                  className={`text-${textColor} hover:text-[#3b79ab] font-semibold`}
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
              </p>
            </div>
          ) : (
            <div className="w-full">
              <SignIn routing="hash" />
              <p className="text-center text-sm mt-4">
                Don&#39;t have an account?{" "}
                <button
                  className={`text-${textColor} hover:text-[#3b79ab] font-semibold`}
                  onClick={() => setShowSignIn(false)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-8 bg-black bg-opacity-30 rounded-xl text-center shadow-lg">
        <h1 className="text-2xl font-semibold text-purple-500 dark:text-purple-400 mb-4">
          About this Site
        </h1>
        <p className="text-sm text-white">
          This is my personal blog site, but I have added the ability for anyone
          that finds this to be able to create an account and post blogs of
          their own if they so desire. You can explore as a guest now, or
          quickly create an account to start posting and leaving comments!
          Anonymous comments can be deleted by anyone!
        </p>
      </div>
    </div>
  );
};

export default SignMeIn;
