"use client";
import UserCardRegular from "@/components/Cards/UserCardRegular";
import Loader from "@/components/Loader";
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
  console.log(user);

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
  }, [userId]);

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
      {theUser?.photoUrl ? (
        <div>
          <p className="text-3xl font-semibold">👋🏽Hey, {user?.firstName}</p>
          {theUser?.userId !== userId && (
            <>
              <p>Save your info so that people can find your page</p>
              <button className="btn btn-green" onClick={handleSaveMyInfo}>
                Save Me!
              </button>
            </>
          )}
          <article>
            <h2 className="text-2xl m-2">All Users</h2>
            <div className="flex flex-col gap-2">
              {allUsers.map((user: User, index) => (
                <UserCardRegular key={index} user={user} />
              ))}
            </div>
          </article>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
