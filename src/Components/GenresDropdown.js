import { NavDropdown, DropdownButton, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function GenresDropdown({ genres }) {
  return (
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
