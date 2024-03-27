import React, { useState, useEffect } from "react";
import updateTag from '../images/tag.png';
import unupdateTag from '../images/untag.png';
import deleteIcon from '../images/delete.png';


function Controls({ selectedClipboardItem, deleteClipboardItem, tags, updateAssignTag, onFavorite, onCopyToClipboard }) {
    const [clipItemTag, setClipItemTag] = useState(selectedClipboardItem)
    const [selectedTag, setSelectedTag] = useState(null);
    const [showUpdateTagForm, setShowUpdateTagForm] = useState(false);

  const handleFavorite = () => {
      // Implement favorite/assign to keyboard shortcut logic
      onFavorite(selectedClipboardItem);
    };

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    handleAssignTag();
    };  

    function handleAssignTag(e) {
        // e.preventDefault();
        if (!selectedTag) {
            console.error('No tag selected');
            return;
        }
    
        fetch(`/clipboarditems/${selectedClipboardItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tag_id: selectedTag.id
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update ClipboardItem.tag_id');
            }
            return response.json();
          })
          .then(updatedClipItemTagData => {
            // setClipItemTag(updatedClipItemTagData.tag_id);
            updateAssignTag(updatedClipItemTagData);
          })
          .then(() => setShowUpdateTagForm(false))
          .catch(error => console.error('Error updating ClipboardItem.tag_id:', error));
  };

  const handleCopyToClipboard = () => {
      // Implement copy to clipboard logic
      onCopyToClipboard(selectedClipboardItem);
  };

  const handleDelete = () => {
      // Implement delete logic
      deleteClipboardItem(selectedClipboardItem);
  };

  return (
      <div className="controls-component">
        <h4>Controls</h4>
        <button onClick={handleFavorite}>Favorite/Assign Keyboard Shortcut</button>

        <button className="show-update-tag-button" onClick={() => setShowUpdateTagForm(!showUpdateTagForm)}>
                {showUpdateTagForm ? <img src={unupdateTag} alt="Unedit Tag" className="unedit-img"/> : <img src={updateTag} alt="Update Tag" className="edit-img"/>}
            </button>
            {showUpdateTagForm && (
                <div>
                    <label>Assign Tag</label>
                    {tags.map(tag => (
                        <button key={tag.id} onClick={() => handleTagSelection(tag)}>
                            {tag.name}
                        </button>
                    ))}
                </div>
            )}



          <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          <button onClick={handleDelete}>Delete</button>
      </div>
  );
}



export default Controls;