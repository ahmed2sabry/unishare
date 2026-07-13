"use client";

import BackToLoginBtn from "@/app/_components/BackToLoginBtn";
import Form from "@/app/_components/Form";
import FormButton from "@/app/_components/FormButton";
import HeadingAuth from "@/app/_components/HeadingAuth";
import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";

// email for reset password

const metadata = {
  title: "check email",
};

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* حجم الصورة انا مثبته  */}
      <img
        className="mt-24 self-center"
        src="/check-your-email.svg"
        alt="check your email"
      />
      <HeadingAuth
        heading="Check Your Email"
        subHeading="We sent a reset link to your email.Follow the instructions to reset your password."
      />

      <BackToLoginBtn />
    </div>
  );
}
