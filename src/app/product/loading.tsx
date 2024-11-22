export default function Loading() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8 m-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="border-2 rounded-md duration-500 hover:z-50 hover:scale-110"
            key={index}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="px-8 py-4">
                {/* <div className="w-full h-60 object-contain my-2"></div> */}
                <div className="w-full h-48 object-contain my-2 bg-gray-200"></div>
                <div className="bg-gray-200 h-3 w-4/6 mb-1"></div>
                <div className="bg-gray-200 h-3 w-3/6"></div>
              </div>
              <div className="border-t-4 bg-gray-200">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="items-start content-start justify-start">
                      <div className="flex items-center gap-1">
                        <p className="text-slate-500 text-sm line-through"></p>
                        <span className="text-red-500 bg-gray-200 text-xs rounded-sm px-1"></span>
                      </div>
                      <p className="text-red-600 font-bold text-xl"></p>
                    </div>
                    <div className="bg-gray-200-600 text-white hover:bg-gray-200 rounded-md px-2 py-3 flex items-center gap-2 justify-center">
                      <p className="text-sm"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
