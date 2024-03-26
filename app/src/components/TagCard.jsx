import React, { useState, useEffect } from "react";


function TagCard({ tag, deleteTag, onTagClick }) {

  console.log(tag)

  function handleDelete() {
    fetch(`http://127.0.0.1:5000/tags/${tag.id}`, {
      method: "DELETE"
    })
    .then(() => deleteTag(tag.id))
    .catch(error => console.error("Error deleting tag:", error));
 }

 function handleTagClick() {
    onTagClick(tag.id);
 }

  // Check if the tag object and its name property exist before rendering
 if (!tag || !tag.name) {
    return <div>No tag name available</div>;
 }

    
    return (
        <div className="tagcard-component">
      <button onClick={handleTagClick}>{tag.name}</button>
      {tag.id}
    </div>
    )
  }

export default TagCard;