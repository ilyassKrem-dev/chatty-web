


export default function ItemsLoad() {

    return (
        <>
            {[...Array(4)].map((_,index) => {
            return (
              <div key={index} className={`flex items-center justify-between p-2 rounded-xl
              hover:bg-gray-100
              dark:hover:bg-dark  hover:shadow-lg transition duration-300 ease-in-out  hover:opacity-55  
              group `}>
                <div className="flex items-center space-x-2 w-full">
                  <div className="relative w-12 h-12 rounded-full bg-gray-300" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2 items-center w-full">
                      <div className={`text-base font-semibold text-black dark:text-white cursor-pointer p-2 bg-gray-300 w-full max-w-[100px] rounded-lg`} />
                    </div>
                    <div className=" p-2 bg-gray-300 w-full rounded-lg" />
                  </div>
                </div>
          
          </div>
            )
          })}
        </>
    )
}