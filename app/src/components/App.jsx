
import React, { useEffect, useState } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import UserHome from './UserHome'
import Signup from'./Signup'
import Login from './Login'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log("HELP")
    fetch("http://127.0.0.1:5000/check_session").then((r) => {
      console.log(r)
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  console.log(user)


  // if (!user) return <Login onLogin={setUser} />;



  return (
    <HashRouter>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login onLogin={setUser}/>} />
        <Route path="/signup" element={<Signup onLogin={setUser}/>} />
        <Route path="/UserHome" element={<UserHome onLogin={user}/>} />
      
        {/* Add other routes as needed */}
      </Routes>
    </HashRouter>
 );

}

export default App
