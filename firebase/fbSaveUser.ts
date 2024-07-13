// fbCreateBlog.ts
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


interface Params {
  userId: MaybeString;
  firstName: MaybeString;
  fullName: MaybeString;
  email: MaybeString;
  photoUrl: MaybeString;
}

export async function fbSaveUser({
  userId,
  firstName,
  fullName,
  email,
  photoUrl,
}: Params) {
 if(userId && fullName){   
     const docId = userId;
 try {
    const docRef = doc(db, `users`, docId);
    await setDoc(docRef, {
      userId: userId,
      firstName: firstName,
      fullName: fullName,
      fullNameLower: fullName.toLowerCase(),
      email: email,
      photoUrl: photoUrl,
    });
    console.log("Blog created successfully!");
  } catch (error) {
    console.error("Error creating blog:", error);
    // Handle error as needed
  }}
}
