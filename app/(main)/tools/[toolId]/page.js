import Spinner from "@/app/_components/Spinner";
import ToolDetails from "@/app/_components/ToolDetails";
import { fetchWithAuth } from "@/app/_lib/actions/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CiBookmark } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";

export async function generateMetadata({ params }) {
  const { toolId } = await params;

  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Tools/${toolId}`,
      {
        next: { revalidate: 120 },
      },
    );

    const toolData = await res.json();

    return {
      title: toolData?.title || "tool details",
      description: toolData?.description || "View tool details",
    };
  } catch (error) {
    return {
      title: "tool details",
    };
  }
}

async function Page({ params }) {
  const { toolId } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <ToolDetails id={toolId} />
    </Suspense>
  );
}

export default Page;
