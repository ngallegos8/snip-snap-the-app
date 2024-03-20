import {Link, useParams} from "react-router-dom";

function NavBar(){
    return(
     <div>
        <nav clasname="navbar">
            <Link to="/">  Home    </Link>
            
            <Link to="/User">  User    </Link>

            <Link to="/signup"> Create Account </Link>

            <Link to="/login"> Login  </Link>

            
            
        </nav>
     </div>


    )


}
export default NavBar
