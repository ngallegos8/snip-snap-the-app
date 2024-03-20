import React from 'react';
import {Link, useParams} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Welcome to View Party!</h1>
            <h2>I am a </h2>
            <Link to="/signup"> <button >Sign Up</button> </Link><p></p>
            <Link to="/login"> <button >User Login</button> </Link><p></p>
        </div>
    );
};

export default Home;


