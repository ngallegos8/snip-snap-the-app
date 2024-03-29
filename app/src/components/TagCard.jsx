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
  const [errorMessage, setErrorMessage] = useState('');
  // const [onTagClick, setOnTagClick] = useState([])

  console.log(tag)

  function handleColorSelect(color) {
    setTagColor(color);
 }

  function handleEditTag(e) {
    e.preventDefault();

    if (tagName === "") {
      setErrorMessage('Tag name cannot be empty.');
      return;
   }

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

// const displayNameOrColor = tag.color ? tag.color : tag.name;

const tagNameStyle = {
  color: tag.color || 'inherit', // Use the tag's color if available, otherwise inherit the parent's color
};



//  if (!tag || !tag.name) {
//     return <div>No tag name available</div>;
//  }

    
    return (
      <div className={`tagcard-component ${isSelected ? 'selected' : ''}`}>
          <button className="tag-name-btn" style={tagNameStyle} onClick={() => handleTagClick()}>
            <div className="tag-name-btn-id">{tag.id}</div>
            <div className="tag-name-btn-name">{tag.name}</div>
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                // display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: tag.color || "transparent", // Use transparent if no color is set
                borderRadius: "50%",
                marginLeft: "5px",
              }}
            />
          </div>
          {isSelected && (
            <button className="show-update-form-button" onClick={() => setShowUpdateForm(!showUpdateForm)}>
              {showUpdateForm ? <FontAwesomeIcon icon={faBackward} className="fa-icon" /> : <FontAwesomeIcon icon={faEdit} className="fa-icon" />}
            </button>
          )}
          {showUpdateForm && ( // Conditionally render the update form based on showUpdateForm state
            <div className="update-tag-form-div">
              <form className="update-tag-form"onSubmit={handleEditTag}>
                <label className="tag-label-name">New Tag Name</label><br></br>
                <input type="text" name="name" placeholder="New Tag Name" value={tagName} onChange={(e) => setTagName(e.target.value)}/><br></br><br></br>
                <label className="tag-label-color">New Tag Color</label>
                <ColorSelector onColorSelect={handleColorSelect} /><br></br>
                <button type="submit">Save Changes</button>
                <button className="delete-tag custom-delete-button" onClick={handleDelete} ><FontAwesomeIcon icon={faTrash} /></button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              </form>
            </div>
          )}
      </div>
    
    )
  }

export default TagCard;