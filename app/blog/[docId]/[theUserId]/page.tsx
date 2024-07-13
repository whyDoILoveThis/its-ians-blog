"use client";
import Button from "@/components/Buttons/Button";
import PopOver from "@/components/Buttons/PopOver";
import UserCardSmall from "@/components/Cards/UserCardSmall";
import Loader from "@/components/Loader";
import BlogComments from "@/components/main/BlogComments";
import BlogForm from "@/components/main/BlogForm";
import RenderMarkdown from "@/components/main/RenderMarkdown";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({
  params: { docId, theUserId },
}: {
  params: { docId: string; theUserId: string };
}) => {
  const { userId } = useAuth();
  const [theBlog, setTheBlog] = useState<Blog | null>();
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [fbUser, setFbUser] = useState<User | null | undefined>();

  useEffect(() => {
    const fetchBlog = async () => {
      setTheBlog(await fbGetBlogById(theUserId, docId));
    };

    const fetchUser = async () => {
      setFbUser(await fbGetUserById(theUserId));
    };

    fetchBlog();
    fetchUser();
    setEdit(false);
  }, [theUserId, docId, updated]);

  if (!theBlog || !fbUser) {
    return <Loader />;
  }

  return (
    <article className="flex flex-col items-center">
      {!edit && theBlog?.creatorUid === userId ? (
        <button
          className="btn"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      ) : (
        edit &&
        theBlog?.creatorUid === userId &&
        theBlog?.creatorUid === theUserId && (
          <PopOver
            value={edit}
            setState={setEdit}
            isConfirmPop={true}
            btnTxt="Cancel"
            title="Your Changes Will Not Be Saved!!"
          />
        )
      )}
      {edit && theBlog?.creatorUid === theUserId ? (
        <BlogForm
          existingImageUrl={theBlog?.imageUrl}
          existingTitle={theBlog?.title}
          existingText={theBlog?.text}
          docId={theBlog?.docId}
          value={updated}
          setState={setUpdated}
        />
      ) : (
        <article className="flex flex-col items-center p-4">
          {theBlog?.imageUrl && (
            <div>
              <div className=" flex items-center gap-1">
                <div className=" text-slate-600 dark:text-slate-400 mb-2 border-thin rounded-xl p-2 py-0 pb-1 bg-black bg-opacity-15">
                  <p>
                    <b>Created:</b> {theBlog?.createdAt}
                  </p>
                  <p>
                    <b>{theBlog?.lastUpdated && "Updated:"}</b>{" "}
                    {theBlog?.lastUpdated}
                  </p>
                </div>
              </div>
              {theBlog?.imageUrl ? (
                <Image
                  className="mb-2 rounded-2xl border border-slate-500 bg-black bg-opacity-15"
                  width={500}
                  height={100}
                  src={theBlog?.imageUrl}
                  alt="Blog Header Img"
                />
              ) : (
                <Loader />
              )}
              <UserCardSmall user={fbUser} />
            </div>
          )}

          <div className="my-8">
            <h1 className="text-center">{theBlog?.title}</h1>
          </div>
          <div className=" max-w-[800px]">
            <RenderMarkdown htmlContent={theBlog?.text} />
          </div>
        </article>
      )}
      <BlogComments userId={theUserId} docId={docId} />
    </article>
  );
};

export default Page;
