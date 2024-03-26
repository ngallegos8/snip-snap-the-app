import React, { useState, useEffect } from "react";

import Controls from "./Controls";
import DisplayPreview from "./DisplayPreview";


function Preview ({ selectedClipboardItem, deleteClipboardItem, onFavorite, onCopyToClipboard, onDelete }) {
    

    
    return (
        <div className="preview-component">
            <h3>Preview</h3>

            <div className="controls">
                <Controls selectedClipboardItem={selectedClipboardItem} deleteClipboardItem={deleteClipboardItem} onFavorite={onFavorite} onCopyToClipboard={onCopyToClipboard} onDelete={onDelete}/>
            </div>

            <div className="displaypreview">
                <DisplayPreview selectedClipboardItem={selectedClipboardItem}/>
            </div>
    
        </div>
    )
  }

export default Preview;