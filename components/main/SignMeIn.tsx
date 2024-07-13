import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignMeIn = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center border-thin rounded-xl p-3 py-1 my-2">
        <h2 className="font-bold">Guest Login</h2>
        <h3>
          <b>Email:</b> guest@g.com
        </h3>
        <h3>
          <b>Password:</b> password
        </h3>
      </div>
      <SignIn routing="hash" />
    </div>
  );
};

export default SignMeIn;
