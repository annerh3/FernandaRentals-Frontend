export const EventItemSkeleton = () => {
    return(
        <div className="event animate-pulse rounded-lg shadow-md p-4 mb-4">
      <div className="mb-4 flex items-center">
        <div className=" bg-gray-50 rounded-full w-96 h-6 mr-1"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className=" bg-gray-100 rounded-full w-4 h-4 mr-1"></div>
        <div className=" bg-gray-100 rounded w-24 h-4"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className=" bg-gray-100 rounded-full w-6 h-6 mr-1"></div>
        <div className=" bg-gray-100 rounded w-20 h-4"></div>
      </div>
      <div className="flex items-center mb-4">
        <div className=" bg-gray-100 rounded-full w-6 h-6 mr-1"></div>
        <div className=" bg-gray-100 rounded w-20 h-4"></div>
      </div>
        <div className="flex justify-between">
        <div className=" bg-gray-100 rounded w-20 h-5"></div>
        <div className=" bg-gray-100 rounded w-20 h-5"></div>
        <div className=" bg-gray-100 rounded w-20 h-5"></div>
        </div>
    </div>
    )
}
