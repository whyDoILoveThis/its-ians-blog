// firebaseFunctions.ts
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";


interface params {
    userId: string | null | undefined;
}

export const fbGetUsersBlogs = async ({userId} : params): Promise<Blog[]> => {
  const blogs: Blog[] = [];

  try {
    const q = query(collection(db, `blogs-${userId}`));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const blog: Blog = {
        id: doc.id,
        title: data.title,
        text: data.text,
        isPrivate: data.isPrivate || false,
        imageUrl: data.imageUrl || undefined,
        creatorUid: data.creatorUid,
        createdAt: data.createdAt,
        lastUpdated: data.lastUpdated || undefined,
        docId: data.docId
      };
      
      blogs.push(blog);
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; // Throw error for handling in the component
  }
};
