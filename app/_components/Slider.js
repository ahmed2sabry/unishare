"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import { SlActionRedo } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import SliderItem from "./SliderItem";
import { useGetCollegeTools } from "../_lib/hooks/useGetCollegeTools";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Slider() {
  const { isPending, tools } = useGetCollegeTools();
  if (isPending) {
    return (
      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, sticky: true }}
        spaceBetween={16}
        slidesPerView={"auto"}
        className="w-full "
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <SliderItemSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    // <Swiper
    //   modules={[FreeMode, Navigation]}
    //   navigation={{
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   }}
    //   freeMode={{
    //     enabled: true,
    //     sticky: true,
    //   }}
    //   spaceBetween={16}
    //   slidesPerView={"auto"}
    //   className="w-full"
    // >
    //   {tools?.items?.map((tool) => (
    //     <SwiperSlide key={tool.id} className="!w-auto md:hidden">
    //       <SliderItem tool={tool} />
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    <div className="relative ">
      <Swiper
        modules={[FreeMode, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        spaceBetween={16}
        slidesPerView="auto"
      >
        {tools?.items?.map((tool) => (
          <SwiperSlide key={tool.id} className="!w-auto">
            <SliderItem tool={tool} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-primary-500 transition-all duration-300">
        <IoIosArrowBack className="text-3xl text-primary-500 group-hover:text-white" />
      </button>

      <button className="swiper-button-next hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-primary-500 transition-all duration-300">
        <IoIosArrowForward className="text-3xl text-primary-500 group-hover:text-white" />
      </button>
    </div>
  );
}

function SliderItemSkeleton() {
  return (
    <div className="bg-white rounded-[20px] p-4 w-[292px]  flex flex-col gap-4 shadow-item relative overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 rounded-xl h-20 aspect-[4/3] w-full" />

      {/* Info Skeleton */}
      <div className="flex flex-col gap-1">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mt-1" />
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/2 mt-1" />
        {/* Rating */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mt-1" />
      </div>

      {/* Button Skeleton */}
      <div className="absolute bottom-0 right-0 bg-gray-200 w-10 h-9 rounded-tl-xl rounded-br-[20px]" />
    </div>
  );
}
