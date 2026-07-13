"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkoutAction } from "../actions/checkoutAction";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    isPending: isCheckingOut,
    mutate: checkout,
    variables: checkoutRequestId,
  } = useMutation({
    mutationFn: checkoutAction,

    onSuccess: (data) => {
      if (!data?.clientSecret) {
        toast.error("Invalid payment token received from server");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["lending-requests", "sent"] });

      const publicKey = process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY;

      const paymobUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${data.clientSecret}`;

      window.location.href = paymobUrl;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to process payment");
    },
  });

  return { isCheckingOut, checkout, checkoutRequestId };
}
