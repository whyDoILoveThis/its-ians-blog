"use client";

import Button from "@/components/Buttons/Button";
import PopOver from "@/components/Buttons/PopOver";
import UserCardSmall from "@/components/Cards/UserCardSmall";
import Loader from "@/components/Loader";
import LoaderSpinSmall from "@/components/LoaderSpinSmall";
import BlogComments from "@/components/main/BlogComments";
import BlogForm from "@/components/main/BlogForm";
import RenderMarkdown from "@/components/main/RenderMarkdown";
import { fbDeleteBlog } from "@/firebase/fbDeleteBlog";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import { fbGetUserById } from "@/firebase/fbGetUserById";
import { fbMarkBlogPrivate } from "@/firebase/fbMarkBlogPrivate";
import { fbMarkBlogPublic } from "@/firebase/fbMarkBlogPublic";
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
  const router = useRouter();

  const [theBlog, setTheBlog] = useState<Blog | null>(null);
  const [fbUser, setFbUser] = useState<User | null>(null);

  const [isDelete, setIsDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const [isPrivate, setIsPrivate] = useState<boolean | null>(null);
  const [loadingPrivate, setLoadingPrivate] = useState(false);

  const [updated, setUpdated] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // Fetch blog + user
  useEffect(() => {
    const fetchData = async () => {
      const blog = await fbGetBlogById(theUserId, docId);
      setTheBlog(blog);
      setIsPrivate(blog?.isPrivate ?? false); // Sync state with DB value

      const user = await fbGetUserById(theUserId);
      setFbUser(user);
    };
    fetchData();
    setEdit(false);
  }, [theUserId, docId, updated]);

  // Delete blog
  useEffect(() => {
    if (isDelete && theBlog?.docId) {
      const deleteBlog = async () => {
        await fbDeleteBlog({ userId, docId: theBlog.docId });
        router.push(`/user/${userId}`);
      };
      deleteBlog();
    }
  }, [isDelete, theBlog?.docId, userId, router]);

  // Handle privacy changes
  useEffect(() => {
    if (isPrivate === null) return; // Wait until loaded

    const updatePrivacy = async () => {
      setLoadingPrivate(true);
      try {
        if (isPrivate) {
          await fbMarkBlogPrivate({ userId, docId });
        } else {
          await fbMarkBlogPublic({ userId, docId });
        }
        setUpdated((prev) => !prev); // Trigger refresh
      } catch (err) {
        console.error("Error updating blog privacy:", err);
      } finally {
        setLoadingPrivate(false);
      }
    };

    updatePrivacy();
  }, [isPrivate]);

  // Mark image loaded if no image
  useEffect(() => {
    if (theBlog && !theBlog.imageUrl) {
      setImageLoaded(true);
    }
  }, [theBlog]);

  // Loading state
  if (!theBlog || !fbUser) {
    return <Loader />;
  }

  console.log(theBlog);

  // Private access restriction
  if (theBlog.isPrivate && theBlog.creatorUid !== userId) {
    return (
      <article>
        <p className="p-4 text-center font-bold">
          I don’t know how you got this link, because it’s private. <br /> You
          cannot access this page... <br /> Now get lost!! 🤬
        </p>
      </article>
    );
  }

  return (
    <article className="flex flex-col items-center">
      {/* Edit / Delete Controls */}
      {!edit && theBlog.creatorUid === userId ? (
        <button className="btn mb-2" onClick={() => setEdit(true)}>
          Edit
        </button>
      ) : (
        edit &&
        theBlog.creatorUid === userId &&
        theBlog.creatorUid === theUserId && (
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
              title="THIS BLOG WILL BE GONE FOREVER!!!!! 😨😱💀"
            />
          </>
        )
      )}

      {/* Privacy Toggle */}
      {!edit && theBlog.creatorUid === userId && (
        <div className="flex justify-center gap-4 mb-2">
          {loadingPrivate && (
            <div className="fixed z-[999999] inset-0 bg-black bg-opacity-60 flex justify-center items-center">
              <LoaderSpinSmall />
            </div>
          )}
          <PopOver
            btnTxt={isPrivate ? "Make Public" : "Make Private"}
            title={
              isPrivate
                ? "Mark this blog as public?"
                : "Mark this blog as private?"
            }
            line1={
              isPrivate
                ? "Anyone will be able to find it."
                : "You will be the only one that can find it."
            }
            isConfirmPop={true}
            value={isPrivate}
            setState={(val: boolean) => setIsPrivate(val)}
          />
        </div>
      )}

      {/* Edit Mode */}
      {edit && theBlog.creatorUid === theUserId ? (
        <div className="mt-4">
          <BlogForm
            existingPrivacy={theBlog.isPrivate}
            existingImageUrl={theBlog.imageUrl}
            existingTitle={theBlog.title}
            existingText={theBlog.text}
            docId={theBlog.docId}
            value={updated}
            setState={setUpdated}
          />
        </div>
      ) : (
        // Blog Display
        <article className="flex flex-col items-center w-full p-4">
          {theBlog.imageUrl ? (
            <Image
              className="mb-2 rounded-2xl border border-slate-500 bg-black bg-opacity-15"
              width={500}
              height={100}
              src={theBlog.imageUrl}
              alt="Blog Header Img"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          ) : (
            !imageLoaded && <Loader />
          )}
          <div className="flex items-center gap-2">
            <UserCardSmall user={fbUser} />
            <div className="w-fit text-slate-600 dark:text-slate-400 mb-2 border-thin rounded-xl flex flex-col justify-center px-2 bg-black bg-opacity-15">
              <p>
                <b>Created:</b> {theBlog.createdAt}
              </p>
              {theBlog.lastUpdated && (
                <p>
                  <b>Last Update:</b> {theBlog.lastUpdated}
                </p>
              )}
            </div>
          </div>

          <div className="my-4">
            <h1 className="text-center font-bold">{theBlog.title}</h1>
          </div>
          <div className="max-w-[800px] p-6">
            <RenderMarkdown htmlContent={theBlog.text} />
          </div>
        </article>
      )}

      {/* Comments */}
      <BlogComments userId={theUserId} docId={docId} />
    </article>
  );
};

export default Page;
