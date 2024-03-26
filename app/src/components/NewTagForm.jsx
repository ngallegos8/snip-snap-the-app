import React, { useState } from "react";

function NewTagForm({ onNewTagFormSubmit }) {
  const [tagName, setTagName] = useState("")
//   const [tagColor, setTagColor] = useState("")
  


  function handleSubmit(e) {
    e.preventDefault()

    const newTag = {
        name: tagName,
        // user_id: 
        // color: tagColor
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
          throw new Error('Failed to update tag');
        }
        return response.json();
      })
    .then(onNewTagFormSubmit)
        setTagName(onNewTagFormSubmit.name)
        // setTagColor(onNewTagFormSubmit.color)

}

  return (
    <div className="new-tag-form" onSubmit={handleSubmit}>
      <h2 className='form-title'>New Tag</h2>
      <form>
        <input type="text" name="name" value={tagName} onChange={(e) => setTagName(e.target.value)}/>
        {/* <input type="text" name="color" value={tagColor} onChange={(e) => setTagColor(e.target.value)}/> */}
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
}

export default NewTagForm;