"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileNav() {
  const pathName = usePathname();
  return (
    <nav>
      <ul className=" mt-6 hidden md:flex items-center gap-1  rounded-2xl p-1 bg-[#f3f4f6] shadow-[0_1px_6px_0_rgba(0,0,0,0.08)]">
        <li
          className={`px-5 py-2 cursor-pointer rounded-3xl text-sm font-semibold text-[#6b7280] hover:bg-white hover:text-primary-500  transition-all duration-200 ${pathName === "/profile/tools" ? "bg-white text-primary-500" : ""}`}
        >
          <Link href="/profile/tools">Tools</Link>
        </li>
        <li
          className={`px-5 py-2 cursor-pointer rounded-3xl text-sm font-semibold text-[#6b7280] hover:bg-white hover:text-primary-500  transition-all duration-200 ${pathName === "/profile/reviews" ? "bg-white text-primary-500 " : ""}`}
        >
          <Link href="/profile/reviews">reviews</Link>
        </li>
      </ul>

      <ul className="flex items-center justify-around md:hidden">
        <li
          className={`p-3 flex-1 text-center text-base font-medium border-b-3  ${pathName === "/profile/tools" ? "text-primary-500 border-primary-500" : "text-gray-light  border-gray-light"}`}
        >
          <Link href="/profile/tools">Tools</Link>
        </li>
        <li
          className={`p-3 flex-1 text-center text-base font-medium border-b-3  ${pathName === "/profile/reviews" ? "text-primary-500 border-primary-500" : "text-gray-light  border-gray-light"}`}
        >
          <Link href="/profile/reviews">Reviews</Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default ProfileNav;
