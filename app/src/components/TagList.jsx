import React, { useState, useEffect } from "react";
import TagCard from "./TagCard";

function TagList({ tags, deleteTag, onTagClick }) {
// console.log(tags)


const tagList = tags.map(tag => {
  return <TagCard key={tag.id} tag={tag} deleteTag={deleteTag} onTagClick={onTagClick} />  
})
//  console.log(clipboardItemList)


    
    return (
      <div className="taglist-component">
        <h3>TagList</h3>
        {tagList}
      </div>
    )
  }

export default TagList;