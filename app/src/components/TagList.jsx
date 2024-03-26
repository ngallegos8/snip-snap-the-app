import React, { useState, useEffect } from "react";
import TagCard from "./TagCard";

function TagList({ tags, deleteTag }) {
// console.log(tags)



const tagList = tags.map(tag => {
  return <TagCard key={tag.id} tag={tag} deleteTag={deleteTag} />  
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