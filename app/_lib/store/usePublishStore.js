import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { logoutAction } from "../actions/actions";

export const usePublishStore = create(
  // persist(
  (set) => ({
    publishData: null,
    shouldReset: false, // 👈 الإشارة (Flag) اللي بتعرف الفورم إنه محتاج يتصفّر

    setPublishData: (data) => set({ publishData: data }),

    // 👈 دالة بنادي عليها عند الـ onSuccess لتشغيل التصفير ومسح الداتا
    triggerFormReset: () => set({ shouldReset: true, publishData: null }),

    // 👈 دالة بيستخدمها الفورم بعد ما يخلص تصفير عشان يرجع الإشارة لوضعها الطبيعي
    completeFormReset: () => set({ shouldReset: false }),
  }),
  // {
  //   name: "publish-storage",
  //   partialize: (state) => ({
  //     publishData: state.publishData,
  //   }),
  // },
  // ),
);

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { logoutAction } from "../actions/actions";

// export const usePublishStore = create(
//   // persist(
//   (set) => ({
//     publishData: null,
//     setPublishData: (data) => set({ publishData: data }),
//   }),
//   // {
//   //   name: "publish-storage",

//   //   partialize: (state) => ({
//   //     publishData: state.publishData,
//   //   }),
//   // },
//   // ),
// );
