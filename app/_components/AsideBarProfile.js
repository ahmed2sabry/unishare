"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { LuBox, LuBookmark } from "react-icons/lu";
import LogoutBtn from "./LogoutBtn";
import ProfileAcc from "./ProfileAcc";
import {
  FaAngleLeft,
  FaArrowLeftLong,
  FaArrowRightLong,
} from "react-icons/fa6";

// import dynamic from "next/dynamic";
// const ProfileAcc = dynamic(() => import("./ProfileAcc"), {
//   ssr: false,
//   loading: () => <ProfileAccSkeletonPlaceholder />,
// });

function AsideBarProfile() {
  const pathName = usePathname();
  // FIXME: repair the links
  const navLinks = [
    {
      name: "My Profile",
      href: "/profile/tools",
      icon: FiUser,
      subRoutes: ["/profile/tools", "/profile/reviews"],
    },
    {
      name: "My Requests",
      href: "/profile/requests",
      icon: LuBox,
      subRoutes: ["/profile/requests/sent", "/profile/requests/received"],
    },
    {
      name: "Saved Items",
      href: "/profile/saved",
      icon: LuBookmark,
    },
    {
      name: "Edit",
      href: "/profile/edit",
      icon: FiSettings,
    },
  ];

  return (
    <div className=" relative hidden md:flex h-full flex-col pb-12  gap-8 border-r border-black/7 shadow-[0_0_10px_0_black/16] ">
      {/* profile */}
      <Link
        href="/"
        className="absolute p-2 text-xl flex items-center  hover:text-primary-600 transition-all gap-2 text-primary-500"
      >
        <FaAngleLeft /> Home
      </Link>

      <ProfileAcc />

      {/* nav links */}
      <nav className="px-3 py-4">
        <ul className=" flex flex-col gap-4">
          {/* <li>
            <Link
              href="/profile/tools"
              className={`group px-3 py-3.5 flex items-center gap-3 text-[#374151] text-sm font-normal hover:bg-[#e9edf6] hover:text-primary-500 rounded-3xl transition-all duration-300 ${pathName === "/profile/tools" ? "bg-[#e9edf6] text-primary-500" : ""}`}
            >
              <FiUser className="text-[#6B7280] text-base group-hover:text-primary-500 " />
              My profile
            </Link>
          </li> */}
          {navLinks.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.subRoutes
              ? item.subRoutes.includes(pathName)
              : pathName === item.href;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`group px-3 py-3.5 flex items-center gap-3 text-[#374151] text-sm font-normal hover:bg-[#e9edf6] hover:text-primary-500 rounded-3xl transition-all duration-300 ${isActive ? "bg-[#e9edf6] text-primary-500" : ""}`}
                >
                  <Icon
                    className={`text-[#6B7280] text-base group-hover:text-primary-500 ${isActive ? "text-primary-500" : ""}`}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* logout button */}
      <LogoutBtn variance="profile" />
    </div>
  );
}

export default AsideBarProfile;

// export function ProfileAccSkeletonPlaceholder() {
//   return (
//     <div className="pt-9.5 pb-6 flex flex-col items-center border-b border-[#F3F4F6] text-xs xl:text-sm animate-pulse w-full">
//       {/* Profile Image Skeleton */}
//       <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-[#e9edf6]" />

//       {/* Name Skeleton */}
//       <div className="h-6 bg-gray-300 rounded w-40 mt-4 mb-2" />

//       {/* Faculty Skeleton */}
//       <div className="h-4 bg-gray-200 rounded w-48 mb-3" />

//       {/* Phone Skeleton */}
//       <div className="flex items-center gap-2">
//         <div className="w-4 h-4 bg-gray-200 rounded-full" />
//         <div className="h-3 bg-gray-200 rounded w-28" />
//       </div>

//       {/* Tools & Stats Block Skeleton */}
//       <div className="self-stretch mx-1 xl:mx-5 mt-7 border border-[#f0f0f0] rounded-2xl xl:px-4 py-4 flex justify-between items-center">
//         {/* Tools Listed */}
//         <div className="flex flex-col justify-center items-center gap-2 flex-1">
//           <div className="h-5 bg-gray-300 rounded w-6" />
//           <div className="h-3 bg-gray-200 rounded w-16" />
//         </div>

//         {/* Divider */}
//         <span className="bg-[#f0f0f0] w-px h-8"></span>

//         {/* Completed Rentals */}
//         <div className="flex flex-col justify-center items-center gap-2 flex-1">
//           <div className="h-5 bg-gray-300 rounded w-6" />
//           <div className="h-3 bg-gray-200 rounded w-24" />
//         </div>

//         {/* Divider */}
//         <span className="bg-[#f0f0f0] w-px h-8"></span>

//         {/* Rating */}
//         <div className="flex flex-col justify-center items-center gap-2 flex-1">
//           <div className="h-5 bg-gray-300 rounded w-10" />
//           <div className="h-3 bg-gray-200 rounded w-12" />
//         </div>
//       </div>
//     </div>
//   );
// }
