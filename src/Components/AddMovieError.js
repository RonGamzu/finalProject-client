import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddMovieError() {
    return(
        <span>
            The movie doesn't exist in our site. you can <Link to='/addMovie' style={{color: 'orange'}}><span>add new movie here</span></Link> 
            {/* this movie not exists in the site. you can <span>add new movie here</span>  */}
        </span>
    )
}

export default AddMovieError;
