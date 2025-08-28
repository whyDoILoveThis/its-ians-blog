"use client";
import { SignIn, SignInButton, SignUp, SignUpButton } from "@clerk/nextjs";
import React, { useState } from "react";
import GuestLoginButton from "../Buttons/GuestLoginButton";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../Icons/ArrowRight";
import ArrowRightLong from "../Icons/ArrowRightLong";
import meImg from "@/images/hero--img.png";
import "@/styles/TravelingBorderStrips.css";

/**
 * SignMeIn — Modern makeover
 * - Keeps existing features (SignIn/SignUp, GuestLoginButton, profile link, images, arrows)
 * - Uses consistent Tailwind tokens
 * - Improved spacing, hierarchy
 */

const SignMeIn: React.FC = () => {
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <main className="min-h-screen text-slate-100  flex items-center justify-center px-6 py-12">
      {/* container */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-10">
        {/* LEFT: Hero / Promo */}
        <section className="md:col-span-7 bg-gradient-to-br to-black/5 from-black/15 relative overflow-hidden rounded-3xl bg-white/3 backdrop-blur-sm border border-white/15 p-8 flex flex-col gap-6">
          {/* decorative: subtle blurred orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-600/30 to-fuchsia-600/20 blur-3xl"
          />
          {/* Profile Link Card */}
          <Link
            href="/user/user_2iqJuHsepKWDsGxo2o6rczQpvYq"
            className=" !decoration-indigo-300 z-10 group w-fit inline-flex items-center gap-4 rounded-2xl px-4 py-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/5 transition-shadow shadow-md"
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
            aria-label="Go to Ian's blogs"
          >
            <div className="flex-none w-20 h-20 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/6">
              <Image
                src={meImg}
                alt="Ian avatar"
                width={72}
                height={72}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-semibold text-indigo-300">
                Ian&apos;s Blogs
              </span>
              <span className="text-xs text-slate-400">
                Explore posts & projects
              </span>
            </div>

            <div
              className={`ml-auto text-indigo-300 transform transition-transform duration-200 ${
                arrowHover ? "translate-x-2" : "translate-x-0"
              }`}
              aria-hidden
            >
              {arrowHover ? <ArrowRightLong /> : <ArrowRight />}
            </div>
          </Link>

          {/* Big headline + feature list */}
          <div className="relative z-10 mt-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Build. Share. Read.{" "}
              <span className="text-indigo-400">Create your voice.</span>
            </h1>
            <p className="mt-4 text-slate-300 max-w-xl text-base">
              A lightweight blogging platform with account creation, comments,
              anonymous moderation, and a compact UI library. Designed to be
              fast, focused, and friendly.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="flex-none w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Create & Publish
                  </h4>
                  <p className="text-xs text-slate-400">
                    Auth-protected posts with rich content
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="flex-none w-2 h-2 rounded-full bg-fuchsia-400 mt-2" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Community
                  </h4>
                  <p className="text-xs text-slate-400">
                    Comment, moderate anonymous feedback
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Footer: small note and decorative image */}
          <div className="mt-auto relative z-10 flex items-center gap-4">
            <div className="text-sm text-slate-400">
              <div>Guest access available — try it now.</div>
              <div className="mt-1 text-xs text-slate-500">
                All core features are live.
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Auth card(s) */}
        <aside className="lger:col-span-5 relative rounded-3xl bg-gradient-to-tr from-white/4 to-white/2 border-none">
          <div className="bg-gradient-to-b border rounded-3xl border-white/15 from-white/10 to-white/5 p-8 md:p-10 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-400 !text-wrap">
                Sign in to manage your posts, comment, and customize your
                profile.
              </p>
            </div>

            <div className="w-full flex flex-col items-center">
              <>
                <div className="btn btn-blue rounded-md bg-white/2 p-4">
                  <SignInButton mode={"modal"} />
                </div>
                <p className="text-center mt-3 text-sm text-slate-300">
                  Don&apos;t have an account?{" "}
                  <span className="text-indigo-300 hover:text-indigo-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded">
                    <SignUpButton mode={"modal"}>Create account</SignUpButton>
                  </span>
                </p>
              </>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-white/6 mt-2">
              <p className="text-sm text-slate-400">
                Want to preview the experience?
              </p>
              <div>
                <GuestLoginButton />
              </div>
            </div>

            <div className="text-xs text-slate-500 mt-1">
              <strong>Note:</strong> anonymous comments can be deleted by any
              user.
            </div>
          </div>
        </aside>

        {/* BOTTOM: About full-width on small screens */}
        <div className="md:col-span-12 mt-6">
          <div className="mx-auto max-w-3xl bg-gradient-to-b from-white/2 to-white/3 rounded-3xl p-8 border border-white/15 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">
              About this Site
            </h3>
            <p className="text-slate-300 leading-relaxed">
              This personal blog platform lets you create accounts and publish
              your own posts, comment on others, and interact as a guest. The
              platform includes lightweight moderation, a minimal UI toolkit,
              and fast publishing tools.
              <br />
              <span className="text-indigo-300 font-medium">
                Try creating a post or browsing as a guest!
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignMeIn;
