
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
export default function SearchComp() {
    
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Search</h1>
            <SearchBar />
            <SearchResults />
        </div>
    )
}