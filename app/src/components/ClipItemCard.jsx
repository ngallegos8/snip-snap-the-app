import React, { useState, useEffect } from "react";


function ClipItemCard({ clipboardItem, deleteClipboardItem, onSelect }) {

  // console.log(clipboardItem)



  function handleDelete() {
    fetch(`/clipboarditems/${clipboardItem.id}`, {
      method: "DELETE"
    })
    deleteClipboardItem(clipboardItem.id)
  }
    

    
    return (
      <div className="clipitemcard-component" onClick={() => onSelect(clipboardItem)}>
            {clipboardItem.content}
            {clipboardItem.id}
            <button className="remove-clipboarditem" onClick={handleDelete}>Delete</button>
        </div>
    )
  }

export default ClipItemCard;