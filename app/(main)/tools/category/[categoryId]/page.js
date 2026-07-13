import CategoryContent from "@/app/_components/CategoryContent";
import Spinner from "@/app/_components/Spinner";
import { fetchWithAuth } from "@/app/_lib/actions/actions";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { categoryId } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Categories/${categoryId}`,
      {
        next: { revalidate: 120 },
      },
    );

    const categoryData = await res.json();

    return {
      title: categoryData?.name || "category details",
    };
  } catch (error) {
    return {
      title: "category details",
    };
  }
}

function Page({ params, searchParams }) {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
