"use client";

import BackToLoginBtn from "@/app/_components/BackToLoginBtn";
import Form from "@/app/_components/Form";
import FormButton from "@/app/_components/FormButton";
import HeadingAuth from "@/app/_components/HeadingAuth";
import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";

// email for reset password

const metadata = {
  title: "confirm account",
};

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* حجم الصورة انا مثبته  */}
      <img
        className="mt-24 self-center"
        src="/confirm-your-account.svg"
        alt="confirm your account"
      />
      <HeadingAuth
        heading="Confirm Account"
        subHeading="We sent a verification link to your email. Open it to activate your account."
      />

      <BackToLoginBtn />
    </div>
  );
}
