// fbDeleteBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteParams {
  userId: string | null | undefined;
  docId: string;
}

export async function fbDeleteBlog({ userId, docId }: DeleteParams) {
  if (!userId) {
    console.error("User ID is required to delete a blog.");
    return;
  }

  try {
    const docRef = doc(db, `blogs-${userId}`, docId);
    await deleteDoc(docRef);
    console.log("Blog deleted successfully!");
  } catch (error) {
    console.error("Error deleting blog:", error);
    // Handle error as needed
  }
}
