import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handledSearch = (e) => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handledSearch}
        className="bg-blue-500 text-white p-2 rounded flex items-center"
      >
        <Search className="mr-2" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;