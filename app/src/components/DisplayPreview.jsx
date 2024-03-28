import React, { useState, useEffect } from "react";



function DisplayPreview({ selectedClipboardItem, tag }) {
  if (!selectedClipboardItem) {
      return <div>No item selected</div>;
  }

  // Assuming the content is a Base64 encoded string for images or files
  const contentType = selectedClipboardItem.contentType; // This should be determined based on the content
  let content;

  if (contentType === 'text') {
      content = <p>{selectedClipboardItem.content}</p>;
  } else if (contentType === 'image') {
      content = <img src={`data:image/png;base64,${selectedClipboardItem.content}`} alt="Clipboard item" />;
  } else if (contentType === 'file') {
      // Handle file preview, possibly by displaying a download link or an embedded file viewer
      content = <a href={selectedClipboardItem.content} download>Download File</a>;
  }
//   const tagName = selectedClipboardItem.tag_id ? selectedClipboardItem.tags : 'No tag';
//   console.log(selectedClipboardItem)

// const tagName = selectedClipboardItem.tag_id ? tag.name : 'No tag';


  return (
    <div className="displaypreview-component">
          {/* <h3>DisplayPreview</h3> */}
        <div className="cbi-preview-content">{selectedClipboardItem.content}</div>
        <div className="cbi-preview-info">
            Information
            <div className="cbi-preview-info-created">
                <div className="cbi-preview-info-created-title">Created</div>
                <div className="cbi-preview-info-created-info">{selectedClipboardItem.created_fat}</div>
            </div>
            <div className="cbi-preview-info-updated">
                <div className="cbi-preview-info-updated-title">Updated</div>
                <div className="cbi-preview-info-updated-info">{selectedClipboardItem.updated_at}</div>
            </div>
        </div>
        <div className="cbi-preview-tags">
            Tags
            <div className="cbi-preview-tags-id">Tag ID: {selectedClipboardItem.tag_id}</div>
            {/* <div className="cbi-preview-tags-id-name">{selectedClipboardItem.tag_id.name}</div> */}
        </div>
        {/* <div className="cbi-preview-key-shortcut">
            Keyboard Shortcut
            <div className="cbi-preview-key-shortcut">{selectedClipboardItem.keyboard_shortcut}</div>
        </div> */}
          {/* Tag: {tagName} */}
    </div>
  );
}

export default DisplayPreview;




    //   <div className="displaypreview-component">
    //       <h3>DisplayPreview</h3>
    //       {selectedClipboardItem.content}
    //       {/* {selectedClipboardItem.tagName} */}
    //       {/* {content} */}
    //       Tag: {tag.name}
    //   </div>