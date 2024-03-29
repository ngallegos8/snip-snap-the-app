import React, { useState, useEffect } from "react";
import updateTag from '../images/tag.png';
import unupdateTag from '../images/untag.png';
// import deleteIcon from '../images/delete.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';


function Controls({ selectedClipboardItem, deleteClipboardItem, tags, updateAssignTag, onFavorite, onCopyToClipboard }) {
    const [clipItemTag, setClipItemTag] = useState(selectedClipboardItem)
    const [selectedTag, setSelectedTag] = useState(null);
    const [showUpdateTagForm, setShowUpdateTagForm] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

  const handleFavorite = () => {
      // Implement favorite/assign to keyboard shortcut logic
      onFavorite(selectedClipboardItem);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Example: Check if the user pressed Control + Option + Command + C
            if (event.ctrlKey && event.altKey && event.metaKey && event.key === 'c') {
                // Perform the action (e.g., copy the content of the selected ClipboardItem)
                if (selectedClipboardItem) {
                    navigator.clipboard.writeText(selectedClipboardItem.content)
                        .then(() => console.log('Copied to clipboard'))
                        .catch(err => console.error('Failed to copy text: ', err));
                }
            }
        };

        // Add the event listener
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedClipboardItem]); // Re-run the effect if selectedClipboardItem changes






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
    
        fetch(`http://127.0.0.1:5000/clipboarditems/${selectedClipboardItem.id}`, {
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
    if (selectedClipboardItem) {
        navigator.clipboard.writeText(selectedClipboardItem.content)
            .then(() => {
                setMessage("Copied to clipboard successfully!");
                setMessageType("success");
                setTimeout(() => {
                    setMessage("");
                    setMessageType("");
                }, 3000);
            })
            .catch(err => {
                setMessage("Failed to copy text. Please try again.");
                setMessageType("error");
                setTimeout(() => {
                    setMessage("");
                    setMessageType("");
                }, 3000);
            });
    }
};

  function handleDelete() {
    fetch(`http://127.0.0.1:5000/clipboarditems/${selectedClipboardItem.id}`, {
      method: "DELETE"
    })
    deleteClipboardItem(selectedClipboardItem.id)
  }


  return (
      <div className="controls-component">
        {/* <h4>Controls</h4> */}
        {/* <button onClick={handleFavorite}>Favorite/Assign Keyboard Shortcut</button> */}
        <div className="control-component-buttons">
                <button className="show-update-tag-button" onClick={() => setShowUpdateTagForm(!showUpdateTagForm)}>
                    {showUpdateTagForm ? <img src={unupdateTag} alt="Unedit Tag" className="unedit-img"/> : <img src={updateTag} alt="Update Tag" className="edit-img"/>}
                </button>
                <button className="copy-clip-item-btn" onClick={handleCopyToClipboard}><FontAwesomeIcon icon={faCopy} /></button>
                <button onClick={handleDelete} className="delete-clip-item-btn"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
                {message && <div className={`message ${messageType}`}>{message}</div>}
            <div className="update-tag-div">
                {showUpdateTagForm && (
                    <div className="assign-tag-menu">
                        <label>Assign Tag</label>
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                onClick={() => handleTagSelection(tag)}
                                style={{
                                    backgroundColor: tag.color ? tag.color : 'rgba(211, 211, 211, 0.8)', // Use tag.color if available, otherwise default to light grey with 80% opacity
                                    border: 'none',
                                    color: 'black',
                                    padding: '10px 20px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                }}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
      </div>
  );
}



export default Controls;