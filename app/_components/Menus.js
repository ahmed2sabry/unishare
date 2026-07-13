"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../_lib/hooks/useOutsideClick";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setIsOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setIsOpenId("");
  const open = setIsOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="flex items-center justify-end relative">{children}</div>
  );
}

function Toggle({ id }) {
  const { close, open, openId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.y + rect.height + window.scrollY + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      className="bg-none border-none p-1 cursor-pointer rounded-md translate-x-2 transition-all duration-200 hover:bg-gray-100"
      data-toggle="true"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="w-6 h-6 text-gray-700" />
    </button>
  );
}

function List({ children, id }) {
  const { openId, position, close } = useContext(MenuContext);

  const ref = useOutsideClick(close, true);

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      className="absolute z-20 shadow-xl rounded-lg bg-white border border-gray-100 min-w-[180px] overflow-hidden py-1"
      style={{
        right: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        className="w-full text-left cursor-pointer bg-none border-none px-4 py-3 text-sm transition-all duration-200 flex items-center gap-4 hover:bg-gray-50 text-gray-700"
        onClick={handleClick}
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
