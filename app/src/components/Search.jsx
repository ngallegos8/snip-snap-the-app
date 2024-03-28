import React from "react";

function Search({ search, setSearch }) {
    console.log(search)

    return (
      <div className="searchbar">
        <div className="custom-search-bar">
            <input
                type="text"
                id="search"
                placeholder="      Search"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
        </div>
  </div>
    );
}

export default Search;