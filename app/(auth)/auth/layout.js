import Logo from "@/app/_components/Logo";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className=" lg:flex  lg:items-center lg:h-screen lg:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/auth-hero.png')] lg:bg-cover lg:bg-center lg:p-20 lg:gap-[176px]">
      {/* text content */}
      <div className="hidden lg:flex flex-col gap-12 flex-1 ">
        <img
          src="/unishare-auth.svg"
          alt="auth hero"
          className="w-[294px] h-[98px]"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-white ">
            Everything You Need for University, All in{" "}
            <span className="text-primary-500">One Place.</span>
          </h1>
          <p className="text-xl font-normal text-white/80">
            Find, rent, and share academic tools with verified students through
            a secure and affordable platform.
          </p>
        </div>
      </div>
      {/* form content */}
      <div className="flex-1 flex lg:w-1/2 px-4 py-6 flex-col gap-8 h-screen lg:h-auto bg-white lg:px-12 lg:py-12 lg:rounded-3xl lg:shadow-[0px_1.2px_4.78px_rgba(0,0,0,0.04),0px_4.78px_47.83px_rgba(38,79,168,0.08)] ">
        <Logo />
        {children}
      </div>
      <Link
        href="/"
        className="absolute top-6 left-6 text-xl flex items-center  hover:text-primary-500 transition-all gap-2 text-white"
      >
        <FaArrowLeftLong /> back
      </Link>
    </div>
  );
}
