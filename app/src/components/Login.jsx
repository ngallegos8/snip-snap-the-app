import React, {useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function UserLogin( {onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    //const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const history = useHistory()
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    useEffect(() => {

        fetch("http://127.0.0.1:5000/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
        });
      }, []);
    

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
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
            navigate("/UserHome"); // Assuming the route for UserHome is '/UserHome'
          })
          .catch((error) => {
            console.error("Login failed:", error);
          });
      }
    
      return(
        <div className="user-login">
          <div className="header-top"></div>
            <form onSubmit={handleSubmit}>
              <h1 className="form-title">Log in to Snip-Snap</h1>
              <p className='user-signup-link'>Sign Up Instead <Link to="/signup">Sign up</Link></p>
                <label>Enter Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label>Enter Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Enter Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <button type="submit">Log In</button>
            </form>
          </div>
      );
};

export default UserLogin;




// import React, {useState, useEffect } from "react";
// // import { useHistory } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';


// function Login( {onLogin}) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     //const [errors, setErrors] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     // const history = useHistory()
//     // const navigate = useNavigate();
//     // const [user, setUser] = useState(null);

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsLoading(true);
//         fetch("http://127.0.0.1:5000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password, email }),
//         }).then((r) => {
//           setIsLoading(false);
//           if (r.ok) {
//             r.json().then((user) => onLogin(user));
//           } 
//         });
//       }
    
//       return(
//         <form onSubmit={handleSubmit}>
//           <label>username</label>
//           <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
//           <label>password</label>
//           <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
//           <label>email</label>
//           <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
//           <button type="submit">Log In</button>
//         </form>
//       )
// }

// export default Login;
