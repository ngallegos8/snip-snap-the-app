import React from 'react';
import {Link, useParams} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Welcome to View Party!</h1>
            <h2>I am a </h2>
            <Link to="/signup/user"> <button >User</button> </Link><p></p>
            <Link to="/signup/venue">   <button>Vender</button>    </Link>
            <Link to="/login/user"> <button >User Login</button> </Link><p></p>
            <Link to="/login/venue">   <button>Vender Login</button>    </Link>
        </div>
    );
};

export default Home;


