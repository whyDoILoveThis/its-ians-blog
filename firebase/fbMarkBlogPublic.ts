// fbMarkBlogPublic.ts
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

interface Params {
  userId: string | null | undefined;
  docId: string;
}

export async function fbMarkBlogPublic({ userId, docId }: Params) {
  try {
    if (!userId) throw new Error("User ID is required.");

    const docRef = doc(db, `blogs-${userId}`, docId);
    await updateDoc(docRef, {
      isPrivate: false,
    });

    console.log("Blog marked as public successfully!");
  } catch (error) {
    console.error("Error marking blog as public:", error);
  }
}
