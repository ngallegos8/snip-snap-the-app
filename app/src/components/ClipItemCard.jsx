import React, { useState, useEffect } from "react";


function ClipItemCard({ clipboardItem, onSelect }) {

  // console.log(clipboardItem)



    

    
    return (
      <div className="clipitemcard-component" onClick={() => onSelect(clipboardItem)}>
            {clipboardItem.content}
            {clipboardItem.id}
        </div>
    )
  }

export default ClipItemCard;