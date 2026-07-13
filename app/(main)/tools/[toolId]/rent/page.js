import RequestToolForm from "@/app/_components/RequestToolForm";
import { Suspense } from "react";
export const metadata = {
  title: "rent",
};
export default async function Page({ params }) {
  const { toolId } = await params;
  return (
    <Suspense fallback={<div>Loading tools...</div>}>
      <RequestToolForm id={toolId} />
    </Suspense>
  );
}
