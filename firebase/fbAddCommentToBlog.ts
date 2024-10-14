// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface params {
  comment: {
    text: string;
    commenterUid: string | null | undefined;
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
    if(comment.commenterFullName === null || comment.commenterFullName === undefined) {
      comment.commenterFullName = "anonymous";
    }
    if(comment.commenterUid === null || comment.commenterUid === undefined) {
      comment.commenterUid = "0000";
    }
    if(comment.userPhotoUrl === null || comment.userPhotoUrl === undefined) {
      comment.userPhotoUrl = "0000";
    }
    console.log(comment);
    
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
