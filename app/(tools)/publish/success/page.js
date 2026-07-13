export const metadata = {
  title: "succefully published",
};
function page() {
  return (
    <div className="p-4 grid grid-cols-1 gap-y-28 items-center justify-items-center h-screen">
      <div className="flex flex-col gap-8">
        <img src="/sealCheck.svg" alt="seakCheck" className="self-center" />
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-xl font-bold">Tool Published Successfully!</h1>
          <p className="text-gray-light text-sm font-normal ">
            Your tool is now available for students to rent.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 self-stretch justify-self-stretch">
        {/* FIXME: Implement view my tool functionality */}
        <button className="btn-primary">View My Tool</button>
        <button className="text-primary-500 text-base self-center font-normal hover:underline underline-offset-2 transition-all duration-200 cursor-pointer">
          Publish Another Tool
        </button>
      </div>
    </div>
  );
}

export default page;
