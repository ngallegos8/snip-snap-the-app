import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Finder from "./Finder"
import Explorer from "./Explorer"





function UserHome({ onLogin }) {
console.log("hello")
    const [clipItems, setClipItems] = useState("");
    const [searchClipItems, setSearchClipItems] = useState("");
    const [user, setUser] = useState(null)
    // const history = useHistory();
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://127.0.0.1:5000/clipboarditems")
          .then(response => response.json())
          .then(setClipItems)
      }, [])


    function deleteClipItem(id) {
    const newClipItems = clipItems.filter((clipItem) => clipItem.id !== id)
    setClipItems(newClipItems)
    }

    // const displayedClipItems = clipItems.filter((clipItems) => clipItems.name.toLowerCase().includes(searchClipItems.toLowerCase()))

    // // //    ALLOWS SEARCH FUNCTION TO SEARCH FOR ANY RATIONAL PARAMETER IN THE EVENT OBJECT
    // const displayedClipItems = clipItems.filter((clipItem) => {
    //     console.log(clipItem)
    //     return clipItem.content.toLowerCase().includes(searchClipItems.toLowerCase()) ||
    //     clipItem.tag_clipboarditems.toLowerCase().includes(searchClipItems.toLowerCase())
    //   })

    function handleLogout() {
        alert("See you next time!");
        fetch("http://127.0.0.1:5000/logout", {
            method: "DELETE"
        })
        .then(() => {
            setUser(null);
            // Redirect to the index page after logout
            navigate("/")
        })
        .catch(error => {
            // Handle error if needed
            console.error("Error during logout:", error);
        });
    }

    return(
        <main>
            <div className="window">

                <div className="finder">
                    <Finder search={searchClipItems} setSearch={setSearchClipItems} handleLogout={handleLogout}/>
                </div>

                <div className="explorer">
                    {/* <Explorer clipItems={displayedClipItems} deleteClipItem={deleteClipItem}/> */}
                    <Explorer  deleteClipItem={deleteClipItem}/>
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