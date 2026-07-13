function HeadingAuth({ heading, subHeading }) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl text-gray-dark font-semibold">{heading}</h1>
      <p className="text-sm  text-gray-light font-normal">{subHeading}</p>
    </div>
  );
}

export default HeadingAuth;
