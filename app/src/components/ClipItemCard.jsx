import React, { useState, useEffect } from "react";


function ClipItemCard({ clipboardItem, onSelect }) {

  // console.log(clipboardItem)


  
  
  //   return (
  //     <div className="clipitemcard-component" onClick={() => onSelect(clipboardItem)}>
  //           <div className="clipitemcard-content">{clipboardItem.content}</div>
  //           <div className="clipitemcard-id">{clipboardItem.id}</div>
  //     </div>
  //   )
  // }

    return (
      <div className="clipitemcard-component" onClick={() => onSelect(clipboardItem)}>
        <div>{clipboardItem.content}</div>
        <div style={{ marginLeft: 'auto', color: '#666' }}>{clipboardItem.id}</div>
      </div>
   );
  }

export default ClipItemCard;