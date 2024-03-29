import React, { useState } from "react";
import ColorSelector from "./ColorSelector";

function NewTagForm({ onNewTagFormSubmit }) {
  const [tagName, setTagName] = useState("")
  const [tagColor, setTagColor] = useState("")
  const [errorMessage, setErrorMessage] = useState('');


  function handleColorSelect(color) {
    setTagColor(color);
 }

  
  function handleSubmit(e) {
    e.preventDefault()

    if (tagName === "") {
      setErrorMessage('Tag name cannot be empty.');
      return;
   }

    const user_id = sessionStorage.getItem("user_id");
    // const user_id = session["user_id"];

    const newTag = {
        name: tagName,
        user_id: user_id,
        color: tagColor
    }
    fetch("http://127.0.0.1:5000/tags", {
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
        <label className="tag-label-name">Name of Tag</label><br></br>
        <input type="text" name="name" placeholder="e.g. 'Link'" value={tagName} onChange={(e) => setTagName(e.target.value)} /><br></br><br></br>
        <label className="tag-label-color">Tag Color?</label>
        <ColorSelector onColorSelect={handleColorSelect} /><br></br>
        <button type="submit">Create Tag</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default NewTagForm;