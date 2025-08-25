// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface params {
  isPrivate: boolean;
  title: string;
  text: string;
  imageUrl?: string; // Optional image URL
  userId: string | null | undefined;
  docId: string;
}

export async function fbUpdateBlog({
  isPrivate,
  title,
  text,
  imageUrl,
  userId,
  docId,
}: params) {
  try {
    const docRef = doc(db, `blogs-${userId}`, docId);
    await updateDoc(docRef, {
      isPrivate: isPrivate,
      title: title,
      text: text,
      imageUrl: imageUrl || null, // Set imageUrl if provided, otherwise null
      lastUpdated: new Date().toDateString(),
    });
    console.log("Blog created successfully!");
  } catch (error) {
    console.error("Error creating blog:", error);
    // Handle error as needed
  }
}
