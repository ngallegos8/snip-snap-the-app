import React, { useState, useEffect } from "react";


function ClipItemCard({ key, clipboardItem, deleteClipboardItem }) {
  // const [clipboardItem, setClipboardItem] = useState("")
  const [clipboardItemDelete, setClipboardItemDelete] = useState("");
  console.log(clipboardItem)



  function handleDelete() {
    fetch(`http://127.0.0.1:5000/clipboarditems/${clipboardItem.id}`, {
      method: "DELETE"
    })
    deleteClipboardItem(clipboardItem.id)
  }
    

    
    return (
      <div className="clipitemcard-component">
        {clipboardItem.content}
        {clipboardItem.id}
        <button className="remove-clipboarditem" onClick={handleDelete}>Delete</button>

      </div>
    )
  }

export default ClipItemCard;