import React, { useEffect, useState } from "react";
import InputText from "../Inputs/InputText";
import Button from "../Buttons/Button";
import RichText from "../Inputs/RichText";
import Image from "next/image";
import RenderMarkdown from "./RenderMarkdown";
import { fbUploadImage } from "@/firebase/fbUploadImage";
import { fbCreateBlog } from "@/firebase/fbCreateBlog";
import { fbUpdateBlog } from "@/firebase/fbUpdateBlog";
import { useAuth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

interface Props {
  existingPrivacy?: boolean;
  existingImageUrl?: string;
  existingTitle?: string;
  existingText?: string;
  docId?: string;
  value?: boolean;
  setState?: (value: boolean) => void;
}

const BlogForm = ({
  existingPrivacy,
  existingImageUrl,
  existingTitle,
  existingText,
  docId,
  value,
  setState,
}: Props) => {
  const [isPrivate, setIsPrivate] = useState(existingPrivacy || false); // State for private blog
  const [title, setTitle] = useState(existingTitle || ""); // Initialize with existing title or empty string
  const [text, setText] = useState(existingText || ""); // Initialize with existing text or empty string
  const [image, setImage] = useState<File | null>(null); // State for file upload
  const [imageUrl, setImageUrl] = useState("");
  const [isUpToDate, setIsUpToDate] = useState(false);
  const newDocId = uuidv4();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const todaysDate = new Date();

  useEffect(() => {
    setTitle(existingTitle || "");
    setText(existingText || "");
    setImageUrl(existingImageUrl || "");
    setIsPrivate(existingPrivacy || false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function stripHtml(html: string) {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
    const isSameTitle = title.trim() === (existingTitle ?? "").trim();
    const isSameText =
      stripHtml(text).trim() === stripHtml(existingText ?? "").trim();
    const isSameImage = imageUrl === (existingImageUrl ?? "");
    const hasImage = image !== null;
    const isSamePrivacy = isPrivate === (existingPrivacy ?? false);

    setIsUpToDate(
      isSameTitle && isSameText && isSameImage && !hasImage && isSamePrivacy
    );
    console.log({
      title,
      existingTitle,
      titleUnchanged: title.trim() === (existingTitle ?? "").trim(),
      textUnchanged: text.trim() === (existingText ?? "").trim(),
      imageUrl,
      existingImageUrl,
      image,
    });
    console.log(
      "TEXT LENGTH",
      text.length,
      "EXISTING LENGTH",
      (existingText ?? "").length
    );
    console.log("TEXT === EXISTING:", text === (existingText ?? ""));
  }, [
    title,
    text,
    image,
    imageUrl,
    isPrivate,
    existingTitle,
    existingText,
    existingImageUrl,
    existingPrivacy,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Use FileReader to read and display the image
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (docId) {
      if (image) {
        try {
          // Upload image to Firebase Storage
          const tempImageUrl = await fbUploadImage(image);

          // Call function to create blog post with image URL
          await fbUpdateBlog({
            isPrivate,
            title,
            text,
            imageUrl: tempImageUrl,
            userId,
            docId,
          });
          if (docId) {
            setIsUpToDate(true); // ✅ after update
          }

          // Reset form fields
          setTitle("");
          setText("");
          setImage(null);
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error uploading image
        }
      }
      //create blog with no image
      else if (existingImageUrl) {
        // Call function to create blog post without image URL
        await fbUpdateBlog({
          isPrivate,
          title,
          text,
          imageUrl: existingImageUrl,
          userId,
          docId,
        });
      } else {
        await fbUpdateBlog({
          isPrivate,
          title,
          text,
          userId,
          docId,
        });
      }
    }

    // Check if image file exists
    if (image && !existingText && !existingTitle) {
      try {
        // Upload image to Firebase Storage
        const tempImageUrl = await fbUploadImage(image);

        // Call function to create blog post with image URL
        fbCreateBlog({
          isPrivate,
          title,
          text,
          imageUrl: tempImageUrl,
          userId,
          docId: newDocId,
          createdAt: todaysDate.toDateString(),
        });

        // Reset form fields
        setTitle("");
        setText("");
        setImage(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error uploading image
      }
      //create blog with no image
    } else if (!existingText && !existingTitle) {
      // Call function to create blog post without image URL
      fbCreateBlog({
        isPrivate,
        title,
        text,
        userId,
        docId: newDocId,
        createdAt: todaysDate.toDateString(),
      });

      // Reset form fields
      setTitle("");
      setText("");
    }
    if (setState) {
      setState(!value);
    }

    if (!existingTitle) {
      router.push(`blog/${newDocId}/${userId}`);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {!existingText && (
        <h1 className="text-center mt-4 mb-8">Create New Blog</h1>
      )}
      <div className="flex justify-center mb-4 gap-2">
        <button
          type="button"
          onClick={() => {
            setIsPrivate(true);
          }}
          className={`btn ${
            isPrivate && "!border-yellow-400 !text-yellow-400"
          }`}
        >
          Private
        </button>
        <button
          type="button"
          onClick={() => {
            setIsPrivate(false);
          }}
          className={`btn ${
            !isPrivate && "!border-yellow-400 !text-yellow-400"
          }`}
        >
          Public
        </button>
      </div>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="image">Optionally add an image</label>

          <div className="input">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Chose a short title</label>
          <InputText id="title" type="text" value={title} onChange={setTitle} />
        </div>

        <RichText setText={setText} text={text ? text : existingText} />
        <button
          disabled={isUpToDate}
          className={`btn btn-green fixed right-2 bottom-2 backdrop-blur-md ${
            isUpToDate && "!cursor-not-allowed"
          }`}
          type="submit"
        >
          {isUpToDate ? "Up to date 👍🏽" : "Save"}
        </button>
      </form>
      <article className="mt-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Blog Content</h1>
        {imageUrl !== "" && (
          <Image width={200} height={80} src={imageUrl} alt={imageUrl} />
        )}
        <h2>{title}</h2>
        <p>{todaysDate.toDateString()}</p>
        <div className="mt-4 p-4">
          <RenderMarkdown htmlContent={text ? text : existingText} />
        </div>
      </article>
    </div>
  );
};

export default BlogForm;
