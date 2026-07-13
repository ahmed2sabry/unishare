"use client";
import Link from "next/link";
import Form from "@/app/_components/Form";
import FormError from "@/app/_components/FormError";
import FormSuccess from "@/app/_components/FormSuccess";
import {
  forgotPassword,
  forgotPasswordAction,
} from "@/app/_lib/actions/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

function ForgotForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function onSubmit(data) {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPasswordAction(data).then((res) => {
        if (res?.error) {
          setError(res.error);
          return;
        }
        if (res?.success) {
          setSuccess(res.success);
          setTimeout(() => router.push("/auth/forgot-password/confirm"), 2000);
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
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          }}
        >
          <Form.Label>University Email</Form.Label>
          <Form.Error />
          <Form.Input type="email" />
        </Form.Field>

        {/* message */}
        <FormError message={error} />
        <FormSuccess message={success} />
        <Form.SubmitButton pending={isPending}>Send</Form.SubmitButton>

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

export default ForgotForm;
