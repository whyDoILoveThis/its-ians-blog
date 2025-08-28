"use client";
import UserCardRegular from "@/components/Cards/UserCardRegular";
import Loader from "@/components/Loader";
import SearchUsers from "@/components/main/SearchUsers";
import { useRouter } from "next/router";
import { fbGetAllUsers } from "@/firebase/fbGetAllUsers";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { fbSaveUser } from "@/firebase/fbSaveUser";
import { scrollToTop } from "@/utils";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import SplashPage from "@/components/SplashPage/SplashPage";
import Search from "@/components/Icons/Search";
import UserCardCurrent from "@/components/Cards/UserCardCurrent";

export default function Home() {
  const clerkUser = useUser();
  const user = clerkUser.user;
  const { userId, isLoaded } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [theUser, setTheUser] = useState<User | null>();
  const [saved, setSaved] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleSaveMyInfo = async () => {
    setLoading(true);
    await fbSaveUser({
      userId,
      firstName: user?.firstName,
      fullName: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      photoUrl: user?.imageUrl,
    });
    setSaved(!saved);
    setLoading(false);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userId) {
        setAllUsers(await fbGetAllUsers());
      }
    };
    fetchAllUsers();
  }, [userId, theUser]);

  useEffect(() => {
    setLoading(true);
    const fetchTheUser = async () => {
      if (userId) {
        setTheUser(await fbGetUserById(userId));
        setLoading(false);
      }
      setLoading(false);
    };
    fetchTheUser();
  }, [userId, saved]);

  if (loading) return <Loader />;

  return (
    <div className=" text-gray-900 dark:text-gray-100 min-h-screen">
      <SignedIn>
        {!theUser && (
          <div className="p-20 text-center flex flex-col items-center">
            <p className="mb-4 dark:text-gray-200">
              Save your info so that you can create blogs, and you can see other
              users
            </p>
            <button className="btn btn-green" onClick={handleSaveMyInfo}>
              Save Me!
            </button>
          </div>
        )}

        {theUser && theUser?.photoUrl && !loading && (
          <section className="w-full flex flex-col items-center px-6 py-10">
            {/* HERO */}
            <header className="w-full max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight dark:text-indigo-300 text-indigo-400">
                👋🏽 HEY, {user?.firstName ?? "there"} — Welcome Home!
              </h1>
            </header>

            {/* PAGE GRID */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN */}
              <aside className="lg:col-span-4 flex flex-col gap-6">
                <div className="w-full">
                  <UserCardCurrent user={theUser} />
                </div>

                <div className="w-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowSearch((s) => !s)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent hover:bg-gray-200/40 dark:hover:bg-gray-700/60 transition text-gray-900 dark:text-gray-100 border border-gray-300/25 dark:border-gray-700/25"
                      aria-pressed={showSearch}
                      aria-label={
                        showSearch ? "Show all users" : "Open user search"
                      }
                    >
                      <Search />
                      <span className="text-sm font-medium">
                        {showSearch ? "All Users" : "Search Users"}
                      </span>
                    </button>
                    <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                      {showSearch
                        ? "Showing search"
                        : `All users (${allUsers.length})`}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Tip: toggle search to find someone quickly — guest & admin
                    actions available.
                  </p>
                </div>
              </aside>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Search area */}
                <div
                  className={`w-full transition-all ${
                    showSearch
                      ? "max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {showSearch && (
                    <div className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 rounded-2xl p-5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        🔎 Search Users
                      </label>
                      <SearchUsers />
                    </div>
                  )}
                </div>

                {/* Users list */}
                {!showSearch && (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-indigo-300 dark:text-indigo-300">
                        All Users
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {allUsers.length} members
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                      {allUsers.map((u) => (
                        <UserCardRegular key={u.userId} user={u} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Fallback */}
                {!showSearch && allUsers.length === 0 && (
                  <div className="p-8 rounded-2xl bg-gray-100/30 dark:bg-gray-800/30 border border-gray-300/40 dark:border-gray-700/40 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No users found. Invite your friends or try a search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* {userId === "user_2mzVBJENtgjNrQ8Ck1dFFZrScBK" && (
          <article className="flex flex-col items-center">
            <p className="text-3xl font-semibold mb-4 text-center dark:text-gray-100">
              👋🏽Welcome guest
            </p>
            <div className="flex gap-2 m-6 mb-4">
              {showSearch ? (
                <button onClick={() => setShowSearch(false)} className="btn">
                  All Users
                </button>
              ) : (
                <button onClick={() => setShowSearch(true)} className="btn">
                  Search
                </button>
              )}
            </div>
            {showSearch && <SearchUsers />}
            {!showSearch && (
              <div className="border border-white">
                <h2 className="text-2xl mb-2 dark:text-gray-100">All Users</h2>
                <div className="flex flex-col gap-2">
                  {allUsers.map((user: User, index) => (
                    <UserCardRegular key={index} user={user} />
                  ))}
                </div>
              </div>
            )}
          </article>
        )} */}
      </SignedIn>

      <SignedOut>
        <SplashPage />
      </SignedOut>
    </div>
  );
}
