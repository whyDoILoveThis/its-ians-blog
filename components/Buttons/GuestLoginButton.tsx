"use client";
import { scrollToTop } from "@/utils";
import { useSignIn } from "@clerk/clerk-react"; // Import the useSignIn hook
import Error from "next/error";
import { useState } from "react";

const GuestLoginButton = () => {
  const { signIn, setActive } = useSignIn();
  const [error, setError] = useState<string | null>(null);

  // Hardcoded credentials (replace with real credentials)
  const email = "guest@guset.com";
  const password = "testguest123";

  const handleAutoLogin = async () => {
    try {
      const signInAttempt =
        signIn &&
        (await signIn.create({
          identifier: email,
          password,
        }));

      scrollToTop();

      if (signInAttempt?.status === "complete") {
        // If sign-in is successful, set the user session as active
        signInAttempt &&
          (await setActive({ session: signInAttempt.createdSessionId }));
        setError(null); // Clear error if login is successful
        console.log("User logged in successfully!");
      } else {
        console.log("Sign-in requires further steps.");
      }
    } catch (err) {
      // Handle errors (e.g., incorrect credentials)
    }
  };

  return (
    <button className="btn btn-green w-fit mt-4" onClick={handleAutoLogin}>
      Explore as guest
    </button>
  );
};

export default GuestLoginButton;
