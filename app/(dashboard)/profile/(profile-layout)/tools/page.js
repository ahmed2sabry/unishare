import FilterIcon from "@/app/_components/FilterIcon";
import Menus from "@/app/_components/Menus";
import MyToolsContainer from "@/app/_components/MyToolsContainer";
import Spinner from "@/app/_components/Spinner";
import { getMyToolsAction } from "@/app/_lib/actions/getMyToolsAction";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export const metadata = {
  title: "My tools",
};

async function page({ searchParams }) {
  const params = await searchParams;
  const [res1, res2] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Colleges`),
  ]);
  if (!res1.ok || !res2.ok) {
    throw new Error("failed to fetch college and categories data");
  }
  const [categories, colleges] = await Promise.all([res1.json(), res2.json()]);
  console.log(categories, colleges);
  // const params = await searchParams;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000 },
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ["my-tools", params],
    queryFn: () => getMyToolsAction(params),
  });
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MyToolsContainer
            params={params}
            categories={categories}
            colleges={colleges}
          />
        </HydrationBoundary>
      </Suspense>

      {/* <div className="p-4 grid grid-cols-[82px_1fr_auto] gap-2.5 shadow-item rounded-3xl items-center">
        <img src="/ruler.png" alt="ruler" className="h-[63px] rounded-xl" />
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-normal">T-Ruler with cover</h3>
          <p className="text-base font-semibold">50 EGP/day</p>
          <p className="text-sm font-normal text-gray-light">⭐ 4.5</p>
        </div>
        <button className="w-7 h-7 my-2.5 self-start cursor-pointer text-gray-dark hover:text-primary-500 transition-all">
          <FilterIcon name="More" className="" />
        </button>
      </div> */}
    </div>
  );
}

export default page;
