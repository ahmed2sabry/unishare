import Link from "next/link";

import ProfileNav from "@/app/_components/ProfileNav";
import { LuPhone } from "react-icons/lu";
import FilterIcon from "@/app/_components/FilterIcon";
import { FaStar } from "react-icons/fa";
import Test from "@/app/_components/LogoutBtn";
import ProfileInfo from "@/app/_components/ProfileInfo";

function layout({ children }) {
  return (
    <>
      <div className="hidden md:flex flex-col gap-6 ">
        <div className="self-start">
          <ProfileNav />
        </div>
        <main>{children}</main>
      </div>

      <div className="flex flex-col gap-6 p-4 md:hidden ">
        <ProfileInfo />

        <ProfileNav />
        <main>{children}</main>
      </div>
    </>
  );
}

export default layout;
