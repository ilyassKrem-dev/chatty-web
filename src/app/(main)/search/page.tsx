import SearchComp from "@/components/search/SearchComp"


export default async function Page() {
    
    return (
        <div className="flex justify-center items-center py-36 flex-col">
            <div className="md:hidden w-full text-center max-w-[500px]"> 
             <SearchComp />
            </div>
            <h2 className="hidden md:block">No profile selected</h2>
        </div>
    )
}