const HomeSkeleton = () => {
  return (
    <div className="w-full">
      <div className="p-4 grid grid-cols-3 gap-4 w-full h-[300p] grow-0">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full bg-white border border-gray-200 shadow-md rounded-xl p-4 animate-pulse"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
