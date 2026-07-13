"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toggleWishlistAction } from "../actions/toggleWishlistAction";

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  const { isPending: isToggling, mutate: toggleWishlist } = useMutation({
    mutationFn: toggleWishlistAction,

    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (oldWishlist) => {
        if (!oldWishlist) return { id: null, items: [] };

        const exists = oldWishlist.items?.some(
          (item) => item.toolId === itemId || item.id === itemId,
        );

        let updatedItems = [];

        if (exists) {
          updatedItems = oldWishlist.items.filter(
            (item) => item.toolId !== itemId && item.id !== itemId,
          );
        } else {
          updatedItems = [
            ...(oldWishlist.items || []),
            { id: itemId, toolId: itemId },
          ];
        }

        return {
          ...oldWishlist,
          ...oldWishlist,
          items: updatedItems,
        };
      });

      return { previousWishlist };
    },

    onError: (error, itemId, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
      toast.error(error.message || "Failed to update wishlist");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return { isToggling, toggleWishlist };
}
