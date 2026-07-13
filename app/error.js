"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
        {/* Minimal Error Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-950 tracking-tight">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed mx-auto">
            An unexpected internal error occurred. Please try again, or you can
            return to the homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:max-w-xs mt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer duration-200 shadow-sm"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full sm:flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-xl text-sm transition-colors border border-gray-200 cursor-pointer duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
