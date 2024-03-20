import React, { useEffect, useState } from "react";
import { Switch, Route, Routes, createBrowserRoute, RouterProvider, BrowserRouter } from "react-router-dom";
import NavBar from './Navbar'
import UserHome from './UserHome'
import Signup from'./Signup'
import Home from './Home'
import Login from './Login'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch("/check_session").then((r) => {
      // console.log(r)
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;



  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/UserHome" element={<UserHome />} /> */}
      
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
 );

}

export default App