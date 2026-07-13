"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi2";

function SortBy({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort = searchParams.get("sortBy") || options[0].value;
  const currentLabel = options.find((opt) => opt.value === currentSort)?.label;

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(value) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    if (params.has("page")) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  }

  return (
    <div
      className="relative inline-block text-left font-sans"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center justify-between w-56 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all duration-200"
      >
        <span className="truncate">
          Sort by: <span className="text-blue-600">{currentLabel}</span>
        </span>
        <HiChevronDown
          className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute max-w-56  left-0 z-50 w-full mt-2 origin-top-right bg-white border border-gray-100 rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors ${
                  currentSort === option.value
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {option.label}
                {currentSort === option.value && (
                  <HiCheck className="w-4 h-4 stroke-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortBy;
