import Link from "next/link";

function page() {
  return (
    <div className="grid place-items-center h-[300px]">
      <h1 className="text-2xl font-bold">
        An error occurred during authentication. Please try again.
      </h1>
      <Link
        href="/auth/login"
        className="text-primary-500 hover:underline mt-4"
      >
        Go back to Login
      </Link>
    </div>
  );
}

export default page;
