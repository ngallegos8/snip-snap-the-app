import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup({ onLogin }) {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {

    //     fetch("http://127.0.0.1:5000/check_session").then((r) => {
    //       if (r.ok) {
    //         r.json().then((user) => setUser(user));
    //       }
    //     });
    //   }, []);


    function handleSignup(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: name,
                password: password,
                email: email
            })
        })
        .then((r) => {
            setIsLoading(false);
            if (r.ok) {
              return r.json();
            } else {
              alert("Invalid credentials")
              throw new Error("Invalid username or password");
            } 
          })
          .then((user) => {
              onLogin(user.username, user.password, user.email);
              // Redirect to UserHome after successful login
              navigate("/UserHome"); // Assuming the route for UserHome is '/UserHome'
            })
            .catch((error) => {
              console.error("Login failed:", error);
            });
    }

    return (
        <div className="user-signup">
            <div className="header-top"></div>
                <h1>New User Account</h1>
                <form onSubmit={handleSignup}>
                        <label>Enter Username </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><p></p>

                        <label>Enter Password </label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input><p></p>

                        <label>Enter Email </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <br></br> <br></br>

                        <button type="submit">Log In</button>
                </form>
        </div>
    );
};

export default Signup;