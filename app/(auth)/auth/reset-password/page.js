import HeadingAuth from "@/app/_components/HeadingAuth";
import ResetForm from "@/app/_components/ResetForm";
import ForgetForm from "@/app/_components/ResetForm";

const metadata = {
  title: "reset",
};

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-8">
      <HeadingAuth
        heading="Reset Password"
        subHeading="Enter your new password below."
      />

      <div>
        <ResetForm />
      </div>
    </div>
  );
}
