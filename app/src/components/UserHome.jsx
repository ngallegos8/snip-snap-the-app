import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Finder from "./Finder"
import Explorer from "./Explorer"




function UserHome({ onLogin }) {
    const [clipboardItems, setClipboardItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchClipboardItems, setSearchClipboardItems] = useState("");
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    // console.log(clipboardItems)
    
    useEffect(() => {
        fetch("http://127.0.0.1:5000/clipboarditems")
        .then(response => response.json())
        .then(setClipboardItems)
    }, [])
    // console.log(clipboardItems)

    
    useEffect(() => {
      fetch("http://127.0.0.1:5000/tags")
      .then(response => response.json())
      .then(setTags)
  }, [])
//   console.log(tags)
   

    
    function deleteClipboardItem(id) {
    const newClipboardItems = clipboardItems.filter((clipboardItem) => clipboardItem.id !== id)
    setClipboardItems(newClipboardItems)
    }

    function deleteTag(id) {
  const newTags = tags.filter((tag) => tag.id !== id)
  setTags(newTags)
  }

    // const displayedClipboardItems = clipboardItems.filter((clipboardItem) => clipboardItem.content.toLowerCase().includes(searchClipboardItems.toLowerCase()))

    //    ALLOWS SEARCH FUNCTION TO SEARCH FOR ANY RATIONAL PARAMETER IN THE EVENT OBJECT
    const displayedClipboardItems = clipboardItems.filter((clipboardItem) => {
        // console.log(clipboardItem.content)
        return clipboardItem.content.toLowerCase().includes(searchClipboardItems.toLowerCase())

    })

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
                    <Finder search={searchClipboardItems} setSearch={setSearchClipboardItems} tags={tags} deleteTag={deleteTag} handleLogout={handleLogout}/>
                </div>

                <div className="explorer">
                    <Explorer clipboardItems={displayedClipboardItems} deleteClipboardItem={deleteClipboardItem}/>
                    {/* <Explorer  clipboardItems={clipboardItems} deleteClipboardItem={deleteClipboardItem}/> */}
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