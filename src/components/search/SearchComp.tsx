
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import { Suspense } from "react"
export default function SearchComp() {
    
    return (
        <div className="flex flex-col gap-6 md:gap-4 h-full">
            <h1 className="text-2xl font-bold self-center md:self-start">Search</h1>
            <Suspense>
                <SearchBar />
                <div className=" overflow-y-scroll flex-1 custom-scrollbar">
                    <SearchResults />
                </div>
            </Suspense>
        </div>
    )
}