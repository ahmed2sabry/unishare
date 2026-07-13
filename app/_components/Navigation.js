"use client";

import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Navigation() {
  const pathName = usePathname();

  const isAuthPage =
    pathName === "/auth/login" ||
    pathName === "/auth/signup" ||
    pathName === "/auth/forgot-password";

  const { data: session, status } = useSession();

  if (status === "loading") return null; // Skeleton

  console.log(session);
  return (
    <nav>
      <ul className="flex  items-center text-black ">
        <div className=" flex gap-[48px] text-lg font-normal items-center ">
          <li>
            <Link
              href="/"
              className={`hover:text-primary-500 transition-colors ${pathName === "/" ? "text-primary-500" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              className={`hover:text-primary-500 transition-colors ${pathName === "/brands" ? "text-primary-500" : ""}`}
            >
              Brands
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`hover:text-primary-500 transition-colors ${pathName === "/about" ? "text-primary-500" : ""}`}
            >
              About us
            </Link>
          </li>

          <form>
            <input
              type="text"
              placeholder="Search products, brands and more"
              className="px-4 py-2  placeholder:text-base placeholder:font-normal bg-background rounded-xl focus:outline-none focus:ring-1 w-[456px] focus:ring-primary-500"
            />
          </form>
          <div className="flex items-center divide-x-2 divide-gray-400 ">
            {session ? (
              <li className="pr-[31px]">
                <Link
                  href="/dashboard"
                  className={`hover:text-primary-500 transition-colors ${pathName === "/dashboard" ? "text-primary-500" : ""}`}
                >
                  <span className="text-2xl font-light flex items-center gap-2">
                    <AiOutlineUser />
                    <span className="text-lg">Dashboard</span>
                  </span>
                </Link>
              </li>
            ) : (
              <li className="pr-[31px]">
                <Link
                  href="/auth/login"
                  className={`hover:text-primary-500 transition-colors ${isAuthPage ? "text-primary-500" : ""}`}
                >
                  <span className="text-2xl font-light flex items-center gap-2">
                    <AiOutlineUser />
                    <span className="text-lg">Login</span>
                  </span>
                </Link>
              </li>
            )}
            <div className="flex items-center gap-6 pl-[31px] ">
              <li>
                <Link
                  href="/wishlist"
                  className={`hover:text-primary-500 transition-colors ${pathName === "/wishlist" ? "text-primary-500" : ""}`}
                >
                  <span className="text-2xl font-light flex items-center gap-2">
                    <CiHeart />
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className={`hover:text-primary-500 transition-colors ${pathName === "/cart" ? "text-primary-500" : ""}`}
                >
                  <div className="text-2xl font-light flex items-center gap-2 relative">
                    <BsCart2 />
                  </div>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
