import clsx from "clsx";

const HomeSkeleton = () => {
  return (
    <div className="w-full">
      <div className="p-4 grid grid-cols-3 gap-4 w-full h-[300p] grow-0">
        {[...Array(6)].map((_, index) => (
          <div
            className={clsx(
              "animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            )}
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>

            {/* Date Blocks */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 bg-gray-200 rounded-lg" />
                <div className="h-10 bg-gray-200 rounded-lg" />
              </div>

              <div className="flex gap-2 mt-3">
                <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
                <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
