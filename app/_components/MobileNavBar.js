"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "../_lib/store/useAuthStore";
import LogoutBtn from "./LogoutBtn";

import {
  LuBookmark,
  LuLayers,
  LuChevronDown,
  LuStar,
  LuWrench,
} from "react-icons/lu";
import { FiSend, FiInbox } from "react-icons/fi";
import { BiPlusCircle } from "react-icons/bi";

function MobileNavBar() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[70] w-8 h-8 cursor-pointer flex justify-center items-center group"
        aria-label="Toggle Menu"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity duration-300"
          onClick={handleLinkClick}
        ></div>
      )}

      <nav
        className={`fixed top-0 left-0 w-[290px] h-full bg-white z-[55] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="pt-24 p-6 h-full flex flex-col justify-between">
          <ul className="flex flex-col gap-2 text-base font-medium text-gray-700">
            {/* Saved Items */}
            <li>
              <Link
                href="profile/saved"
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:text-primary-500 group"
              >
                <LuBookmark
                  size={20}
                  className="text-gray-400 group-hover:text-primary-500 transition-colors"
                />
                <span>Saved Items</span>
              </Link>
            </li>

            {/* Publish Item */}
            <li>
              <Link
                href="/publish"
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:text-primary-500 group"
              >
                <BiPlusCircle
                  size={20}
                  className="text-gray-400 group-hover:text-primary-500 transition-colors"
                />
                <span>Publish Item</span>
              </Link>
            </li>

            {/* Requests Accordion */}
            <li>
              <button
                onClick={() => setIsRequestsOpen(!isRequestsOpen)}
                className={`w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-200 group text-left ${
                  isRequestsOpen
                    ? "bg-gray-50 text-primary-500 font-semibold"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <LuLayers
                    size={20}
                    className={`transition-colors ${isRequestsOpen ? "text-primary-500" : "text-gray-400 group-hover:text-primary-500"}`}
                  />
                  <span>Requests</span>
                </div>
                <LuChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${isRequestsOpen ? "rotate-180 text-primary-500" : ""}`}
                />
              </button>

              {isRequestsOpen && (
                <ul className="mt-1 flex flex-col gap-1 border-l-2 border-gray-100 ml-6 pl-2 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <li>
                    <Link
                      href="/profile/requests/sent"
                      onClick={handleLinkClick}
                      className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-gray-600 hover:bg-primary-50/50 hover:text-primary-500 rounded-lg transition-colors"
                    >
                      <FiSend size={16} className="text-gray-400" />
                      <span>Sent Requests</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile/requests/received"
                      onClick={handleLinkClick}
                      className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-gray-600 hover:bg-primary-50/50 hover:text-primary-500 rounded-lg transition-colors"
                    >
                      <FiInbox size={16} className="text-gray-400" />
                      <span>Received Requests</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/profile/reviews"
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:text-primary-500 group"
              >
                <LuStar
                  size={20}
                  className="text-gray-400 group-hover:text-primary-500 transition-colors"
                />
                <span>Reviews</span>
              </Link>
            </li>

            <li>
              <Link
                href="/profile/tools"
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:text-primary-500 group"
              >
                <LuWrench
                  size={20}
                  className="text-gray-400 group-hover:text-primary-500 transition-colors"
                />
                <span>Tools</span>
              </Link>
            </li>
          </ul>

          {user && (
            <div className="mb-6 border-t border-gray-100 pt-4">
              <LogoutBtn setIsOpen={setIsOpen} />
            </div>
          )}
        </div>
      </nav>

      <div className="h-[70px]"></div>
    </div>
  );
}

export default MobileNavBar;
