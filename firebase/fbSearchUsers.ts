import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fbSearchUsers = async (searchQuery: string): Promise<User[]> => {
  if (!searchQuery.trim()) return [];

  const searchQueryLower = searchQuery.toLowerCase();
  const usersRef = collection(db, "users");

  try {
    // Fetch all users (Firestore doesn't natively support substring matching)
    const querySnapshot = await getDocs(usersRef);
    const users: User[] = querySnapshot.docs.map((doc) => doc.data() as User);

    // Filter users locally to match any part of their fullName
    const filteredUsers = users.filter((user) =>
      user.fullName?.toLowerCase().includes(searchQueryLower)
    );

    return filteredUsers;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};
