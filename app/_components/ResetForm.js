"use client";

import Link from "next/link";
import FormButton from "./FormButton";
import { set, useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { resetPassword } from "../_lib/actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineChevronLeft } from "react-icons/md";
import Form from "./Form";

function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const router = useRouter();

  function onSubmit(payload) {
    const data = {
      ...payload,
      token,
    };
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(data).then((data) => {
        if (data.success) {
          setSuccess(data?.success);
          setTimeout(() => router.push("/auth/login"), 2000);
        }
        if (data.error) {
          setError(data?.error);
        }
      });
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Step index={0}>
        <Form.Field
          name="email"
          rules={{
            required: "Email is required",
          }}
        >
          <Form.Label>University Email</Form.Label>
          <Form.Input type="email" />
          <Form.Error />
        </Form.Field>
        <Form.Field
          name="newPassword"
          rules={{
            required: "Password required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars",
            },

            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one digit, and one special character",
            },
          }}
        >
          <Form.Label>New Password</Form.Label>
          <Form.Input type="password" />
          <Form.Error />
        </Form.Field>
        <Form.Field
          name="confirmPassword"
          rules={{
            required: "Confirm Password is required",
          }}
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Input type="password" variant="reset" />
          <Form.Error />
        </Form.Field>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Form.SubmitButton pending={isPending}>reset</Form.SubmitButton>
        {/* <Link
          href="/auth/login"
          className="text-center flex items-center justify-center space-x-1 hover:space-x-3 transition-all"
        >
          <MdOutlineChevronLeft className="text-2xl" />
          <span className="">Back to Login</span>
        </Link> */}
        <Link
          className="text-base text-center text-primary-500 no-underline hover:underline  transition-all duration-300"
          href="/auth/login"
        >
          Back to Log in
        </Link>
      </Form.Step>
    </Form>
  );
}

export default ResetForm;
