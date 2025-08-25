// fbMarkBlogPrivate.ts
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface Params {
  userId: string | null | undefined;
  docId: string;
}

export async function fbMarkBlogPrivate({ userId, docId }: Params) {
  try {
    if (!userId) throw new Error("User ID is required.");

    const docRef = doc(db, `blogs-${userId}`, docId);
    await updateDoc(docRef, {
      isPrivate: true,
    });

    console.log("Blog marked as private successfully!");
  } catch (error) {
    console.error("Error marking blog as private:", error);
  }
}
