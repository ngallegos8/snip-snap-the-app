import React, { useState, useEffect } from "react";



function DisplayPreview({ selectedClipboardItem, tag }) {
  if (!selectedClipboardItem) {
      return <div>No item selected</div>;
  }

  // Assuming the content is a Base64 encoded string for images or files
  // You might need to adjust this based on how your backend sends the data
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

const tagName = selectedClipboardItem.tag_id ? tag.name : 'No tag';



  


  return (
    <div className="displaypreview-component">
          <h3>DisplayPreview</h3>
          {selectedClipboardItem.content}
          Tag: {tagName}
    </div>


    //   <div className="displaypreview-component">
    //       <h3>DisplayPreview</h3>
    //       {selectedClipboardItem.content}
    //       {/* {selectedClipboardItem.tagName} */}
    //       {/* {content} */}
    //       Tag: {tag.name}
    //   </div>
  );
}

export default DisplayPreview;