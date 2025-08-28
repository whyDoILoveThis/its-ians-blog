"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "../Loader";
import { useAuth } from "@clerk/nextjs";

interface Props {
  user: User;
}

const UserCardRegular = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  if (loading) return <Loader />;

  return (
    <>
      {user.photoUrl && user.firstName && (
        <Link
          href={`/user/${user.userId}`}
          onClick={() => setLoading(true)}
          className="relative !decoration-transparent flex items-center w-full max-w-sm p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 transition-all shadow-md hover:shadow-xl group overflow-hidden"
        >
          {/* Subtle background glow */}
          <span className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-300/10 rounded-full blur-2xl pointer-events-none"></span>
          <span className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-300/5 rounded-full blur-3xl pointer-events-none"></span>

          {/* Avatar */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-indigo-300 overflow-hidden shadow-sm">
            <Image
              src={user.photoUrl}
              alt={user.firstName}
              width={64}
              height={64}
              className="object-cover rounded-full"
            />
          </div>

          {/* User info */}
          <div className="ml-4 flex flex-col justify-center flex-1">
            {userId === user.userId && (
              <span className="absolute right-1 top-1 px-4 text-sm font-medium text-indigo-300 bg-slate-600/60 rounded-full w-fit tracking-wide">
                me
              </span>
            )}
            <p className="text-lg font-semibold text-slate-100 group-hover:text-indigo-300 transition">
              {user.fullName}
            </p>
            <p className="text-sm text-slate-300 truncate">{user.email}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserCardRegular;
