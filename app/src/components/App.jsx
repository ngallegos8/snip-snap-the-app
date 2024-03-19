import React, { useEffect, useState } from "react";
import { Switch, Route, Routes, createBrowserRoute, RouterProvider, BrowserRouter } from "react-router-dom";
import NavBar from './Navbar'
import User from './UserHome'
import Signup from'./Signup'
import Home from './Home'
import UserLogin from './Login'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <UserLogin onLogin={setUser} />;

 
  return(
    <BrowserRouter>
      <NavBar/>
  
    
          <Switch>
          <Route path="/">
            <Home/>
          </Route>
          <Route exact path="/User">
            <User/>
          </Route>
          <Route exact path="/Venue">
            <Venue/>
          </Route>
          <Route exact path="/Event">
            <Event />
          </Route>
          <Route exact path="/signup/user">
            <Signup />
          </Route>
          <Route exact path="/signup/venue">
            <VenueSignup />
          </Route>
          <Route exact path="/login/user">
            <UserLogin onLogin={setUser}/>
          </Route>
          <Route exact path="/login/venue">
            <VenueLogin onLogin={setVenue}/>
          </Route>
          <Route exact path="/UserHome">
            <UserHome />
          </Route>
          <Route exact path="/VenueHome">
            <VenueHome />
          </Route>
          </Switch>
     
        

    </BrowserRouter>


  );

}

export default App