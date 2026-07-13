"use client";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../_lib/hooks/useOutsideClick";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;

const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openModalWindow }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openModalWindow) });
}

// function Window({ children, name }) {
//   const { close, openName } = useContext(ModalContext);

//   const ref = useOutsideClick(close);

//   if (name !== openName) return null;

//   return createPortal(
//     <div className=" fixed top-0 left-0 w-full h-screen backdrop-blur-xs z-[1000] transition-all duration-500 bg-[#ffffff1a]">
//       <div
//         className=" fixed top-1/2 left-1/2  min-w-[300px]  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg px-8 py-10 transition-all duration-500 "
//         ref={ref}
//       >
//         <button
//           className="bg-none border-none p-1 rounded-md translate-x-2 transition-all duration-200 absolute top-3 right-5 hover:bg-[#eee] "
//           onClick={close}
//         >
//           <HiXMark className="w-6 h-4  stroke-gray-500" />
//         </button>
//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-xs z-1000 bg-[#ffffff1a] overflow-y-auto py-10">
      <div
        className="relative mx-auto min-w-75 max-w-[90%] w-max rounded-lg bg-white shadow-lg px-8 py-10 transition-all duration-500"
        ref={ref}
      >
        <button
          className="bg-none cursor-pointer border-none p-1 rounded-md translate-x-2 transition-all duration-200 absolute top-3 right-5 hover:bg-[#eee]"
          onClick={close}
        >
          <HiXMark className="w-6 h-4 stroke-gray-500" />
        </button>

        <div className="max-h-full">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
