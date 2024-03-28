import React, { useState, useEffect } from "react";
import TagCard from "./TagCard";
import NewTagForm from "./NewTagForm";

function TagList({ tags, onTagClick, onSelect, onNewTagFormSubmit, updateTag, selectedTagId, deleteTag }) {
  const [showNewTagForm, setShowNewTagForm] = useState(false);

// console.log(tags)


const tagList = tags.map(tag => {
  return <TagCard key={tag.id}
                  tag={tag} 
                  updateTag={updateTag}
                  deleteTag={deleteTag}
                  onTagClick={onTagClick}
                  onSelect={onSelect}
                  isSelected={selectedTagId === tag.id}
          />  
})
//  console.log(clipboardItemList)

function handleNewTagFormSubmit(tag) {
    onNewTagFormSubmit(tag);
    setShowNewTagForm(false); // Hide form after submission
 }


    
    return (
      <ul className="taglist-component">
        {/* <h3>TagList</h3> */}
        {tagList}
        <button className="new-tag-btn" onClick={() => setShowNewTagForm(!showNewTagForm)}>New Tag</button>
        {showNewTagForm && <NewTagForm onNewTagFormSubmit={handleNewTagFormSubmit} />}
      </ul>
    )
  }

export default TagList;