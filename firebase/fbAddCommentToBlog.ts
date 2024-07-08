// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface params {
  comment: {
    text: string;
    commenterUid: string;
    commenterFullName: string | null | undefined;
    userPhotoUrl: string | null | undefined;
    createdAt: string;
  };
  userId: string | null | undefined;
  docId: string;
}

export async function fbAddCommentToBlog({
  comment,
  userId,
  docId,
}: params) {
  try {
    const docRef = doc(db, `blogs-${userId}`, docId);
    await updateDoc(docRef, {
      comments: arrayUnion(comment),
    });
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error adding comment:", error);
    // Handle error as needed
  }
}
