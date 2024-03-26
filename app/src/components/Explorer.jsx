import React, { useState, useEffect } from "react";

import ClipItemList from "./ClipItemList";

import Preview from "./Preview"



function Explorer({ clipboardItems, deleteClipboardItem, onFavorite, onCopyToClipboard, onDelete }) {
    // console.log(clipboardItems)
    const [selectedClipboardItem, setSelectedClipboardItem] = useState(null);

    const handleSelect = (clipboardItem) => {
        setSelectedClipboardItem(clipboardItem);
    };
    

    
    return (
        <div className="explorer-component">
            <h1>Explorer</h1>
            <div className="clipitemlist">
                <ClipItemList clipboardItems={clipboardItems} deleteClipboardItem={deleteClipboardItem} onSelect={handleSelect} />
            </div>
            <div className="preview">
                <Preview selectedClipboardItem={selectedClipboardItem} deleteClipboardItem={deleteClipboardItem} onFavorite={onFavorite} onCopyToClipboard={onCopyToClipboard} onDelete={onDelete} />
            </div>
        </div>
    )
  }

export default Explorer;