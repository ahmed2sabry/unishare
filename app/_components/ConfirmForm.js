"use client";

import Link from "next/link";
import FormButton from "./FormButton";
import { MdOutlineChevronLeft } from "react-icons/md";
import { BeatLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { confirmAccount } from "../_lib/data-services";

function ConfirmForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = useSearchParams();
  const userId = params.get("userId");
  const token = params.get("token");

  useEffect(() => {
    const submit = async () => {
      if (!userId || !token) {
        setError("missing Token!");
        return;
      }

      try {
        const data = await confirmAccount(userId, token);
        setError(data.error);
        setSuccess(data.success);
      } catch (err) {
        setError("Network error");
      }
    };

    submit();
  }, [token, userId]);

  return (
    <form className="flex-1 flex flex-col gap-y-8 items-center">
      {/* <div className="text-base font-normal flex flex-col">
        <h4 className="mb-2">Email</h4>
        <input
          type="text"
          name="email"
          className="bg-background rounded-xl p-4 placeholder:text-gray-light w-full focus:outline-none focus:ring-1  focus:ring-primary-500"
          placeholder="Please enter your email"
        />
      </div> */}

      {/* <FormButton>Send</FormButton> */}

      {!error && !success && <BeatLoader color="#264fa8" />}
      <FormError message={error} />
      <FormSuccess message={success} />

      <Link
        href="/auth/login"
        className="text-center flex items-center justify-center space-x-1 hover:space-x-3 transition-all"
      >
        <MdOutlineChevronLeft className="text-2xl" />
        <span className="">Back to Login</span>
      </Link>
    </form>
  );
}

export default ConfirmForm;
