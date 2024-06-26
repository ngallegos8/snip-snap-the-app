import React, { useState, useEffect } from "react";

import Controls from "./Controls";
import DisplayPreview from "./DisplayPreview";


function Preview ({ selectedClipboardItem, deleteClipboardItem, tags, updateAssignTag, onFavorite, onCopyToClipboard }) {

    const [tag, setTag] = useState([])
    useEffect(()=>{
        fetch(`http://127.0.0.1:5000/tags/${selectedClipboardItem?.tag_id}`)
        .then(res => res.json())
        .then(data => setTag(data))
    },[selectedClipboardItem])

    
    return (
        <div className="preview-controls-container">
            {/* <h3>Preview</h3> */}

            <div className="controls">
                <Controls selectedClipboardItem={selectedClipboardItem}
                          deleteClipboardItem={deleteClipboardItem}
                          tags={tags}
                          updateAssignTag={updateAssignTag}
                          onFavorite={onFavorite}
                          onCopyToClipboard={onCopyToClipboard} />
            </div>

            <div className="displaypreview">
                <DisplayPreview selectedClipboardItem={selectedClipboardItem}
                                tag={tag}/>
            </div>
    
        </div>
    )
  }

export default Preview;