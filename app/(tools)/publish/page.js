export const metadata = {
  title: "publish",
};

import PublishForm from "@/app/_components/PublishForm";

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categories`);
  const data = await res.json();
  console.log(data);

  const resColleges = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Colleges`,
  );
  const dataColleges = await resColleges.json();
  console.log(dataColleges);
  return (
    <div className="p-4 ">
      <PublishForm categories={data} colleges={dataColleges} />
    </div>
  );
}

export default page;
