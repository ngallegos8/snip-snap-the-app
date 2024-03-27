import React, { useState } from "react";
import ColorSelector from "./ColorSelector";

function NewTagForm({ onNewTagFormSubmit }) {
  const [tagName, setTagName] = useState("")
  const [tagColor, setTagColor] = useState("")


  function handleColorSelect(color) {
    setTagColor(color);
 }

  
  function handleSubmit(e) {
    e.preventDefault()

    const user_id = sessionStorage.getItem("user_id");
    // const user_id = session["user_id"];

    const newTag = {
        name: tagName,
        user_id: user_id,
        color: tagColor
    }
    fetch("/tags", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTag)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create tag');
        }
        return response.json();
      })
    .then(onNewTagFormSubmit)
        setTagName(onNewTagFormSubmit.name)
        setTagColor(onNewTagFormSubmit.color)
}

  return (
    <div className="new-tag-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <ColorSelector onColorSelect={handleColorSelect} />
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
}

export default NewTagForm;