"use client";
import Button from "@/components/Buttons/Button";
import PopOver from "@/components/Buttons/PopOver";
import UserCardSmall from "@/components/Cards/UserCardSmall";
import Loader from "@/components/Loader";
import BlogComments from "@/components/main/BlogComments";
import BlogForm from "@/components/main/BlogForm";
import RenderMarkdown from "@/components/main/RenderMarkdown";
import { fbDeleteBlog } from "@/firebase/fbDeleteBlog";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { scrollToTop } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({
  params: { docId, theUserId },
}: {
  params: { docId: string; theUserId: string };
}) => {
  const { userId } = useAuth();
  const [theBlog, setTheBlog] = useState<Blog | null>();
  const [isDelete, setIsDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fbUser, setFbUser] = useState<User | null | undefined>();
  const router = useRouter();

  useEffect(() => {
    scrollToTop();
  }, []);

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

  useEffect(() => {
    const d = async () => {
      if (isDelete && theBlog?.docId) {
        await fbDeleteBlog({ userId, docId: theBlog?.docId });
        router.push(`/user/${userId}`);
      }
    };

    d();
  }, [isDelete, theBlog?.docId, userId, router]);

  useEffect(() => {
    if (theBlog && !theBlog.imageUrl) {
      setImageLoaded(true);
    }
  }, [theBlog]);

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
          <>
            <PopOver
              value={edit}
              setState={setEdit}
              isConfirmPop={true}
              btnTxt="Cancel Edit"
              title="Your Changes Will Not Be Saved!!"
            />
            <PopOver
              value={isDelete}
              setState={setIsDelete}
              isConfirmPop={true}
              btnTxt="Delete"
              btnClassNames="mt-2 btn-red"
              title="THIS BLOG WILL BE GONE FOREVER!!!!!😨😱😓💀"
            />
          </>
        )
      )}
      {edit && theBlog?.creatorUid === theUserId ? (
        <div className="mt-4">
          <BlogForm
            existingImageUrl={theBlog?.imageUrl}
            existingTitle={theBlog?.title}
            existingText={theBlog?.text}
            docId={theBlog?.docId}
            value={updated}
            setState={setUpdated}
          />
        </div>
      ) : (
        <article className="flex flex-col items-center w-full p-4">
          {theBlog?.imageUrl ? (
            <Image
              className="mb-2 rounded-2xl border border-slate-500 bg-black bg-opacity-15"
              width={500}
              height={100}
              src={theBlog?.imageUrl}
              alt="Blog Header Img"
              onLoadingComplete={() => {
                setImageLoaded(true);
              }}
            />
          ) : (
            !imageLoaded && <Loader />
          )}
          <div className="flex items-center gap-2">
            <UserCardSmall user={fbUser} />
            <div className="w-fit text-slate-600 dark:text-slate-400 mb-2 border-thin rounded-xl flex flex-col justify-center px-2 bg-black bg-opacity-15">
              <p>
                <b>Created:</b> {theBlog?.createdAt}
              </p>
              {theBlog.lastUpdated && (
                <p>
                  <b>Last Update:</b> {theBlog.lastUpdated}
                </p>
              )}
            </div>
          </div>

          <div className="my-4">
            <h1 className="text-center font-bold">{theBlog?.title}</h1>
          </div>
          <div className=" max-w-[800px] p-6">
            <RenderMarkdown htmlContent={theBlog?.text} />
          </div>
        </article>
      )}
      <BlogComments userId={theUserId} docId={docId} />
    </article>
  );
};

export default Page;
