"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "../Loader";

interface Props {
  user: User;
}

const UserCardRegular = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="border border-slate-500 rounded-xl p-3 bg-black bg-opacity-10">
      {user.photoUrl && user.firstName && (
        <Link
          onClick={() => {
            setLoading(true);
          }}
          href={`/user/${user.userId}`}
        >
          <div className="flex gap-1">
            <Image
              width={25}
              height={25}
              src={user.photoUrl}
              alt={user.firstName}
              className="rounded-full"
            />
            <p>{user.fullName}</p>
          </div>
          <p>{user.email}</p>
        </Link>
      )}{" "}
    </div>
  );
};

export default UserCardRegular;
