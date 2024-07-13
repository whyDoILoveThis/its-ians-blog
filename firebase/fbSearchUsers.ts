import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";


export const fbSearchUsers = async (searchQuery: string): Promise<User[]> => {
    const searchString = searchQuery.toUpperCase();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("fullName", ">=", searchString), where("fullName", "<=", searchQuery + "\uf8ff"));
    
    
    const querySnapshot = await getDocs(q);
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data() } as User);
    });
    let isNot = users === null;
    console.log(users, isNot);
    console.log(users);
    if(isNot) {
        const searchString = searchQuery.toLowerCase();
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("fullName", ">=", searchString), where("fullName", "<=", searchQuery + "\uf8ff"));
        
        
        const querySnapshot = await getDocs(q);
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data() } as User);
        });
        console.log(users, isNot);
        console.log(users);
        return users;
    } else{
        return users;

    }
};
