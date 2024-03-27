import React from 'react'

function ColorSelector({ onColorSelect }) {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#800000", "#008000"];
   
    // Function to handle the selection of a color or "no color"
    function handleColorSelect(color) {
       onColorSelect(color);
    }
   
    return (
       <div className="color-selector">
         {colors.map((color, index) => (
           <button
             key={index}
             style={{ backgroundColor: color }}
             onClick={() => handleColorSelect(color)}
           />
         ))}
         {/* Add a "no color" option */}
         <button
           style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
           onClick={() => handleColorSelect("")}
         >
           No Color
         </button>
       </div>
    );
   }

export default ColorSelector;

// function ColorSelector({ onColorSelect }) {
//     const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#800000", "#008000"];
   
//     return (
//        <div className="color-selector">
//          {colors.map((color, index) => (
//            <button
//              key={index}
//              style={{ backgroundColor: color }}
//              onClick={() => onColorSelect(color)}
//            />
//          ))}
//        </div>
//     );
//    }

// export default ColorSelector;
