"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";

function GoogleBtn() {
  const login = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const idToken = tokenResponse.access_token;
      await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        googleToken: idToken,
      });
    },
    onError: () => console.log("Google login error"),
  });
  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex-1 flex items-center justify-center gap-2 py-3 bg-background rounded-xl border-2 border-background cursor-pointer hover:bg-white transition-all"
    >
      <img src="/google.svg" alt="Google icon" />
      <span className="text-base">Google</span>
    </button>
  );
}

export default GoogleBtn;
