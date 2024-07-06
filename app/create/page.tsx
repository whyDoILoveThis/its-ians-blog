"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@clerk/nextjs";
import { fbCreateBlog } from "@/firebase/fbCreateBlog";
import { fbUploadImage } from "@/firebase/fbUploadImage"; // Firebase Storage upload function
import { fbGetAllBlogs } from "@/firebase/fbGetAllBlogs";
import Image from "next/image";
import RichText from "@/components/Inputs/RichText";
import RenderMarkdown from "@/components/main/RenderMarkdown";

const Page = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null); // State for file upload
  const [imageUrl, setImageUrl] = useState("");
  const { userId } = useAuth();
  const todaysDate = new Date();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const fetchedBlogs = await fbGetAllBlogs({ userId });
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Handle error as needed
      }
    };

    {
      userId && fetchBlogData();
    }
  }, [userId]);

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

    // Check if image file exists
    if (image) {
      try {
        // Upload image to Firebase Storage
        const tempImageUrl = await fbUploadImage(image);

        // Call function to create blog post with image URL
        fbCreateBlog({
          title,
          text,
          imageUrl: tempImageUrl,
          userId,
          docId: uuidv4(),
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
    } else {
      // Call function to create blog post without image URL
      fbCreateBlog({
        title,
        text,
        userId,
        docId: uuidv4(),
        createdAt: todaysDate.toDateString(),
      });

      // Reset form fields
      setTitle("");
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />

        <button type="submit">Save</button>
      </form>
      <div className="flex flex-col items-center">
        <RichText setText={setText} text={text} />
        <h1 className="text-3xl font-bold text-center">Blog Content</h1>
        {imageUrl !== "" && (
          <Image width={200} height={80} src={imageUrl} alt={imageUrl} />
        )}
        <h2>{title}</h2>
        <p>{todaysDate.toDateString()}</p>
        <div className="mt-4 p-4">
          <RenderMarkdown htmlContent={text} />
        </div>
      </div>
    </div>
  );
};

export default Page;
