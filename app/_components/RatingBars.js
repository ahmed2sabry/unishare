import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingBars = ({ data, average }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const getPercent = (count) =>
    total ? ((count / total) * 100).toFixed(1) : 0;

  const avgNum = parseFloat(average) || 0;

  return (
    <div className="flex gap-8 items-center justify-between">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-base font-medium">{total ? average : "0"}</span>

        <div className="flex gap-[3px]">
          {[1, 2, 3, 4, 5].map((star) => {
            if (star <= avgNum) {
              return <FaStar key={star} className="text-[#f9cc4f]" />;
            }

            if (star - 0.5 <= avgNum) {
              return <FaStarHalfAlt key={star} className="text-[#f9cc4f]" />;
            }

            return <FaRegStar key={star} className="text-gray-lighter" />;
          })}
        </div>

        <span className="text-sm font-normal text-gray-light">
          {total} Reviews
        </span>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = data[star] || 0;
          const percent = getPercent(count);
          return (
            <div key={star} className="flex items-center gap-1 group">
              <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-700 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-xs font-normal">{star}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingBars;
