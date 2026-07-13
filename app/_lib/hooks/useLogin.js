// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// // import { loginUserAction, setAuthCookiesAction } from "../actions";
// import { loginUser } from "../data-services";
// import { useAuthStore } from "../store/useAuthStore";
// export function useLogin() {
//   const router = useRouter();
//   const { login, accessToken } = useAuthStore();
//   const queryClient = useQueryClient();
//   const { isPending, mutate: mutateLogin } = useMutation({
//     mutationFn: (data) => loginUser(data),
//     onSuccess: async (data) => {
//       if (data.success) {
//         // FIXME:
//         //   queryClient.setQueryData(["user"], data.user);
//         login(data.user);
//         router.refresh();
//         router.push("/");
//         toast.success("Logged in successfully!");
//       }
//     },
//     onError: (error) => {
//       const errorMessage =
//         error instanceof Error ? error.message : "حدث خطأ غير متوقع";
//       toast.error(errorMessage);
//     },
//   });
//   return { isPending, mutateLogin };
// }

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { loginUserAction } from "../actions/actions";

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();
  const queryClient = useQueryClient();
  const { isPending, mutate: mutateLogin } = useMutation({
    mutationFn: loginUserAction,
    onSuccess: (data) => {
      if (data.success) {
        // queryClient.setQueryData(["user"], data.user);
        login(data.user);
        // toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, mutateLogin };
}
