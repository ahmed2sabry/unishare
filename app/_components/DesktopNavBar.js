// FIXME:

import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { useAuthStore } from "../_lib/store/useAuthStore";
import SearchBar from "./SearchBar";
import { Suspense } from "react";
import MobileNavBar from "./MobileNavBar";
import Logo from "./Logo";
import { IoIosArrowDown } from "react-icons/io";
import SearchOverlay from "./SearchOverlay";
import { cookies } from "next/headers";
import { UserMenu } from "./UserMenu";

async function DesktopNavBar() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return null;
  return (
    <nav className="bg-white px-3 md:px-6.5 h-26 shadow-[0_1.54px_18.44px_0_rgba(38,79,250,0.06)] sticky top-0 z-50 border-b-2 border-[rgba(38,79,168,0.08)]">
      <ul className="flex items-center justify-between md:gap-6 h-full ">
        <li className="flex gap-2 items-center">
          <MobileNavBar />
          <SearchOverlay />
        </li>
        <Link href="/">
          <img alt="logo" src="/app-logo.svg" className="w-24 md:w-37.5" />
        </Link>
        <SearchBar />

        <UserMenu />
      </ul>
    </nav>
  );
}

export default DesktopNavBar;
