"use client";
import { fbAddCommentToBlog } from "@/firebase/fbAddCommentToBlog";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fbDeleteCommentFromBlog } from "@/firebase/fbDeleteCommentFromBlog";
import { CiTrash } from "react-icons/ci";

interface Props {
  userId: string;
  docId: string;
}

const BlogComments = ({ userId, docId }: Props) => {
  const [value, setValue] = useState("");
  const [blog, setBlog] = useState<Blog | null>();
  const [adding, setAdding] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchBlog = async () => {
      setBlog(await fbGetBlogById(userId, docId));
    };

    setTimeout(() => {
      if (userId && docId) {
        fetchBlog();
      }
    }, 1000);
  }, [userId, docId, adding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const comment = {
      text: value,
      commenterUid: userId,
      commenterFullName: user?.fullName,
      userPhotoUrl: user?.imageUrl,
      createdAt: new Date().toDateString(),
    };
    await fbAddCommentToBlog({
      comment,
      userId,
      docId,
    });
    setValue("");
  };
  return (
    <article className="">
      <article className="m-4 p-4 pb-0">
        {blog && (
          <div className="flex flex-col bg-black bg-opacity-15 gap-4 border-thin p-4 rounded-xl">
            <h2 className="text-center">Comments</h2>
            {blog.comments?.length && blog.comments.length > 0 ? (
              blog.comments?.map((comment: BlogComment, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col bg-black bg-opacity-25 justify-center gap-2 border-thin p-2 rounded-xl"
                  >
                    {comment.userPhotoUrl && (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/user/${comment.commenterUid}`}
                          className="flex gap-2 bg-black bg-opacity-30 border-thin h-fit w-fit p-2 px-3 rounded-full"
                        >
                          <Image
                            className=" rounded-full"
                            width={25}
                            height={20}
                            alt="asdfasd"
                            src={comment.userPhotoUrl}
                          />
                          <p className=" text-nowrap">
                            {comment.commenterFullName}
                          </p>
                        </Link>
                        <p className=" text-slate-700 dark:text-slate-400">
                          {comment.createdAt}
                        </p>
                      </div>
                    )}
                    <p>{comment.text}</p>
                    {user?.id === comment.commenterUid && (
                      <button
                        className="btn btn-trash w-fit"
                        onClick={() => {
                          fbDeleteCommentFromBlog({
                            comment,
                            userId: comment.commenterUid,
                            docId: blog.docId,
                          });
                          setAdding(!adding);
                        }}
                      >
                        <CiTrash />
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center">No Comments</p>
            )}
            <article className="p-8 pt-4 pb-0">
              <form
                onSubmit={handleSubmit}
                className="input flex justify-between"
              >
                <input
                  className=" bg-transparent focus:outline-none"
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    setAdding(!adding);
                  }}
                  className="btn"
                >
                  add
                </button>
              </form>
            </article>
          </div>
        )}
      </article>
    </article>
  );
};

export default BlogComments;
