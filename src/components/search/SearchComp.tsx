
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
export default function SearchComp() {
    
    return (
        <div className="flex flex-col gap-6 md:gap-4">
            <h1 className="text-xl font-bold self-center">Search</h1>
            <SearchBar />
            <SearchResults />
        </div>
    )
}