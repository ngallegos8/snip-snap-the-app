import React from "react";

function Search({ search, setSearch }) {
    console.log(search)

  return (
    <div className="searchbar">
      <label htmlFor="search">Search:</label>
        <input
        type="text"
        id="search"
        placeholder="Type to search clipboard..."
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;