import Link from "next/link";
function BannerHome() {
  return (
    <div className="px-4 py-4 md:pb-20 md:pl-16 flex bg-[url('/home-frame.png')] bg-cover bg-center rounded-3xl text-white items-center justify-between  md:h-[444px] overflow-hidden ">
      <div className="flex flex-col md:self-start gap-6 md:pt-20 md:gap-8 lg:gap-14 ">
        <div className="flex flex-col gap-1.5 md:gap-3">
          <>
            <h1 className="text-lg md:hidden font-semibold">
              Start Semester Prepared
            </h1>
            <h1 className="hidden md:block text-5xl font-semibold">
              Everything You Need for Your Next Project.
            </h1>
          </>
          <>
            <p className="text-sm md:hidden font-normal">
              Find all the tools you need before classes begin.
            </p>
            <p className="hidden md:block text-2xl font-normal">
              Rent academic tools easily and focus on what matters most—your
              studies.
            </p>
          </>
        </div>

        <Link
          href="/tools"
          className="bg-white text-primary-500 text-lg md:text-xl md:font-bold md:rounded-4xl md:px-10 md:py-4 px-4 py-2 self-start rounded-3xl font-medium cursor-pointer hover:bg-gray-200 transition"
        >
          Rent Now &rarr;
        </Link>
      </div>
      <img
        src="/woman.svg"
        alt="Woman"
        className=" md:hidden scale-130 -translate-y-2 -translate-x-4 "
      />
      <img
        src="/woman-big.svg"
        alt="Woman"
        className="hidden md:block  translate-y-8 -translate-x-4 "
      />
    </div>
  );
}

export default BannerHome;
