"use client";
import Form from "@/app/_components/Form";
import { useState, useTransition } from "react";
import { registerUser } from "../_lib/data-services";
import { useRouter } from "next/navigation";
import { useSignup } from "../_lib/hooks/useSignup";
import Link from "next/link";

function SignupForm({ colleges }) {
  const [error, setError] = useState("");

  const { isPending, signup } = useSignup();
  function onSubmit(FormData) {
    const { confirmPassword, CollegeId, ...rest } = FormData;
    const data = { ...rest, CollegeId: Number(CollegeId) };
    setError("");

    signup(data, {
      onSuccess: (resData) => {
        if (resData?.error) {
          setError(resData.error);
        }
      },
      onError: (err) => {
        setError(err.message || "Something went wrong");
      },
    });
  }
  return (
    <Form onSubmit={onSubmit}>
      <div className="mb-8 flex flex-col gap-6 items-center">
        <Form.StepCount />
        <Form.FormHeading />
      </div>
      {/* STEP 1 */}
      <Form.Step index={0}>
        <Form.Field
          name="FullName"
          rules={{
            required: "Full name is required",
          }}
        >
          <Form.Label>Full Name</Form.Label>
          <Form.Input type="text" />
          <Form.Error />
        </Form.Field>

        <Form.Field
          name="Email"
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
          name="Password"
          rules={{
            required: "Password required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars",
            },
            // validate: {
            //   hasUpperCase: (value) =>
            //     /[A-Z]/.test(value) ||
            //     "Password must contain at least one uppercase letter",
            //   hasNumber: (value) =>
            //     /\d/.test(value) || "Password must contain at least one digit",
            //   hasSpecialChar: (value) =>
            //     /[@$!%*?&]/.test(value) ||
            //     "Password must contain at least one special character",
            // },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one digit, and one special character",
            },
          }}
        >
          <Form.Label>Password</Form.Label>
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
          <Form.Input type="password" />
          <Form.Error />
        </Form.Field>

        <Form.NextButton
          fields={["Email", "Password", "confirmPassword", "FullName"]}
        />
        <p className=" mt-auto flex justify-center items-center text-sm text-gray-light">
          Do you have an account?
          <Link className="text-primary-500 cursor-pointer " href="/auth/login">
            Login
          </Link>
        </p>
      </Form.Step>

      {/* step 2 */}

      <Form.Step index={1}>
        <Form.Field
          name="UserName"
          rules={{
            required: "userName is required",
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message:
                "Username can only contain letters or digits (no spaces)",
            },
          }}
        >
          <Form.Label>User Name</Form.Label>
          <Form.Input type="text" />
          <Form.Error />
        </Form.Field>

        <Form.Field
          name="CollegeId"
          rules={{
            required: "college is required",
          }}
        >
          <Form.Label>College</Form.Label>
          <Form.Select options={colleges} />
          <Form.Error />
        </Form.Field>

        <Form.Field
          name="UniversityId"
          rules={{
            required: "studentId is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Student ID must be exactly 10 digits",
            },
          }}
        >
          <Form.Label>Student ID</Form.Label>
          {/* FIXME: number input */}
          <Form.Input type="number" />
          <Form.Error />
        </Form.Field>

        <Form.Field
          name="PhoneNumber"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^(010|011|012|015)[0-9]{8}$/,
              message: "Enter a valid Egyptian phone number",
            },
          }}
        >
          <Form.Label>Phone Number</Form.Label>
          {/* number input */}
          <Form.Input type="number" />
          <Form.Error />
        </Form.Field>

        <Form.NextButton
          fields={["UserName", "UniversityId", "PhoneNumber", "CollegeId"]}
        />
        {/* <Form.SubmitButton>Login</Form.SubmitButton> */}
      </Form.Step>

      {/* step 3 */}

      <Form.Step index={2}>
        <Form.Field
          name="ProfilePictureUrl"
          rules={{
            validate: {
              lessThan5MB: (file) =>
                file?.size < 5000000 || "Max file size is 5MB",
              acceptedFormats: (file) =>
                ["image/jpeg", "image/png", "image/gif"].includes(file?.type) ||
                "Only JPEG, PNG, and GIF formats are accepted",
            },
          }}
          // rules={{
          //   validate: (value) =>
          //     value instanceof File || "Avatar is required",
          // }}
          // rules={{
          //   validate: (value) =>
          //     (value && value.length > 0) || "Avatar is required",
          // }}
        >
          <Form.AvatarUpload />
          <Form.Error />
        </Form.Field>
        <Form.SubmitButton pending={isPending} type="signup">
          finish
        </Form.SubmitButton>

        {/* TODO: THIS BUTTON */}

        <Form.SkipButton />
      </Form.Step>
      {/* response messages */}
      <p className="text-red-600">{error}</p>
    </Form>
  );

  {
    /* <p className=" mt-auto flex justify-center items-center text-sm text-gray-light">
        Don`t have an account?
        <Link className="text-primary-500 cursor-pointer " href="/auth/signup">
          Create Account
        </Link>
      </p> */
  }
}

export default SignupForm;

// "use client";

// import Link from "next/link";
// import FormButton from "./FormButton";
// import { set, useForm } from "react-hook-form";
// import { useState, useTransition } from "react";

// import FormError from "./FormError";
// import FormSuccess from "./FormSuccess";
// import { registerUser } from "../_lib/actions";
// import GoogleBtn from "./GoogleBtn";
// import { GoogleLogin } from "@react-oauth/google";

// function SignupForm() {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const {
//     register,
//     handleSubmit,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   function onSubmit(data) {
//     setError("");
//     setSuccess("");
//     startTransition(() => {
//       registerUser(data).then((data) => {
//         setError(data?.error);
//         setSuccess(data?.success);
//       });
//     });
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex-1 flex flex-col gap-y-8"
//     >
//       <div className="text-base font-normal flex flex-col">
//         <div className="mb-2 flex justify-between items-center">
//           <label className="">Email</label>
//           {errors?.email?.message && (
//             <p className="text-red-500 text-sm">{errors.email.message}</p>
//           )}
//         </div>
//         <input
//           type="text"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Invalid email address",
//             },
//           })}
//           className="bg-background rounded-xl p-4 placeholder:text-gray-light w-full focus:outline-none focus:ring-1  focus:ring-primary-500"
//           placeholder="Please enter your email"
//         />
//       </div>
//       <div className="text-base font-normal flex flex-col">
//         <div className="mb-2 flex justify-between items-center">
//           <label className="">password</label>
//           {errors?.password?.message && (
//             <p className="text-red-500 text-sm">{errors.password.message}</p>
//           )}
//         </div>
//         <input
//           type="password"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 8,
//               message: "Password must be at least 8 characters long",
//             },
//             pattern: {
//               value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
//               message:
//                 "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//             },
//           })}
//           className="bg-background rounded-xl p-4 placeholder:text-gray-light w-full focus:outline-none focus:ring-1  focus:ring-primary-500"
//           placeholder="Please enter your password"
//         />
//       </div>
//       <div className="text-base font-normal flex flex-col">
//         <div className="mb-2 flex justify-between items-center">
//           <label className="">Confirm Password</label>
//           {errors?.confirmPassword?.message && (
//             <p className="text-red-500 text-sm">
//               {errors.confirmPassword.message}
//             </p>
//           )}
//         </div>
//         <input
//           type="password"
//           {...register("confirmPassword", {
//             required: "Confirm Password is required",
//             validate: (value) => {
//               const password = getValues("password");
//               return password === value || "Passwords do not match";
//             },
//           })}
//           className="bg-background rounded-xl p-4 placeholder:text-gray-light w-full focus:outline-none focus:ring-1  focus:ring-primary-500"
//           placeholder="Please enter your password"
//         />
//       </div>

//       <FormError message={error} />
//       <FormSuccess message={success} />

//       <FormButton isPending={isPending}>Signup</FormButton>

//       <div className="flex text-[#999999] items-center gap-2">
//         <div className="flex-1 h-px bg-[#999999]"></div>
//         <span className="  text-xs">or continue with</span>
//         <div className="flex-1 h-px bg-[#999999]"></div>
//       </div>
//       <div className="flex gap-6">
//         <GoogleLogin
//           type="standard"
//           theme="filled_black"
//           size="large"
//           text="continue_with"
//           shape="rectangular"
//           logo_alignment="left"
//           onSuccess={async (credentialResponse) => {
//             console.log(credentialResponse);
//             const res = await signIn("credentials", {
//               googleToken: credentialResponse?.credential, // ده idToken
//               redirect: true,
//               callbackUrl: "/",
//             });
//             // console.log(res);
//           }}
//           onError={() => console.log("Google Login Failed")}
//         />
//         {/* <GoogleBtn /> */}
//         <button
//           type="button"
//           className="flex-1 flex items-center justify-center gap-2 py-3 bg-background rounded-xl border-2 border-background cursor-pointer hover:bg-white transition-all"
//         >
//           <img src="/apple.svg" alt="Apple icon" />
//           <span className="text-base">Apple</span>
//         </button>
//       </div>

//       <div className=" self-center flex items-center gap-2">
//         <span className="text-sm">Already have an account?</span>
//         <Link
//           href="/auth/login"
//           className="text-primary-500 underline text-sm hover:no-underline transition-all"
//         >
//           Login
//         </Link>
//       </div>
//     </form>
//   );
// }

// export default SignupForm;
