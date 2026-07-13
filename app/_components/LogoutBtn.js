"use client";

import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { logoutAction } from "../_lib/actions/actions";
import { FiLogOut } from "react-icons/fi";

function LogoutBtn({ setIsOpen, variance }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAction();

      queryClient.clear();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (variance === "profile") {
    return (
      <button
        onClick={handleLogout}
        className=" mt-auto  flex items-center gap-3 px-5 py-3 text-sm text-destructive cursor-pointer font-medium transition-colors hover:bg-red-50 text-left"
      >
        <FiLogOut />
        Logout
      </button>
    );
  }
  if (variance === "menu") {
    return (
      <button
        onClick={() => {
          setIsOpen(false);
          handleLogout();
        }}
        className="w-full cursor-pointer flex items-center gap-3 px-5 py-3 text-sm text-red-500 font-medium transition-colors hover:bg-red-50 text-left"
      >
        <FiLogOut size={18} className="shrink-0" />
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setIsOpen(false); // Close the menu first
        handleLogout();
      }}
      className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
