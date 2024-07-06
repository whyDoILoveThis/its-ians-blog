// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";




export async function fbSaveUser({
  userId,
  firstName,
  fullName,
  email,
  photoUrl,
}: User) {
 if(userId && fullName){   
     const docId = userId;
 try {
    const docRef = doc(db, `users`, docId);
    await setDoc(docRef, {
      userId: userId,
      firstName: firstName,
      fullName: fullName,
      email: email,
      photoUrl: photoUrl,
    });
    console.log("Blog created successfully!");
  } catch (error) {
    console.error("Error creating blog:", error);
    // Handle error as needed
  }}
}
