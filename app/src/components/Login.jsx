import React, {useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSignIn } from '@fortawesome/free-solid-svg-icons';


function UserLogin( {onLogin}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }).then((r) => {
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
    
      return(
        <div className="user-login">
          <div className="snip-snap-logo">
            <h1>Snip-Snap</h1>
            <p>Stay Clipped In</p>
          </div>
          <div className="header-top"></div>
            <form onSubmit={handleSubmit}>
              <h1 className="form-title">Welcome</h1>

                <label>Username</label>
                <input value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Enter your username">
                </input><br></br>
                <p>-OR-</p>
                <label>Email </label>
                <input value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email">
                </input><br></br><br></br>

                <label>Password </label>
                <div className="password-input-wrapper">
                    <input type={showPassword ? "text" : "password"}
                           value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder="Enter your password">
                    </input>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div><br></br>

              <button type="submit">Log In    <FontAwesomeIcon icon={faSignIn}/></button><br></br><br></br>

              <p className='user-signup-link'>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
          </div>
      );
};

export default UserLogin;