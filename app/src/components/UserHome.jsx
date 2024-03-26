import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Finder from "./Finder"
import Explorer from "./Explorer"




function UserHome({ onLogin }) {
    const [clipboardItems, setClipboardItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [clipItemTags, setClipItemTags] = useState([]);
    const [searchClipboardItems, setSearchClipboardItems] = useState("");
    // const [displayedTagClipboardItems, setDisplayedTagClipboardItems] = useState(clipboardItems);
    const [displayedTagClipboardItems, setDisplayedTagClipboardItems] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    // console.log(clipboardItems)
    
    useEffect(() => {
        fetch("http://127.0.0.1:5000/clipboarditems")
        .then(response => response.json())
        .then(setClipboardItems)
    }, [])
    console.log(clipboardItems)

    
    useEffect(() => {
      fetch("http://127.0.0.1:5000/tags")
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

    function deleteTag(id) {
  const newTags = tags.filter((tag) => tag.id !== id)
  setTags(newTags)
  }

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

    // const displayedClipboardItems = clipboardItems.filter((clipboardItem) => clipboardItem.content.toLowerCase().includes(searchClipboardItems.toLowerCase()))

    //    ALLOWS SEARCH FUNCTION TO SEARCH FOR ANY RATIONAL PARAMETER IN THE EVENT OBJECT
    const displayedClipboardItems = clipboardItems.filter((clipboardItem) => {
        // console.log(clipboardItem.content)
        return clipboardItem.content.toLowerCase().includes(searchClipboardItems.toLowerCase())

    })

    // const handleTagClick = (tagId) => {
    //     // Assuming each clipboardItem has a 'tags' property that is an array of tag IDs
    //     const filteredItems = clipboardItems.filter(clipboardItem => (clipboardItem.tag_clipboarditems?.includes(tagId) ?? false));

    //     setDisplayedTagClipboardItems(filteredItems);
    //  };
    //  console.log(displayedTagClipboardItems)

    // const handleTagClick = (tag_id) => {
    //     setIsLoading(true);
    //     setError(null);
    //     fetch(`http://127.0.0.1:5000/clipboarditems/tag/${tag_id}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch clipboard items');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setDisplayedTagClipboardItems(data);
    //             console.log("Updated displayedTagClipboardItems:", data);
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //             setIsLoading(false);
    //         });
    // };
    
    


    function handleLogout() {
        alert("See you next time!");
        fetch("http://127.0.0.1:5000/logout", {
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
                    <Finder search={searchClipboardItems} setSearch={setSearchClipboardItems} tags={tags} deleteTag={deleteTag} handleLogout={handleLogout} />
                    {/* <Finder search={searchClipboardItems} setSearch={setSearchClipboardItems} tags={tags} deleteTag={deleteTag} handleLogout={handleLogout} onTagClick={handleTagClick} /> */}
                </div>

                <div className="explorer">
                    <Explorer clipboardItems={displayedClipboardItems} deleteClipboardItem={deleteClipboardItem} onFavorite={onFavorite} onCopyToClipboard={onCopyToClipboard} />
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