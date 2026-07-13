export const metadata = {
  title: "tools",
};

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import Pagination from "../_components/Pagination";

// import { useGetTools } from "../_lib/hooks/useGetTools";

import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import SortBy from "@/app/_components/SortBy";
import ToolsGrid from "@/app/_components/ToolsGrid";
import { getTools } from "@/app/_lib/actions/actions";

async function Page({ searchParams }) {
  const params = await searchParams;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tools", params],
    queryFn: () => getTools(params),
  });
  return (
    <div className="flex flex-col gap-6 mt-4 px-2">
      <SortBy
        options={[
          { value: "title-asc", label: "Name (A-Z)" },
          { value: "title-desc", label: "Name (Z-A)" },
          { value: "dailyPrice-asc", label: "Price (Low first)" },
          { value: "dailyPrice-desc", label: "Price (High first)" },
          {
            value: "minReputationScore-desc",
            label: "Highest Reputation",
          },
          {
            value: "minReputationScore-asc",
            label: "Lowest Reputation",
          },
          { value: "averageRating-desc", label: "Highest Rating" },
          { value: "averageRating-asc", label: "Lowest Rating" },
        ]}
      />
      <Suspense fallback={<Spinner />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ToolsGrid params={params} />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}

export default Page;
