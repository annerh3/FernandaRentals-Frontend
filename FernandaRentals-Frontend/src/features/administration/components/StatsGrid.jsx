export const StatsGrid = ({stats, darkMode}) => {
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => <div key={index} className={`${darkMode ? "bg-siidni-darkCard" : "bg-white"} p-6 rounded-xl shadow-md transition-transform hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.count}</p>
                </div>
                <div className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>)}
        </div>);
  }


  export const StatsGridSkeleton = ({darkMode}) => {
    return(
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {
          
          Array(3).fill(0).map((_, index) => 
          
          <div key={index} className={`${darkMode ? "bg-siidni-darkCard" : "bg-white"} p-6 shadow-md transition-transform hover:scale-105 animate-pulse h-25`}>
              <div className="flex items-center justify-between mt-1">
                <div className="space-y-2">
                  <p className={`${darkMode ? "bg-gray-100" : "bg-gray-600"} w-20 h-2 rounded-sm`}></p>
                  <p className={`${darkMode ? "bg-gray-100" : "bg-gray-600"} w-7 h-4 rounded-sm`}></p>
                </div>
                <div className={`${darkMode ? "bg-gray-300" : "bg-gray-600"} rounded-full w-10 h-10`}></div>
              </div>
            </div>          
          )          
            }
        </div>
    );
  }