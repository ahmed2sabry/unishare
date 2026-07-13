"use client";
import Link from "next/link";

import FormButton from "./FormButton";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { loginUser } from "../_lib/data-services";

import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/app/_components/Form";

import { useLogin } from "../_lib/hooks/useLogin";
import SpinnerMini from "./SpinnerMini";

function LoginForm() {
  const router = useRouter();
  const { isPending, mutateLogin } = useLogin();
  function onSubmit(data) {
    mutateLogin(data);
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Step index={0}>
        <Form.Field
          name="email"
          rules={{
            required: "Email is required",
            // pattern: {
            //   value: /^[a-zA-Z0-9._%+-]+@std\.mans\.edu\.eg$/,
            //   message: "Email must end with @std.mans.edu.eg",
            // },
          }}
        >
          <Form.Label>University Email</Form.Label>
          <Form.Input type="email" />
          <Form.Error />
        </Form.Field>
        <Form.Field
          name="password"
          rules={{
            required: "Password required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars",
            },
            // FIXME:change message error
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one digit, and one special character",
            },
          }}
        >
          <Form.Label>Password</Form.Label>
          {/* FIXME: error above input  */}
          <Form.Input type="password" />
          <Form.Error />
        </Form.Field>
        <Link
          className="text-[12px] text-primary-500 underline hover:no-underline self-end transition-all duration-300 -mt-3"
          href="/auth/forgot-password"
        >
          Forgot Password
        </Link>

        <Form.SubmitButton pending={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </Form.SubmitButton>
      </Form.Step>
    </Form>
  );
}

export default LoginForm;
