import HeadingAuth from "@/app/_components/HeadingAuth";
import ForgotForm from "@/app/_components/ForgotForm";

import Link from "next/link";

const metadata = {
  title: "forgot password",
};

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeadingAuth
        heading="Forget Password"
        subHeading="Enter your email to receive a password reset link."
      />

      <div>
        <ForgotForm />
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
