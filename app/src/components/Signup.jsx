import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signup({ onLogin }) {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();



    function handleSignup(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
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
              navigate("/UserHome");
            })
            .catch((error) => {
              console.error("Login failed:", error);
            });
    }

    return (
      <div className="user-signup">
          <div className="header-top"></div>
            <form onSubmit={handleSignup}>
              <h1 className="form-title">Sign Up</h1>

                <label>Username</label>
                <input value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Create a username">
                </input><br></br><br></br>

                <label>Password </label>
                <div className="password-input-wrapper">
                    <input type={showPassword ? "text" : "password"}
                           value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder="Create your password">
                    </input>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div><br></br><br></br>

                <label>Email </label>
                <input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email">
                </input><br></br><br></br>

              <button type="submit">Log In</button><br></br><br></br>

              <p className='user-signup-link'>Back to <Link to="/">Login</Link></p>
              
            </form>
            <div className="snip-snap-logo">
              <h1>Snip-Snap</h1>
              <p>Get Clipped In</p>
             </div>
        </div>
        

    );
};

export default Signup;