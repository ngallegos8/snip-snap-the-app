import React, {useState} from "react";

function LoginForm({ onLogin }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState()
}




function UserLogin( {onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } 
        });
      }
    
      return(
        <form onSubmit={handleSubmit}>
          <label>username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <label>password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button type="submit">Log In</button>
        </form>
      )
}

export default UserLogin;
