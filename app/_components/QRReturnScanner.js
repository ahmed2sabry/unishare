"use client";

import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { returnToolAction } from "../_lib/actions/returnToolAction";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function QRReturnScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const qrRef = useRef(null);
  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (qrCodeToken) => {
      return await returnToolAction(qrCodeToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lending-requests", "received"],
      });
      toast.success("The tool has been returned successfully");
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to return the tool");
      setScanResult(null);
    },
  });

  const handleCloseModal = async () => {
    if (qrRef.current && qrRef.current.isScanning) {
      try {
        await qrRef.current.stop();
        qrRef.current.clear();
      } catch (err) {
        console.error("Failed to stop camera:", err);
      }
    }
    setScanResult(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen || scanResult) return;

    const timer = setTimeout(() => {
      const html5QrCode = new Html5Qrcode("return-reader");
      qrRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            setScanResult(decodedText);
            mutate(decodedText);
          },
          () => {},
        )
        .catch((err) => console.error("Error starting camera:", err));
    }, 50);

    return () => {
      clearTimeout(timer);
      if (qrRef.current && qrRef.current.isScanning) {
        qrRef.current
          .stop()
          .then(() => qrRef.current.clear())
          .catch(() => {});
      }
    };
  }, [isOpen, scanResult, mutate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-1/2 shrink-0 self-end py-2 cursor-pointer px-4 bg-active rounded-full text-base font-medium text-white hover:bg-active/80 transition-all duration-200 text-center"
      >
        Return Tool
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-xs z-1000 bg-[#ffffff1a] overflow-y-auto py-10">
            <div
              ref={modalRef}
              className="relative mx-auto min-w-75 max-w-[90%] w-max rounded-lg bg-white shadow-lg px-8 py-10 transition-all duration-500"
            >
              <button
                className="bg-none cursor-pointer border-none p-1 rounded-md translate-x-2 transition-all duration-200 absolute top-3 right-5 hover:bg-[#eee]"
                onClick={handleCloseModal}
              >
                <HiXMark className="w-6 h-4 stroke-gray-500" />
              </button>

              <div className="max-w-md mx-auto p-6 bg-white rounded-3xl flex flex-col gap-5 items-center text-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Pickup the tool
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Please scan the QR code to confirm the pickup of the tool.
                  </p>
                </div>

                <div className="w-full max-w-[350px]">
                  <div
                    id="return-reader"
                    className={`w-full overflow-hidden rounded-2xl border border-dashed border-gray-300 shadow-inner ${
                      scanResult ? "hidden" : "block"
                    }`}
                  ></div>

                  {scanResult && (
                    <div className="flex flex-col items-center gap-3 p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200 w-full">
                      <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
                      <p className="text-sm font-medium">
                        {isPending
                          ? "Processing the return..."
                          : "QR code scanned successfully!"}
                      </p>
                    </div>
                  )}
                </div>

                {!scanResult && (
                  <p className="text-xs text-gray-400">
                    Make sure the screen is well-lit and the QR code is clear
                    within the focus box
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
