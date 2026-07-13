import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
        {/* Minimal 404 Magnifying Glass Icon */}
        <div className="w-16 h-16 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-950 tracking-tight">
            Page not found
          </h2>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed mx-auto">
            The page you are looking for doesn&apos;t exist or has been moved to
            another URL.
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full sm:max-w-xs mt-2">
          <Link
            href="/"
            className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-4 rounded-xl text-sm text-center transition-colors duration-200 shadow-sm"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
