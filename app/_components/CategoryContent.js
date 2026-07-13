import CategoryToolGrid from "@/app/_components/CategoryToolGrid";
import SortBy from "@/app/_components/SortBy";
import { getCategoryAction } from "@/app/_lib/actions/getCategoryAction";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import Spinner from "./Spinner";

async function CategoryContent({ params, searchParams }) {
  const [param, searchParam] = await Promise.all([params, searchParams]);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["category", { ...param, ...searchParam }],
    queryFn: () => getCategoryAction(searchParam, param.categoryId),
  });
  return (
    <div className="flex flex-col gap-6 mt-4  px-2">
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
          <CategoryToolGrid params={searchParam} id={param.categoryId} />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}

export default CategoryContent;
