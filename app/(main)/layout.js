import { Suspense } from "react";
import DesktopNavBar from "../_components/DesktopNavBar";
import Footer from "../_components/Footer";
import Spinner from "../_components/Spinner";

export default function RootLayout({ children }) {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-white" />}>
        {/* FIXME: */}
        <DesktopNavBar />
        {/* <MobileNavBar /> */}
      </Suspense>

      <main className="max-w-7xl  w-full  mx-auto flex-1 lg:max-w-none lg:mx-0 ">
        {children}
      </main>

      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}
