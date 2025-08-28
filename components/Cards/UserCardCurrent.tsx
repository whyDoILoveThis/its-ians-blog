"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "../Loader";

interface Props {
  user: User;
}

const UserCardCurrent = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);

  if (loading) return <Loader />;

  return (
    <>
      {user.photoUrl && user.firstName && (
        <Link
          onClick={() => setLoading(true)}
          href={`/user/${user.userId}`}
          className="relative !decoration-transparent flex items-center w-full max-w-4xl p-4 rounded-3xl bg-gradient-to-r from-slate-800/70 via-slate-700/50 to-slate-800/70 shadow-lg hover:shadow-2xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
        >
          {/* Glow/animation accent */}
          <span className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>
          <span className="absolute -bottom-6 -right-6 w-40 h-40 bg-indigo-300/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>

          {/* Avatar */}
          <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-indigo-300 overflow-hidden shadow-md">
            <Image
              src={user.photoUrl}
              alt={user.firstName}
              width={96}
              height={96}
              className="object-cover rounded-full"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-center ml-6 flex-1">
            <p className="text-2xl font-semibold text-slate-100">
              {user.fullName}
            </p>
            <span className="inline-block mt-1 px-4 py-1 text-sm font-medium text-indigo-300 bg-slate-600/60 rounded-full w-fit tracking-wide">
              me
            </span>
            <p className="text-sm text-slate-300 mt-1">{user.email}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserCardCurrent;
