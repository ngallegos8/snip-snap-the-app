import React from "react";
import ClipItemCard from "./ClipItemCard";

function ClipItemList({ clipboardItems, onSelect }) {   
  // console.log(clipboardItems)

  const clipboardItemList = clipboardItems.map(clipboardItem => {
    return <ClipItemCard key={clipboardItem.id} clipboardItem={clipboardItem} onSelect={onSelect} />  
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