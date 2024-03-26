import React, { useState, useEffect } from "react";


function Controls({ selectedClipboardItem, deleteClipboardItem, onFavorite, onCopyToClipboard, onDelete }) {
  const handleFavorite = () => {
      // Implement favorite/assign to keyboard shortcut logic
      onFavorite(selectedClipboardItem);
  };

  const handleCopyToClipboard = () => {
      // Implement copy to clipboard logic
      onCopyToClipboard(selectedClipboardItem);
  };

  const handleDelete = () => {
      // Implement delete logic
      onDelete(selectedClipboardItem);
  };

  return (
      <div className="controls-component">
          <h4>Controls</h4>
          <button onClick={handleFavorite}>Favorite/Assign Keyboard Shortcut</button>
          <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          <button onClick={handleDelete}>Delete</button>
      </div>
  );
}



export default Controls;