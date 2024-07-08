import { db } from "@/lib/firebaseConfig"; // Ensure the correct path to your firebaseConfig
import { doc, getDoc } from "firebase/firestore";



export const fbGetBlogById = async (creatorUid: string, docId: string): Promise<Blog | null> => {
  try {
    const docRef = doc(db, `blogs-${creatorUid}`, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Blog; // Ensure casting to User type
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Throw error for handling in the component
  }
};
