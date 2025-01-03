import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";


interface Params {
    comment: BlogComment;
  userId: string | null | undefined;
  docId: string;
}

export async function fbDeleteCommentFromBlog({
  comment,
  userId,
  docId,
}: Params) {
  try {
    console.log(userId, '---------------', docId);
    
    const docRef = doc(db, `blogs-${userId}`, docId);
    await updateDoc(docRef, {
      comments: arrayRemove(comment),
    });
    console.log("Comment deleted successfully!");
  } catch (error) {
    console.error("Error deleting comment:", error);
    // Handle error as needed
  }
}
