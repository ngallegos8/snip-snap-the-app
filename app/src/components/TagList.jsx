import React, { useState, useEffect } from "react";
import TagCard from "./TagCard";

function TagList({ tags, onTagClick, updateTag, deleteTag, onSelect}) {
// console.log(tags)


const tagList = tags.map(tag => {
  return <TagCard key={tag.id} tag={tag} updateTag={updateTag} deleteTag={deleteTag} onTagClick={onTagClick} onSelect={onSelect}/>  
})
//  console.log(clipboardItemList)


    
    return (
      <ul className="taglist-component">
        <h3>TagList</h3>
        {tagList}
      </ul>
    )
  }

export default TagList;