import React from "react";
import ClipItemCard from "./ClipItemCard";

function ClipItemList({ clipboardItems, onSelect }) {   
  // console.log(clipboardItems)

  // Calculate the number of empty rows needed
 const totalRows = 100; // Example: Total rows you want to display
 const actualRows = clipboardItems.length;
 const emptyRows = totalRows - actualRows;

 const renderEmptyRow = (index) => (
  <div key={`empty-${index}`} className="clipitemcard-component empty">
    {/* Empty content */}
  </div>
);

// Combine actual and empty rows
const combinedRows = [...clipboardItems, ...Array.from({ length: emptyRows }, (_, index) => renderEmptyRow(index))];

  const clipboardItemList = clipboardItems.map(clipboardItem => {
    return <ClipItemCard key={clipboardItem.id} clipboardItem={clipboardItem} onSelect={onSelect} />  
  })
//  console.log(clipboardItemList)


return (
  <ul className="clipitemlist-component">
    {combinedRows.map((clipboardItem, index) => (
      <ClipItemCard key={clipboardItem.id || `empty-${index}`} clipboardItem={clipboardItem} onSelect={onSelect} />
    ))}
  </ul>
);

  // return (
  //     <>
  //       <ul className="clipitemlist-component">
  //           <h3 className="clipitemlist-title">Clipboard Content</h3>
  //           {clipboardItemList}
  //       </ul>
  //     </>
  // );

//   return (
//     <>
//       <div className="clipitemlist-title">Content</div>
//       <ul className="clipitemlist-component">
//         {clipboardItemList}
//       </ul>
//     </>
//  );

// return (
//   <>
//     <div className="clipitemlist-title">
//       <div>Content</div>
//       {/* Assuming you want to display the ID of the first item in the list as an example */}
//       <div style={{ color: '#666', marginLeft: 'auto' }}>{clipboardItems[0]?.id}</div>
//     </div>
//     <ul className="clipitemlist-component">
//       {clipboardItemList}
//     </ul>
//   </>
// );


}

export default ClipItemList;