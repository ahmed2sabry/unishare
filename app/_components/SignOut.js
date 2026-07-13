"use client";

import { signOut } from "next-auth/react";

function SignOut() {
  return (
    <button
      className="inline-block cursor-pointer text-gray-600 px-3 py-2 rounded-md bg-primary-300 hover:bg-primary-500 transition"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </button>
  );
}

export default SignOut;
