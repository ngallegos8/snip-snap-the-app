// import React, { useState, useEffect } from "react";
import React from "react";

import Search from "./Search";
import TagList from "./TagList";
import Settings from "./Settings";

function Finder({ search, setSearch, tags, onTagClick, onSelect, onNewTagFormSubmit, updateTag, selectedTagId, deleteTag, handleLogout }) {
  // console.log(tags)
    


    return (
      <div className="finder-component">
        <h1>Finder</h1>
        <Search search={search} setSearch={setSearch} />
        <TagList tags={tags}  onTagClick={onTagClick} onSelect={onSelect} onNewTagFormSubmit={onNewTagFormSubmit} updateTag={updateTag} selectedTagId={selectedTagId} deleteTag={deleteTag}/>
        <Settings handleLogout={handleLogout}/>
      </div>
    )
  }

export default Finder;