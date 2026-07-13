import { Suspense } from "react";
import DesktopNavBar from "../_components/DesktopNavBar";

function layout({ children }) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-white" />}>
        <DesktopNavBar />
      </Suspense>

      <main className="max-w-7xl  w-full  mx-auto flex-1 lg:max-w-none lg:mx-0 ">
        {children}
      </main>
    </>
  );
}

export default layout;
