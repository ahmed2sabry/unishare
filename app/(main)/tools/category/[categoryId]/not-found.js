import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-red-700 mb-2">Not Found</h1>
      <p className="text-slate-500 text-xl">
        The category that you are looking for does not exist.
      </p>
      <Link
        className="hover:text-primary-500 transition-all flex items-center gap-2"
        href="/"
      >
        <FaArrowLeftLong /> Return to home
      </Link>
    </div>
  );
}
