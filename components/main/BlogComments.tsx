"use client";
import { fbAddCommentToBlog } from "@/firebase/fbAddCommentToBlog";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fbDeleteCommentFromBlog } from "@/firebase/fbDeleteCommentFromBlog";
import { CiTrash } from "react-icons/ci";
import Loader from "../Loader";
interface Props {
  userId: string;
  docId: string;
}

const BlogComments = ({ userId, docId }: Props) => {
  const [value, setValue] = useState("");
  const [blog, setBlog] = useState<Blog | null>();
  const [adding, setAdding] = useState(false);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBlog = async () => {
      setBlog(await fbGetBlogById(userId, docId));
    };

    setTimeout(() => {
      if (userId && docId) {
        fetchBlog();
      }
    }, 1000);
    setLoading(false);
  }, [userId, docId, adding]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const comment = {
      text: value,
      commenterUid: user?.id,
      commenterFullName: user?.fullName,
      userPhotoUrl: user?.imageUrl,
      createdAt: new Date().toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true, // Optional: For 12-hour format (AM/PM)
      }),
    };
    await fbAddCommentToBlog({
      comment,
      userId,
      docId,
    });
    setValue("");
    setLoading(false);
  };

  const handleDelete = async (
    comment: BlogComment,
    userId: string,
    docId: string
  ) => {
    setLoading(true);
    await fbDeleteCommentFromBlog({
      comment,
      userId,
      docId,
    });
    setLoading(false);
  };

  console.log(user);

  if (!blog) {
    return <Loader />;
  }
  return (
    <article className="p-4">
      {blog && (
        <div className="w-full max-w-[500px] flex flex-col p-4 bg-black bg-opacity-15 gap-4 border-thin rounded-xl">
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
                        className={`${
                          comment.commenterFullName === "anonymous" && "p-0"
                        } flex gap-2 bg-black bg-opacity-30 border-thin h-fit w-fit p-2 px-3 rounded-full`}
                      >
                        {comment.userPhotoUrl !== "0000" && (
                          <Image
                            className=" rounded-full"
                            width={25}
                            height={20}
                            alt="asdfasd"
                            src={comment.userPhotoUrl}
                          />
                        )}
                        <p
                          className={`${
                            comment.commenterFullName === "anonymous" &&
                            "text-slate-400 "
                          } text-nowrap`}
                        >
                          {comment.commenterFullName}
                        </p>
                      </Link>
                      <p className=" text-slate-700 dark:text-slate-400">
                        {comment.createdAt}
                      </p>
                    </div>
                  )}
                  <p>{comment.text}</p>
                  {user?.id === userId && (
                    <button
                      className="btn btn-trash w-fit"
                      onClick={() => {
                        handleDelete(comment, userId, docId);
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <Loader /> : <CiTrash />}
                    </button>
                  )}
                  {user?.id === comment.commenterUid && user?.id !== userId && (
                    <button
                      className="btn btn-trash w-fit"
                      onClick={() => {
                        fbDeleteCommentFromBlog({
                          comment,
                          userId,
                          docId,
                        });
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <Loader /> : <CiTrash />}
                    </button>
                  )}
                  {comment.commenterUid === "0000" && user?.id !== userId && (
                    <button
                      className="btn btn-trash w-fit"
                      onClick={() => {
                        fbDeleteCommentFromBlog({
                          comment,
                          userId,
                          docId,
                        });
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <Loader /> : <CiTrash />}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center">No Comments</p>
          )}
          <article className="pt-4 pb-0">
            <form
              onSubmit={handleSubmit}
              className="input flex justify-between"
            >
              <input
                className=" w-full bg-transparent focus:outline-none"
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
  );
};

export default BlogComments;
