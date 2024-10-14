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

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <SignedIn>
        {!theUser && userId !== "user_2mzVBJENtgjNrQ8Ck1dFFZrScBK" && (
          <div>
            {" "}
            <div className="p-20 text-center flex flex-col items-center">
              <p className="mb-4">
                Save your info so that you can create blogs, and you can see
                other users
              </p>
              <button className="btn btn-green" onClick={handleSaveMyInfo}>
                Save Me!
              </button>
            </div>
          </div>
        )}
        {theUser && theUser?.photoUrl && !loading && (
          <div className="flex flex-col items-center">
            <p className="text-3xl font-semibold mb-4 text-center">
              👋🏽Hey, {user?.firstName}
            </p>
            <UserCardRegular user={theUser} />
            <article className="flex flex-col items-center">
              <div className="flex gap-2 m-6 mb-4">
                {showSearch && (
                  <button
                    onClick={() => {
                      setShowSearch(false);
                    }}
                    className="btn"
                  >
                    All Users
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
              {showSearch && <SearchUsers />}
              {!showSearch && (
                <div>
                  <h2 className="text-2xl mb-2">All Users</h2>
                  <div className="flex flex-col gap-2">
                    {allUsers.map((user: User, index) => (
                      <UserCardRegular key={index} user={user} />
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        )}
        {userId === "user_2mzVBJENtgjNrQ8Ck1dFFZrScBK" && (
          <article className="flex flex-col items-center">
            <p className="text-3xl font-semibold mb-4 text-center">
              👋🏽Welcome guest
            </p>
            <div className="flex gap-2 m-6 mb-4">
              {showSearch && (
                <button
                  onClick={() => {
                    setShowSearch(false);
                  }}
                  className="btn"
                >
                  All Users
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
            {showSearch && <SearchUsers />}
            {!showSearch && (
              <div>
                <h2 className="text-2xl mb-2">All Users</h2>
                <div className="flex flex-col gap-2">
                  {allUsers.map((user: User, index) => (
                    <UserCardRegular key={index} user={user} />
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </SignedIn>
      <SignedOut>
        <SplashPage />
      </SignedOut>
    </div>
  );
}
