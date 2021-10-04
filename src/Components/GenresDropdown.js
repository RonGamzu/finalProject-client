import { NavDropdown, DropdownButton, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function GenresDropdown({ genres }) {
  return (
    // <Nav onSelect={handleSelect}>
    //   <NavDropdown title="Genres" id="basic-nav-dropdown">
    //     <NavDropdown.Item as={Link} to="/genrePage" eventKey="Action">
    //       Action
    //     </NavDropdown.Item>
    //     <NavDropdown.Item as={Link} to="/genrePage" eventKey="Comedy">
    //       Comedy
    //     </NavDropdown.Item>
    //     <NavDropdown.Item as={Link} to="/genrePage" eventKey="Drama">
    //       Drama
    //     </NavDropdown.Item>
    //     <NavDropdown.Item as={Link} to="/genrePage" eventKey="Romantic">
    //       Romantic
    //     </NavDropdown.Item>
    //   </NavDropdown>
    // </Nav>
    <div>
    {genres &&( 
    <Nav>
      <NavDropdown title="Genres" id="basic-nav-dropdown">
        {genres.map((genre, index) => {
          return (
            <NavDropdown.Item as={Link} to={`/genrePage/${genre.id}`} eventKey={genre.name}>
              {genre.name}
            </NavDropdown.Item>
          );
        })}
      </NavDropdown>
    </Nav>
    )
  }
</div>
  );
}

export default GenresDropdown;
