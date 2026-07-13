"use client";

import { useEffect, useRef, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search")?.toString().trim();

    const params = new URLSearchParams(searchParams);
    if (params.has("page")) params.set("page", "1");

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `/tools?${queryString}` : `/tools`;

    router.push(targetUrl);
    setOpen(false);
  };

  return (
    <div className="block md:hidden ">
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 transition-all duration-300 cursor-pointer hover:bg-primary-50 active:scale-95 rounded-full text-2xl text-primary-500"
        aria-label="Open Search"
      >
        <IoSearch />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[95] bg-slate-900/20 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-3 left-4 right-4 z-[100] max-w-xl mx-auto transform transition-all duration-300 ease-out animate-in slide-in-from-top-4 duration-300">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-[0_4px_20px_0_rgba(38,79,250,0.08)]"
            >
              <button
                type="submit"
                className="text-2xl text-primary-500 p-1.5 hover:bg-primary-50 rounded-xl transition-colors shrink-0"
              >
                <IoSearch />
              </button>

              <input
                ref={inputRef}
                type="text"
                name="search"
                defaultValue={searchParams.get("search")?.toString() || ""}
                placeholder="Search for tools, equipment..."
                className="flex-1 outline-none text-base bg-transparent text-slate-800 placeholder:text-slate-400 font-normal py-1"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                aria-label="Close Search"
              >
                <IoClose className="text-2xl" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
