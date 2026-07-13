import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 self-center ">
      {/* <Image quality={100} height="60" width="60" alt="The Wild Oasis logo" /> */}
      <img src="/unishare.svg" alt="unishare" />
    </Link>
  );
}

export default Logo;
