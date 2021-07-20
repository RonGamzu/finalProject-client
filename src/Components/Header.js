import {
  Nav,
  Navbar
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import GenresDropdown from "./GenresDropdown";
import '../CSS/Header.css'
import { getAllGenres } from "../DAL/api";
import { useEffect, useState } from "react";

function Header({genres, connected, handleLogOut}) {
  console.log('from header', connected);
  // const [genres, setGenres] = useState('')
  // useEffect(async () => {
  //   const allGenres = await getAllGenres();
  //   setGenres(allGenres[0])
  //   console.log('get all genres for dropdown: ', allGenres);
  // }, [])
  return (
    <Navbar variant='light' bg="dark" expand="lg" className="text-warning">
      <Link to="/home">
        <Navbar.Brand
          style={{
            backgroundColor: "orange",
            fontWeight: "bold",
            padding: "5px",
          }}
        >
          Live in a movie
          <MdMovieCreation />
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle  aria-controls="basic-navbar-nav" className="m-3" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav id="mainNav" className="ml-auto twxt-warning">
      <GenresDropdown genres={genres}  />
          <Nav.Link className='navLink' as={Link} to="/allMovies">All Movies</Nav.Link>
          {!connected &&
            <>
          <Nav.Link as={Link} to={{pathname:'/logIn'}}>Log in</Nav.Link>
          <Nav.Link as={Link} to='/signUp'>Sign up</Nav.Link>
          </>
        }

          {connected &&(
            <>
          <Nav.Link as={Link} to='/myReviews'>My Reviews</Nav.Link>
          <Nav.Link as={Link} to='/addReview'>Add Review</Nav.Link>
          <Nav.Link as={Link} to='/addMovie'>Add Movie</Nav.Link>
          <Nav.Link as={Link} to='/signUp'>Profile</Nav.Link>
          <Nav.Link as={Link} onClick={handleLogOut} to=''>Log out</Nav.Link>
          
          <Nav.Link as={Link} to='/signUp' style={{color: 'white'}}>| Hi, {connected[0].user_name}</Nav.Link>
          </>
          )
          }
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
