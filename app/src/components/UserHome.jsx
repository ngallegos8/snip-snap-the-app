import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Finder from "./Finder"
import Explorer from "./Explorer"




function UserHome({ onLogin }) {
    const [clipboardItems, setClipboardItems] = useState([]);
    const [clipItemTags, setClipItemTags] = useState([]);
    const [searchClipboardItems, setSearchClipboardItems] = useState("");
    // const [displayedTagClipboardItems, setDisplayedTagClipboardItems] = useState(clipboardItems);
    const [displayedTagClipboardItems, setDisplayedTagClipboardItems] = useState([]);
    const [filteredClipboardItems, setFilteredClipboardItems] = useState([]);
    const [selectedClipboardItem, setSelectedClipboardItem] = useState(null);
    const [tags, setTags] = useState([]);


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    // console.log(clipboardItems)
    
    useEffect(() => {
        fetch("/clipboarditems")
        .then(response => response.json())
        .then(setClipboardItems)
    }, [])
    console.log(clipboardItems)

    
    useEffect(() => {
      fetch("/tags")
      .then(response => response.json())
      .then(setTags)
  }, [])
  console.log(tags)

//   useEffect(() => {
//       fetch("http://127.0.0.1:5000/clipboarditems/tag/<int:tag_id>")
//       .then(response => response.json())
//       .then(setClipItemTags)
//   }, [])
//   console.log(clipItemTags)
   

    
    function deleteClipboardItem(id) {
    const newClipboardItems = clipboardItems.filter((clipboardItem) => clipboardItem.id !== id)
    setClipboardItems(newClipboardItems)
    }


    const handleSelect = (clipboardItem) => {
        setSelectedClipboardItem(clipboardItem);
    };

    const onFavorite = (clipboardItem) => {
    // Implement favorite/assign to keyboard shortcut logic
    console.log("Favorite/Assign to Keyboard Shortcut:", clipboardItem);
    };

    const onCopyToClipboard = (clipboardItem) => {
        // Implement copy to clipboard logic
        console.log("Copy to Clipboard:", clipboardItem);
    };

    const onDelete = (clipboardItem) => {
        // Implement delete logic
        console.log("Delete:", clipboardItem);
    };



    //    ALLOWS SEARCH FUNCTION TO SEARCH FOR ANY RATIONAL PARAMETER IN THE EVENT OBJECT
    const displayedClipboardItems = clipboardItems.filter((clipboardItem) => {
        // console.log(clipboardItem.content)
        return clipboardItem.content.toLowerCase().includes(searchClipboardItems.toLowerCase())

    })
    console.log(clipboardItems)

    // const handleTagClick = (tagId) => {
    //     // Assuming each clipboardItem has a 'tags' property that is an array of tag IDs
    //     const filteredItems = clipboardItems.filter(clipboardItem => (clipboardItem.tag?.includes(tagId) ?? false));
    //     setFilteredClipboardItems(filteredItems);
    // };

    const handleTagClick = (tagId) => {
        // Filter clipboardItems where the tag_id matches the selected tag's ID
        const filteredItems = clipboardItems.filter(clipboardItem => clipboardItem.tag_id === tagId);
        setFilteredClipboardItems(filteredItems);
    };
    console.log(filteredClipboardItems)

    function handleNewTagFormSubmit(newTag) {
        setTags([...tags, newTag])
    }

    function handleUpdateTag(newTag) {
        const updatedTags = tags.map((tag) => {
            if (tag.id === newTag.id) {
            return newTag
            } else {
            return tag
            }
        })
        setTags(updatedTags)
        }

    function deleteTag(id) {
        const newTags = tags.filter((tag) => tag.id !== id)
        setTags(newTags)
    }
    
    
    

    function handleLogout() {
        alert("See you next time!");
        fetch("/logout", {
            method: "DELETE"
        })
        .then(() => {
            setUser(null);
            navigate("/")
        })
        .catch(error => {
            console.error("Error during logout:", error);
        });
    }

    return(
        <main>
            <div className="window">

                <div className="finder">
                    {/* <Finder search={searchClipboardItems} setSearch={setSearchClipboardItems} tags={tags} deleteTag={deleteTag} handleLogout={handleLogout} /> */}
                    <Finder search={searchClipboardItems}
                    setSearch={setSearchClipboardItems}
                    tags={tags}
                    deleteTag={deleteTag}
                    handleLogout={handleLogout}
                    onTagClick={handleTagClick}
                    onSelect={handleSelect}
                    selectedClipboardItem={selectedClipboardItem}
                    onNewTagFormSubmit={handleNewTagFormSubmit}
                    updateTag={handleUpdateTag}
                    // onLogin={onLogin}
                    />
                </div>

                <div className="explorer">
                    <Explorer 
                    // clipboardItems={displayedClipboardItems}
                    clipboardItems={filteredClipboardItems.length > 0 ? filteredClipboardItems : displayedClipboardItems}
                    // clipboardItems={filteredClipboardItems.length > 0 ? filteredClipboardItems : clipboardItems}
                    deleteClipboardItem={deleteClipboardItem}
                    onFavorite={onFavorite}
                    onCopyToClipboard={onCopyToClipboard}
                    onSelect={handleSelect}
                    selectedClipboardItem={selectedClipboardItem}
                    />
                    {/* <Explorer clipboardItems={displayedTagClipboardItems} deleteClipboardItem={deleteClipboardItem}/> */}
                </div>

            </div>
        </main>








        // <main>
        //     <div className="header-top"></div>
        //     <button className='login-btn' onClick={handleLogout}>Logout</button>
        //     <h1 className="welcome-msg">Welcome Back!{ user }</h1>
        //     <Search search={searchClipItems} setSearch={setSearchClipItems} />
        //     <ClipItemList clipItems={displayedClipItems} deleteClipItem={deleteClipItem} />
        // </main>
    );
}

export default UserHome;