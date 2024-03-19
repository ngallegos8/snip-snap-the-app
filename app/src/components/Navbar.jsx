import {Link, useParams} from "react-router-dom";

function NavBar(){
    return(
     <div>
        <nav clasname="navbar">
            <Link to="/">  Home    </Link>
            
            <Link to="/User">  User    </Link>
            
            <Link to="/Event">  Event    </Link>
            
            <Link to="/Venue">  Venue    </Link>

            <Link to="/signup/user">  Create Account    </Link>

            <Link to="/signup/venue">   Create Venue    </Link>

            <Link to="/login/user">  User Login    </Link>

            <Link to="/login/venue">   Venue Login    </Link>
            
            
        </nav>
     </div>


    )


}
export default NavBar
