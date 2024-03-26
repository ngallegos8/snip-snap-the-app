import React from "react";
import ClipItemCard from "./ClipItemCard";

function ClipItemList({ clipboardItems, deleteClipboardItem, onSelect }) {   
  // console.log(clipboardItems)

  const clipboardItemList = clipboardItems.map(clipboardItem => {
    return <ClipItemCard key={clipboardItem.id} clipboardItem={clipboardItem} deleteClipboardItem={deleteClipboardItem} onSelect={onSelect} />  
  })
//  console.log(clipboardItemList)

  return (
      <>
        <ul className="clipitemlist-component">
            <h3>ClipboardItemList</h3>
            {clipboardItemList}
        </ul>
      </>
  );
}

export default ClipItemList;