import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
  comment?: BlogComment;
  user?: User | null | undefined;
}

const UserCardSmall = ({ comment, user }: Props) => {
  return (
    <>
      {comment ? (
        <Link
          href={`/user/${comment.commenterUid}`}
          className="flex gap-2 bg-black bg-opacity-30 border-thin h-fit w-fit p-2 px-3 rounded-full"
        >
          {comment.userPhotoUrl && (
            <Image
              className=" rounded-full"
              width={25}
              height={20}
              alt="asdfasd"
              src={comment.userPhotoUrl}
            />
          )}
          <p className=" text-nowrap">{comment.commenterFullName}</p>
        </Link>
      ) : (
        user && (
          <Link
            href={`/user/${user.userId}`}
            className="flex gap-2 bg-black bg-opacity-30 border-thin h-fit w-fit p-2 px-3 rounded-full"
          >
            {user.photoUrl && (
              <Image
                className=" rounded-full"
                width={25}
                height={20}
                alt="asdfasd"
                src={user.photoUrl}
              />
            )}
            <p className=" text-nowrap">{user.fullName}</p>
          </Link>
        )
      )}
    </>
  );
};

export default UserCardSmall;
