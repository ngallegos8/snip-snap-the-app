import {useEffect, useState} from "react";

function Signup() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        fetch("/http://127.0.0.1:5000check_session").then((r) => {
            if (r.ok) {
                r.json()
                .then((user) => setUser(user))
            }
        })
    }, [])


    function handleSignup(e){
        e.preventDefault()
        fetch("/signup/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
        .then(r => r.json())
        .then(data => setUser(data))
    }


    function handleLogout(){
        fetch("/logout", {
            method: "DELETE"
        })
        .then(setUser(null))
    }

    if(user){
        return (
            <>
            <h1>Welcome, {user.username}</h1>
            <button onClick={handleLogout}>Logout</button>
            </>
        )
    }
    else {
        return (
            <>
                <h1>New User Account</h1>
                <form onSubmit={handleSignup}>
                        <label>Enter Username</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><p></p>

                        <label>Enter Password</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input><p></p>

                        <button type="submit">Submit</button>
                </form>
            </>
        );
    };
};

export default Signup;