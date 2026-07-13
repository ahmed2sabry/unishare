import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import Navigation from "./Navigation";
// bg-white  py-4

function Header() {
  return (
    <header className=" fixed top-0 left-0 w-full  shadow-md z-50 bg-white  py-4 ">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
