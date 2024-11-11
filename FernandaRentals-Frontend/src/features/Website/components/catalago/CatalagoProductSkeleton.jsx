import { generateId } from "../../../../shared/utils";

const CatalagoItemSkeleton = () => {
  return (
  
  <section >
    <div className="bg-background rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto flex flex-col w-full mb-2 justify-evenly animate-pulse p-4">
    <div className="w-50 h-40 bg-gray-300 rounded mb-2"></div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="flex justify-start items-center space-x-4 mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 ml-4"></div>
      </div>
    </div>
  </div>
  </section>


  );
};

export const CatalagoProductSkeleton = ({ size = 10 }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[...Array(size)].map(() => (
        <CatalagoItemSkeleton key={generateId()} />
      ))}
    </div>
  );
};

{/* <div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div >1</div>
    <div >2</div>
    <div >3</div>
    <div >4</div>
</div> */}
    