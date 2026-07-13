import { useRef } from "react";

export function ImageUpload({ images, setImages, handleImageCapture }) {
  const fileInputRef = useRef(null);

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageCapture}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="flex flex-col items-center justify-center w-full p-5 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-primary-300 transition-all duration-200 cursor-pointer group"
      >
        <div className="flex flex-col items-center gap-1.5 text-center">
          <svg
            className="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <circle cx="12" cy="13" r="3" strokeWidth="1.8" />
          </svg>
          <p className="text-sm font-semibold text-gray-700">
            Upload Equipment Images
          </p>
          <p className="text-xs text-gray-400 font-normal">
            Take photos or select from gallery
          </p>
        </div>
      </button>

      {images.length > 0 && (
        // <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mt-1">
        <div className="grid grid-cols-4  gap-3 mt-1">
          {images.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className=" w-18 relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 group/image"
              >
                <img
                  src={imageUrl}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover/image:scale-105"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm shadow-md cursor-pointer opacity-100 md:opacity-0 md:group-hover/image:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
