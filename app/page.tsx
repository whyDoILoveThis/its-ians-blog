"use client";
import UserCardRegular from "@/components/Cards/UserCardRegular";
import Loader from "@/components/Loader";
import SearchUsers from "@/components/main/SearchUsers";
import { fbGetAllUsers } from "@/firebase/fbGetAllUsers";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { fbSaveUser } from "@/firebase/fbSaveUser";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const clerkUser = useUser();
  const user = clerkUser.user;
  const { userId, isLoaded } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [theUser, setTheUser] = useState<User | null>();
  const [saved, setSaved] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSaveMyInfo = async () => {
    await fbSaveUser({
      userId,
      firstName: user?.firstName,
      fullName: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      photoUrl: user?.imageUrl,
    });
    setSaved(!saved);
  };

  useEffect(() => {
    if (userId) {
      const fetchAllUsers = async () => {
        setAllUsers(await fbGetAllUsers());
      };
      fetchAllUsers();
    }
  }, [userId, theUser]);

  useEffect(() => {
    if (userId) {
      const fetchTheUser = async () => {
        setTheUser(await fbGetUserById(userId));
      };
      fetchTheUser();
    }
  }, [userId, saved]);

  return (
    <div>
      {theUser && theUser?.photoUrl ? (
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold mb-4 text-center">
            👋🏽Hey, {user?.firstName}
          </p>
          <UserCardRegular user={theUser} />
          {!theUser && (
            <div>
              {" "}
              <div className="p-20 text-center flex flex-col items-center">
                <p>
                  Save your info so that people can find your page, and you can
                  see other users
                </p>
                <button className="btn btn-green" onClick={handleSaveMyInfo}>
                  Save Me!
                </button>
              </div>
            </div>
          )}

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
      ) : (
        <Loader />
      )}
    </div>
  );
}
