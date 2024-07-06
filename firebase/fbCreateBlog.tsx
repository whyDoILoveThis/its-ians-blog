// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface params {
  title: string;
  text: string;
  imageUrl?: string; // Optional image URL
  userId: string | null | undefined;
  docId: string;
  createdAt: string;
}

export async function fbCreateBlog({
  title,
  text,
  imageUrl,
  userId,
  docId,
  createdAt,
}: params) {
  try {
    const docRef = doc(db, `blogs-${userId}`, docId);
    await setDoc(docRef, {
      title: title,
      text: text,
      imageUrl: imageUrl || null, // Set imageUrl if provided, otherwise null
      creatorUid: userId,
      createdAt: createdAt,
      docId: docId,
    });
    console.log("Blog created successfully!");
  } catch (error) {
    console.error("Error creating blog:", error);
    // Handle error as needed
  }
}
