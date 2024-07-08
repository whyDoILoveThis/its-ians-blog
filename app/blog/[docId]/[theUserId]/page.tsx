"use client";
import Button from "@/components/Buttons/Button";
import PopOver from "@/components/Buttons/PopOver";
import BlogComments from "@/components/main/BlogComments";
import BlogForm from "@/components/main/BlogForm";
import RenderMarkdown from "@/components/main/RenderMarkdown";
import { fbGetBlogById } from "@/firebase/fbGetBlogById";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = ({
  params: { docId, theUserId },
}: {
  params: { docId: string; theUserId: string };
}) => {
  const [theBlog, setTheBlog] = useState<Blog | null>();
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setTheBlog(await fbGetBlogById(theUserId, docId));
    };

    fetchBlog();
    setEdit(false);
  }, [theUserId, docId, updated]);

  if (!theBlog) {
  }

  return (
    <article className="flex flex-col items-center">
      {!edit ? (
        <button
          className="btn"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      ) : (
        <PopOver
          value={edit}
          setState={setEdit}
          isConfirmPop={true}
          btnTxt="Cancel"
          title="Your Changes Will Not Be Saved!!"
        />
      )}
      {edit ? (
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
            <Image
              width={300}
              height={100}
              src={theBlog?.imageUrl}
              alt="Blog Header Img"
            />
          )}
          <div className="mb-8">
            <h1>{theBlog?.title}</h1>
            <p>
              <b>Created:</b> {theBlog?.createdAt}
            </p>
          </div>
          <RenderMarkdown htmlContent={theBlog?.text} />
        </article>
      )}
      <BlogComments userId={theUserId} docId={docId} />
    </article>
  );
};

export default Page;
