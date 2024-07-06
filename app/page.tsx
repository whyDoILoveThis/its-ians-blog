"use client";
import { fbGetAllUsers } from "@/firebase/fbGetAllUsers";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { fbSaveUser } from "@/firebase/fbSaveUser";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const clerkUser = useUser();
  const user = clerkUser.user;
  const { userId } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [theUser, setTheUser] = useState<User | null>();
  console.log(user);

  const handleSaveMyInfo = async () => {
    await fbSaveUser({
      userId,
      firstName: user?.firstName,
      fullName: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      photoUrl: user?.imageUrl,
    });
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
  }, [userId]);

  return (
    <>
      <p className="text-3xl font-semibold">👋🏽Hey, {user?.firstName}</p>
      <p>Save your info so that people can find your page</p>
      <button onClick={handleSaveMyInfo}>Save Me!</button>
      <article>
        <h2 className="text-2xl">All Users</h2>
        <div>
          {allUsers.map((user: User) => (
            <div key={user.userId}>
              <p>{user.firstName}</p>
              <Link href={`/user/${user.userId}`}>
                {user.firstName}&#39;s Profile
              </Link>
            </div>
          ))}
          <p>{theUser?.fullName}</p>
        </div>
      </article>
    </>
  );
}
