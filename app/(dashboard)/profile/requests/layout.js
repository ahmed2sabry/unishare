import ReqNav from "@/app/_components/ReqNav";
import Link from "next/link";

import Script from "next/script";

export const metadata = {
  title: "Requests",
};
function layout({ children }) {
  return (
    <div className="flex flex-col gap-6 p-4 bg-[#f1f1f1">
      {/* <Script
        src="https://accept.paymob.com/api/accept/js/blended_checkout.js"
        strategy="beforeInteractive"
      /> */}
      <ReqNav />
      <main>{children}</main>
    </div>
  );
}

export default layout;
