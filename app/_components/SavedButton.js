"use client";

import { useGetWishlist } from "../_lib/hooks/useGetWishlist";
import { useToggleWishlist } from "../_lib/hooks/useToggleWishlist";

function SavedButton({ id, variant }) {
  const { wishlist } = useGetWishlist();
  const { toggleWishlist } = useToggleWishlist();

  const isSaved = wishlist?.items?.some(
    (item) => item.toolId === id || item.id === id,
  );

  if (variant === "save") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(id);
        }}
        className="absolute bottom-0 right-0 bg-primary-500 hover:bg-primary-600 transition-all cursor-pointer  px-3.5 py-2.25  rounded-tl-xl rounded-br-[20px]  text-white  "
      >
        <svg
          width="13"
          height="19"
          viewBox="0 0 13 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 3.7C0.5 2.58 0.5 2.02 0.718 1.592C0.909744 1.21569 1.21569 0.909744 1.592 0.718C2.02 0.5 2.58 0.5 3.7 0.5H9.3C10.42 0.5 10.98 0.5 11.408 0.718C11.7843 0.909744 12.0903 1.21569 12.282 1.592C12.5 2.02 12.5 2.58 12.5 3.7V17.005C12.5 17.491 12.5 17.734 12.399 17.867C12.3554 17.9248 12.2997 17.9725 12.2358 18.0067C12.1719 18.0409 12.1013 18.0608 12.029 18.065C11.862 18.075 11.66 17.94 11.256 17.671L6.5 14.5L1.744 17.67C1.34 17.94 1.138 18.075 0.97 18.065C0.897836 18.0606 0.827477 18.0407 0.763772 18.0065C0.700068 17.9723 0.644535 17.9247 0.601 17.867C0.5 17.734 0.5 17.491 0.5 17.005V3.7Z"
            fill={isSaved ? "white" : "none"}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(id);
        }}
        className="absolute bottom-0 right-0 bg-primary-500 hover:bg-primary-600 transition-all cursor-pointer  px-3.5 py-2.25 md:px-5.5 md:py-3.5 lg:px-8 lg:py-5 rounded-tl-xl rounded-br-[20px] md:rounded-tl-3xl md:rounded-br-[38px]  text-white lg:rounded-tl-[30px] lg:rounded-br-[50px] "
      >
        <svg
          className="w-3.5 h-4.75 md:w-5.5 md:h-8 lg:w-9 lg:h-12"
          viewBox="0 0 13 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 3.7C0.5 2.58 0.5 2.02 0.718 1.592C0.909744 1.21569 1.21569 0.909744 1.592 0.718C2.02 0.5 2.58 0.5 3.7 0.5H9.3C10.42 0.5 10.98 0.5 11.408 0.718C11.7843 0.909744 12.0903 1.21569 12.282 1.592C12.5 2.02 12.5 2.58 12.5 3.7V17.005C12.5 17.491 12.5 17.734 12.399 17.867C12.3554 17.9248 12.2997 17.9725 12.2358 18.0067C12.1719 18.0409 12.1013 18.0608 12.029 18.065C11.862 18.075 11.66 17.94 11.256 17.671L6.5 14.5L1.744 17.67C1.34 17.94 1.138 18.075 0.97 18.065C0.897836 18.0606 0.827477 18.0407 0.763772 18.0065C0.700068 17.9723 0.644535 17.9247 0.601 17.867C0.5 17.734 0.5 17.491 0.5 17.005V3.7Z"
            fill={isSaved ? "white" : "none"}
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist(id);
      }}
      className="w-12 h-12 rounded-full bg-[#e1e1e1] flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-all"
    >
      <svg
        width="14"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 3.95C0.75 2.83 0.75 2.27 0.968 1.842C1.15974 1.46569 1.46569 1.15974 1.842 0.968C2.27 0.75 2.83 0.75 3.95 0.75H9.55C10.67 0.75 11.23 0.75 11.658 0.968C12.0343 1.15974 12.3403 1.46569 12.532 1.842C12.75 2.27 12.75 2.83 12.75 3.95V17.255C12.75 17.741 12.75 17.984 12.649 18.117C12.6054 18.1748 12.5497 18.2225 12.4858 18.2567C12.4219 18.2909 12.3513 18.3108 12.279 18.315C12.112 18.325 11.91 18.19 11.506 17.921L6.75 14.75L1.994 17.92C1.59 18.19 1.388 18.325 1.22 18.315C1.14784 18.3106 1.07748 18.2907 1.01377 18.2565C0.950068 18.2223 0.894535 18.1747 0.851 18.117C0.75 17.984 0.75 17.741 0.75 17.255V3.95Z"
          fill={isSaved ? "#264FA8" : "#e1e1e1"}
          stroke="#264FA8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default SavedButton;
