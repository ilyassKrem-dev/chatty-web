
import NavHome from "@/components/Home/NavHome";
export default function Page() {
  return (
    <>
      <NavHome />
      <div className=" flex justify-center items-center relative">
        <div className="absolute w-full h-[900px] md:h-[1500px] bg-blue-400 md:max-h-[1500px] md:max-w-[1000px] rounded-br-full -z-10 sm:left-0 sm:rounded-none md:rounded-br-full md:-left-[25rem] left-0 dark:bg-accent sm:h-[700px]" />
      </div>  
      <div className="py-36">
          <div className="flex justify-center items-center flex-col gap-8 text-white  md:items-start md:ml-10 text-center md:text-start">
            <h1 className="font-bold text-4xl border-l-2 border-t-2 border-accent dark:border-l-0 dark:border-t-0 dark:border-r-2 dark:border-b-2 dark:border-blue-500  p-2 ">Chatty</h1>
            <div className="text-center text-sm">
              <p className="">
                Chat with your friends
              </p>
              <p className="text-accent font-bold text-xl dark:text-blue-500 ">
                And
              </p>
              <p className="w-[200px] sm:w-full">
                Other people around the world
              </p>
            </div>
            
          </div>  
        </div>  
    </>
  );
}
