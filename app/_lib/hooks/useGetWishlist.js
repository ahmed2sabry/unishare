"use client";

import { useQuery } from "@tanstack/react-query";
import { getWishlistAction } from "../actions/getWishlistAction";

export function useGetWishlist() {
  const { isPending, data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlistAction(),
  });

  return { isPending, wishlist };
}
