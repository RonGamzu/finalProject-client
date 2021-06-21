import {
  Nav,
  Navbar,
  Container,
  Button,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import GenresDropdown from "./GenresDropdown";

function Header({ connected, handleSelect }) {
  return (
    <Navbar bg="dark" collapseOnSelect expand="lg">
      <Container fluid>
        {/* <div style={{ height: "40px" }}> */}
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
        {/* <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-warning">Search</Button>
        </Form> */}


        <InputGroup  style= {{width: '30%'}}>
    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    <FormControl
    
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>



        <GenresDropdown handleSelect={handleSelect} />
        {/* </div> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            {!connected && (
              <div>
                <Link
                  to="allMovies"
                  className="mx-2"
                  style={{ color: "white" }}
                >
                  <Button variant="warning">All movies</Button>
                </Link>
                <Link to="logIn" className="mx-2" style={{ color: "white" }}>
                  <Button variant="success">Log in</Button>
                </Link>
                <Link to="signUp" style={{ color: "white" }}>
                  <Button variant="light">Sign up</Button>
                </Link>
              </div>
            )}
            {connected && (
              <div className='d-flex justify-content-end flex-column flex-md-row'>
                <Nav.Link
                  as={Link}
                  to="allMovies"
                  // className="mx-1"
                  style={{ color: "white" }}
                >
                  <Button variant="warning" >All movies</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="myReviews" style={{ color: "white" }}>
                  <Button variant="warning">My reviews</Button>
                </Nav.Link>
                <Nav.Link
                as={Link}
                  to="/addReview"
                  style={{ color: "white" }}
                >
                  <Button variant="warning">Add review</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="addMovie" style={{ color: "white" }}>
                  <Button variant="warning">Add movie</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="profile" style={{ color: "white" }}>
                  <Button variant="warning">Profile</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  <Button variant="secondary">Log out</Button>
                </Nav.Link>
              </div>
            )}
            {/* {connected && (
              <p style={{ color: "white", margin: "5px", width: "60px" }}>
                Hi Ron!
              </p>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
