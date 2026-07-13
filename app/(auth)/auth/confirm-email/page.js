import ConfirmForm from "@/app/_components/ConfirmForm";
import FormButton from "@/app/_components/FormButton";
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";

const metadata = {
  title: "login",
};

export default function Page() {
  return (
    <div className="flex  items-center gap-[90px] justify-between">
      <div className="flex-1 flex flex-col gap-y-16 self-start py-26">
        <div className="text-center">
          <h2 className="text-xl font-semibold self-center ">Auth🔏</h2>
          <p className="text-gray-light text-base mt-2 ">
            Confirming your Email
          </p>
        </div>
        <ConfirmForm />
      </div>
      {/* <img src="/confirm.svg" alt="confirm image" /> */}
    </div>
  );
}
