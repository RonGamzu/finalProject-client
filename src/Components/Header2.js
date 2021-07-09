import {
  Nav,
  Navbar,
  Container,
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import GenresDropdown from "./GenresDropdown";
import '../CSS/Header2.css'

function Header2({ connected, handleSelect, handleLogOut}) {
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
      <GenresDropdown handleSelect={handleSelect} />
          <Nav.Link className='navLink' as={Link} to="allMovies">All Movies</Nav.Link>
          {!connected &&
            <>
          <Nav.Link as={Link} to={{pathname:'/logIn'}}>Log in</Nav.Link>
          <Nav.Link as={Link} to='signUp'>Sign up</Nav.Link>
          </>
        }

          {connected &&(
            <>
          <Nav.Link as={Link} to='myReviews'>myReviews</Nav.Link>
          <Nav.Link as={Link} to='/addReview'>addReview</Nav.Link>
          <Nav.Link as={Link} to='addMovie'>addMovie</Nav.Link>
          <Nav.Link as={Link} to='profile'>profile</Nav.Link>
          <Nav.Link as={Link} onClick={handleLogOut} to=''>Log out</Nav.Link>
          </>
          )
          }
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header2;
