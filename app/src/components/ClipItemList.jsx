import React from "react";
import ClipItemCard from "./ClipItemCard";

function ClipItemList({ clipItems, deleteClipItem}) {   
  console.log(clipItems)

  const clipItemList = clipItems.map(clipItem => {
    return <ClipItemCard key={clipItem.id} clipItem={clipItem} deleteClipItem={deleteClipItem} />  
  })
 console.log(clipItemList)

  return (
      <>
        <ul className="clipitemlist-component">
            {clipItemList}
        </ul>
      </>
  );
}

export default ClipItemList;