"use client";

import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/_components/ImageUpload";
import { verifyPickupAction } from "@/app/_lib/actions/verifyPickupAction";

export default function VerifyPickupPage() {
  const [qrCode, setQrCode] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      return await verifyPickupAction(formData);
    },
    onSuccess: () => {
      toast.success("the pickup has been verified successfully!");
      setQrCode("");
      setImages([]);
      router.replace("/profile/requests/sent");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to verify pickup");
    },
  });

  useEffect(() => {
    if (qrCode) return;

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setQrCode(decodedText);
        scanner.clear();
      },
      (error) => {},
    );

    return () => {
      try {
        scanner.clear();
      } catch (e) {}
    };
  }, [qrCode]);

  const handleImageCapture = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmitAllData = () => {
    if (images.length === 0) {
      toast.error(
        "Please capture at least one image of the tool to prove its condition!",
      );
      return;
    }

    const formData = new FormData();

    formData.append("QrCode", qrCode);
    images.forEach((file) => {
      formData.append("Images", file);
    });

    mutate(formData);
  };

  return (
    // <div className="mt-8">
    <div className="mt-4 md:max-w-xl   mx-auto p-6  flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-dark">Verify Pickup</h2>
        <p className="text-sm text-gray-light mt-1">
          Follow the steps to complete the pickup verification process
        </p>
      </div>

      {!qrCode ? (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-approved bg-approved/20 px-3 py-1.5 rounded-full self-start">
            Step 1: Scan the Owner&apos;s QR Code
          </label>
          <p className="text-xs text-gray-500">
            Please scan the open QR Code from the tool&apos;s owner.
          </p>
          {/* scanner */}
          <div
            id="qr-reader"
            className="w-full  overflow-hidden rounded-2xl border border-dashed border-gray-300"
          ></div>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-xl border border-green-200">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <p className="text-sm font-medium">
            ✓ QR Code verified successfully!
          </p>
        </div>
      )}

      {qrCode && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <label className="text-sm font-semibold text-approved bg-approved/20 px-3 py-1.5 rounded-full self-start">
            Step 2: Capture the Tool`s Condition
          </label>

          <ImageUpload
            images={images}
            setImages={setImages}
            handleImageCapture={handleImageCapture}
          />

          <button
            onClick={handleSubmitAllData}
            disabled={isPending}
            className="w-full mt-4 py-3 cursor-pointer bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold text-base shadow-md transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? "Verifying..." : "Confirm and Accept the Tool"}
          </button>
        </div>
      )}
    </div>
    // </div>
  );
}
