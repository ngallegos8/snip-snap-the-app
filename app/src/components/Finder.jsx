import React, { useState, useEffect } from "react";

import Search from "./Search";
import TagList from "./TagList";
import Settings from "./Settings";

function Finder({ search, setSearch }) {
    

    
    return (
      <div className="finder-component">
        <Search search={search} setSearch={setSearch} />
        <TagList />
        <Settings />
      </div>
    )
  }

export default Finder;