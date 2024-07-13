import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fbSearchBlogs = async (
  searchQuery: string,
  userId: string
): Promise<Blog[]> => {
  const searchString = searchQuery.toUpperCase();
  const usersRef = collection(db, `blogs-${userId}`);
  const q = query(
    usersRef,
    where("title", ">=", searchString),
    where("title", "<=", searchQuery + "\uf8ff")
  );

  const querySnapshot = await getDocs(q);
  const blogs: Blog[] = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data() } as Blog);
  });
  let isNot = blogs === null;
  console.log(blogs, isNot);
  console.log(blogs);
  if (isNot) {
    const searchString = searchQuery.toLowerCase();
    const usersRef = collection(db, `blogs-${userId}`);
    const q = query(
      usersRef,
      where("title", ">=", searchString),
      where("title", "<=", searchQuery + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const blogs: Blog[] = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data() } as Blog);
    });
    console.log(blogs, isNot);
    console.log(blogs);
    return blogs;
  } else {
    return blogs;
  }
};
