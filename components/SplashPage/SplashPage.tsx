"use client";
import { SignIn, SignUp, SignUpButton } from "@clerk/nextjs";
import React, { useState } from "react";
import GuestLoginButton from "../Buttons/GuestLoginButton";
import HeaderImage from "@/images/splash-header-img.png";
import Image from "next/image";
import Link from "next/link";

const SignMeIn = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  return (
    <div className="max-w-[800px]">
      <Link className="btn m-4" href={"/user/user_2iqJuHsepKWDsGxo2o6rczQpvYq"}>
        Ian&#39;s Blogs
      </Link>
      <div className="flex flex-col md:flex-row gap-4 items-center border border-white border-opacity-70 rounded-2xl p-4 m-4">
        <div className="flex flex-col items-center border border-white border-opacity-50 rounded-2xl p-2 bg-black bg-opacity-25">
          <Image
            width={150}
            height={200}
            src={HeaderImage}
            alt={"header image"}
          />
          <h2 className="text-center">Create a blog!</h2>
          <p className="text-center p-2">
            Sign up to create and share your own blogs with the ability to
            search for your friends. Tell people what you think by leaving a
            comment!😁
          </p>
          <GuestLoginButton />
        </div>
        <div>
          {!showSignIn ? (
            <div>
              <SignUp routing="hash" />
              <p className="text-center">
                Already have an account?{" "}
                <button
                  className="btn-link"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
              </p>
            </div>
          ) : (
            <div>
              <SignIn routing="hash" />
              <p className="text-center">
                Don&#39;t have an account?{" "}
                <button
                  className="btn-link"
                  onClick={() => setShowSignIn(false)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border border-white border-opacity-50 rounded-2xl p-8 bg-black bg-opacity-25 m-4">
        <h1>About this site</h1>
        <p>
          This is my personal blog site, but I have added the ability for anyone
          that finds this to be able to create an account and post blogs of
          their own if they so desire. You can explore as a guest now, or
          quickly create an account to start posting and leaving comments!
          Anonymous comments can be deleted by anyone!!{" "}
        </p>
      </div>
    </div>
  );
};

export default SignMeIn;
