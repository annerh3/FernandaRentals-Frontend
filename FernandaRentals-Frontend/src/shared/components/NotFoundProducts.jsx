import { LuSofa } from "react-icons/lu"

export const NotFoundProducts = ({message}) => {
  return (
                
<section className="bg-white mt-4 rounded-lg ">
    <div className="flex items-center h-96 px-6  mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-white rounded-full bg-siidni-goldLight ">
            <LuSofa className="font-extrabold text-3xl" />
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">{message}</h1>
        </div>
    </div>
</section>

        
  )
}
