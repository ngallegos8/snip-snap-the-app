import React, { useState, useEffect } from "react";


function ClipItemCard({ clipboardItem, onSelect }) {

  // console.log(clipboardItem)



    

    
    return (
      <div className="clipitemcard-component" onClick={() => onSelect(clipboardItem)}>
            <div className="clipitemcard-id">{clipboardItem.id}</div>
            <div className="clipitemcard-content">{clipboardItem.content}</div>
      </div>
    )
  }

export default ClipItemCard;