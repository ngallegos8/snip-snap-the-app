import React, { useState, useEffect } from "react";
import ColorSelector from "./ColorSelector";

import updateIcon from '../images/update-icon.png';
import uneditIcon from '../images/unedit-icon.png';
import deleteIcon from '../images/delete.png';



function TagCard({ tag, onTagClick, updateTag, deleteTag, onSelect, isSelected }) {
  const [tagName, setTagName] = useState(tag.name)
  const [tagColor, setTagColor] = useState(tag.color)
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  // const [onTagClick, setOnTagClick] = useState([])

  console.log(tag)

  function handleColorSelect(color) {
    setTagColor(color);
 }

  function handleEditTag(e) {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/tags/${tag.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: tagName,
            color: tagColor
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update tag');
        }
        return response.json();
      })
      .then(updatedTagData => {
        setTagName(updatedTagData.name);
        setTagColor(updatedTagData.color);

        updateTag(updatedTagData);
      })
      .then(() => setShowUpdateForm(false))
      .catch(error => console.error('Error updating tag:', error));

};

  function handleDelete() {
    fetch(`http://127.0.0.1:5000/tags/${tag.id}`, {
      method: "DELETE"
    })
    .then(() => deleteTag(tag.id))
    .catch(error => console.error("Error deleting tag:", error));
 }

 function handleTagClick() {
  onTagClick(tag.id); // This will now also trigger the onSelect function if it's passed
}



  // Check if the tag object and its name property exist before rendering
 if (!tag || !tag.name) {
    return <div>No tag name available</div>;
 }

    
    return (
      <li className={`tagcard-component ${isSelected ? 'selected' : ''}`}>
          <button className="tag-name-btn" style={{ color: tag.color }} onClick={() => handleTagClick()}>{tag.id} {tag.name}</button>
          <div
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: tag.color || "transparent", // Use transparent if no color is set
              borderRadius: "50%",
              marginLeft: "5px",
            }}
          />
          <button className="show-update-form-button" onClick={() => setShowUpdateForm(!showUpdateForm)}>
            {showUpdateForm ? <img src={uneditIcon} alt="Unedit Tag" className="unedit-img"/> : <img src={updateIcon} alt="Update Tag" className="edit-img"/>}
          </button>
          <button onClick={handleDelete} className="remove-event"><img src={deleteIcon} alt="Delete Tag" className="delete-img"/></button>
          {showUpdateForm && (
            <div>
              <form onSubmit={handleEditTag}>
                <label>Update Tag Name:</label>
                <input type="text" name="name" value={tagName} onChange={(e) => setTagName(e.target.value)}/>
                {/* <label>Update Tag Color:</label>
                <input type="text" name="color" value={tagColor} onChange={(e) => setTagColor(e.target.value)}/> */}
                <ColorSelector onColorSelect={handleColorSelect} />
                <button type="submit">Save Changes</button>
              </form>
            </div>
          )}
      </li>
    
    )
  }

export default TagCard;