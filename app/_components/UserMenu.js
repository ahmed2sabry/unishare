"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { LuBox, LuBookmark } from "react-icons/lu";
import SearchOverlay from "./SearchOverlay";
import LogoutBtn from "./LogoutBtn";
import { IoIosArrowDown } from "react-icons/io";
import { useGetProfileInfo } from "../_lib/hooks/useGetProfileInfo";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, profileInfo } = useGetProfileInfo();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMounted]);

  const menuItems = [
    {
      name: "My Profile",
      href: "/profile",
      icon: FiUser,
      color: "text-primary-500 font-semibold",
    },
    {
      name: "My Requests",
      href: "/profile/requests",
      icon: LuBox,
      color: "text-gray-700",
    },
    {
      name: "Saved Items",
      href: "/profile/saved",
      icon: LuBookmark,
      color: "text-gray-700",
    },
    {
      name: "Edit",
      href: "/profile/edit",
      icon: FiSettings,
      color: "text-gray-700",
    },
  ];
  const formatName = (fullName) => {
    if (!fullName) return "";

    const nameParts = fullName.trim().split(" ");

    if (nameParts.length === 1) return nameParts[0];

    return `${nameParts[0]} ${nameParts[1][0]}.`;
  };

  if (!isMounted || isPending)
    return (
      <div className="flex items-center gap-2 border border-[#e5e9fa] rounded-3xl p-2 select-none z-[40] relative bg-white">
        <img
          src="/Unknown_person.jpg"
          className="w-8 h-8 rounded-full opacity-80"
          alt="loading profile"
        />

        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>

        <IoIosArrowDown className="text-[#c1c7d0] text-[9px]" />
      </div>
    );

  return (
    <>
      <div className="relative hidden md:inline-block text-left">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 border border-[#e5e9fa] rounded-3xl p-2 cursor-pointer z-[40] relative "
        >
          <img
            src={profileInfo?.profilePictureUrl || "/Unknown_person.jpg"}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-[#374151] text-base font-medium">
            {formatName(profileInfo?.fullName)}
          </span>
          <IoIosArrowDown className="text-[#9ca3af] text-[9px]" />
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[30] transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_1.54px_18.44px_0_rgba(38,79,250,0.06)] border border-gray-100 overflow-hidden z-[35] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="font-bold text-gray-900 text-base">
                {profileInfo?.fullName}
              </h4>
              <p className="text-sm text-gray-500 font-normal truncate">
                {profileInfo?.facultyName}
              </p>
            </div>

            <ul className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-gray-50 ${item.color}`}
                    >
                      <Icon size={18} className="shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}

              <div className="border-t border-gray-100 my-1"></div>

              <li>
                <LogoutBtn setIsOpen={setIsOpen} variance="menu" />
              </li>
            </ul>
          </div>
        )}
      </div>

      <Link
        href="/profile"
        className="flex md:hidden items-center gap-2 border border-[#e5e9fa] rounded-3xl p-2 cursor-pointer z-[40] relative "
      >
        <img
          src={profileInfo?.profilePictureUrl || "/Unknown_person.jpg"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-[#374151] text-base font-medium">
          {formatName(profileInfo?.fullName)}
        </span>
      </Link>
    </>
  );
}
