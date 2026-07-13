import { Suspense } from "react";

import DesktopNavBar from "@/app/_components/DesktopNavBar";
import AsideBarProfile from "@/app/_components/AsideBarProfile";
("react-icons/fa6");

export const metadata = {
  title: {
    template: "%s | Profile",
    default: "My Profile",
  },
};

function layout({ children }) {
  return (
    <>
      <div className="md:hidden">
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <DesktopNavBar />
        </Suspense>
      </div>

      <main className="max-w-7xl  w-full  mx-auto flex-1 lg:max-w-none lg:mx-0 ">
        <div className="grid md:grid-cols-[25fr_75fr] md:gap-7">
          {/* aside */}
          <AsideBarProfile />
          {/* FIXME:there no style here */}
          <main className="h-screen overflow-y-auto custom-scrollbar p-3">
            {children}
          </main>
        </div>
      </main>
    </>
  );
}

export default layout;
