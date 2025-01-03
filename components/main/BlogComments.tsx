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
import LoaderSpinSmall from "../LoaderSpinSmall";
import { log } from "console";
interface Props {
  userId: string;
  docId: string;
}

const BlogComments = ({ userId, docId }: Props) => {
  const [value, setValue] = useState("");
  const [blog, setBlog] = useState<Blog | null>();
  const [adding, setAdding] = useState(false); //This is a trigger that when flipped will refetch the blog to refresh the comments
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    try {
      await fbDeleteCommentFromBlog({
        comment,
        userId,
        docId,
      });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                        } link !flex gap-2 bg-black bg-opacity-30 border-thin h-fit w-fit p-2 px-3 rounded-full`}
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
                  {/* if the logged in user is the blog author */}
                  {user?.id === userId && (
                    <button
                      className="btn btn-round hover:btn-red w-fit"
                      onClick={() => {
                        handleDelete(comment, userId, docId);
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <LoaderSpinSmall /> : <CiTrash />}
                    </button>
                  )}
                  {/* if comment is from blog author & the author is the one logged in */}
                  {user?.id === comment.commenterUid && user?.id !== userId && (
                    <button
                      className="btn  w-fit"
                      onClick={() => {
                        fbDeleteCommentFromBlog({
                          comment,
                          userId,
                          docId,
                        });
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <LoaderSpinSmall /> : <CiTrash />}
                    </button>
                  )}
                  {/* if comment is from anonymous user */}
                  {comment.commenterUid === "0000" && user?.id !== userId && (
                    <button
                      className="btn btn-round hover:!bg-red-500 hover:!bg-opacity-20 hover:border-red-500 hover:!text-red-500 text-xl transition-colors w-fit"
                      onClick={() => {
                        setLoading(true);
                        fbDeleteCommentFromBlog({
                          comment,
                          userId,
                          docId,
                        });
                        setAdding(!adding);
                      }}
                    >
                      {loading ? <LoaderSpinSmall /> : <CiTrash />}
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
