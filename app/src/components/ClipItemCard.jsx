import React, { useState, useEffect } from "react";


function ClipItemCard({ key, clipboardItem, deleteClipboardItem }) {
    

    
    return (
      <div className="clipitemcard-component">
        {clipboardItem.content}
        <button className="remove-clipboarditem" onClick={deleteClipboardItem}>Delete</button>

      </div>
    )
  }

export default ClipItemCard;