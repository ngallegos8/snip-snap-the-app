import React, { useState, useEffect } from "react";

import ClipItemList from "./ClipItemList";

import Preview from "./Preview"



function Explorer({ clipboardItems, deleteClipboardItem, tags, updateAssignTag, onFavorite, onCopyToClipboard, onSelect, selectedClipboardItem }) {
    // console.log(clipboardItems)
    

    
    

    
    return (
        <div className="explorer-component">
            {/* <h1>Explorer</h1> */}
            <div className="clipitemlist">
                <ClipItemList clipboardItems={clipboardItems} 
                              onSelect={onSelect} />
            </div>
            <div className="preview">
                <Preview selectedClipboardItem={selectedClipboardItem}
                         deleteClipboardItem={deleteClipboardItem}
                         tags={tags}
                         updateAssignTag={updateAssignTag}
                         onFavorite={onFavorite}
                         onCopyToClipboard={onCopyToClipboard} />
            </div>
        </div>
    )
  }

export default Explorer;