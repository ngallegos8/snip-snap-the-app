import React, { useState, useEffect } from "react";
import ColorSelector from "./ColorSelector";

// import updateIcon from '../images/update-icon.png';
// import uneditIcon from '../images/unedit-icon.png';
// import deleteIcon from '../images/delete.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons'; // For solid style
import { faEdit } from '@fortawesome/free-regular-svg-icons'; // For regular style



function TagCard({ tag, onTagClick, updateTag, deleteTag, onSelect, isSelected }) {
  const [tagName, setTagName] = useState(tag.name)
  const [tagColor, setTagColor] = useState(tag.color)
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
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
  onTagClick(tag.id);
  // setShowUpdateForm(!showUpdateForm);
  setShowUpdateButton(!showUpdateButton)
}



  // Check if the tag object and its name property exist before rendering
 if (!tag || !tag.name) {
    return <div>No tag name available</div>;
 }

    
    return (
      <div className={`tagcard-component ${isSelected ? 'selected' : ''}`}>
          <button className="tag-name-btn" style={{ color: tag.color }} onClick={() => handleTagClick()}>
            <div className="tag-name-btn-id">{tag.id}</div>
            <div className="tag-name-btn-name">{tag.name}</div>
          </button>
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
          {showUpdateButton ? 
            <button className="show-update-form-button" onClick={() => setShowUpdateForm(!showUpdateForm)}>
              {showUpdateForm ? <FontAwesomeIcon icon={faBackward} /> : <FontAwesomeIcon icon={faEdit} />}
            </button>
          : ""
          }
          {showUpdateForm && ( // Conditionally render the update form based on showUpdateForm state
            <div>
              <form onSubmit={handleEditTag}>
                <label className="tag-label-name">New Tag Name</label>
                <input type="text" name="name" value={tagName} onChange={(e) => setTagName(e.target.value)}/>
                <label className="tag-label-color">New Tag Color</label>
                <ColorSelector onColorSelect={handleColorSelect} />
                <button type="submit">Save Changes</button>
                <button onClick={handleDelete} className="delete-tag"><FontAwesomeIcon icon={faTrash} /></button>
              </form>
            </div>
          )}
      </div>
    
    )
  }

export default TagCard;