"use client";

import Form from "@/app/_components/Form";
import HeadingAuth from "@/app/_components/HeadingAuth";
import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";

const metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeadingAuth
        heading="Login"
        subHeading="Log in to continue renting and your tools."
      />

      <div>
        <LoginForm />
      </div>

      <p className=" mt-auto flex justify-center items-center text-sm text-gray-light">
        Don`t have an account?
        <Link className="text-primary-500 cursor-pointer " href="/auth/signup">
          Create Account
        </Link>
      </p>
    </div>
  );
}
