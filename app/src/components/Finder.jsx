import React, { useState, useEffect } from "react";

import Search from "./Search";
import TagList from "./TagList";
import Settings from "./Settings";

function Finder({ search, setSearch, tags, deleteTag, handleLogout }) {
  // console.log(tags)
    


    return (
      <div className="finder-component">
        <h1>Finder</h1>
        <Search search={search} setSearch={setSearch} />
        <TagList tags={tags} deleteTag={deleteTag} />
        <Settings handleLogout={handleLogout}/>
      </div>
    )
  }

export default Finder;