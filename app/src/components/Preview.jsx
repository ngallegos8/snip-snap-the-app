import React, { useState, useEffect } from "react";

import Controls from "./Controls";
import DisplayPreview from "./DisplayPreview";


function Preview ({ selectedClipboardItem, deleteClipboardItem, onFavorite, onCopyToClipboard }) {
    

    
    return (
        <div className="preview-component">
            <h3>Preview</h3>

            <div className="controls">
                <Controls selectedClipboardItem={selectedClipboardItem} deleteClipboardItem={deleteClipboardItem} onFavorite={onFavorite} onCopyToClipboard={onCopyToClipboard} />
            </div>

            <div className="displaypreview">
                <DisplayPreview selectedClipboardItem={selectedClipboardItem}/>
            </div>
    
        </div>
    )
  }

export default Preview;