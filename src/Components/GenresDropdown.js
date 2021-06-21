import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

function GenresDropdown({handleSelect}) {
  return (
    <DropdownButton id="dropdown-basic-button" title="Genres" onSelect={handleSelect}>
      <Dropdown.Item eventKey='Action'><Link to='genrePage' style={{textDecoration: 'none'}}>Action</Link></Dropdown.Item>
      <Link to='genrePage' style={{textDecoration: 'none'}}><Dropdown.Item eventKey='Comedy'>Comedy</Dropdown.Item></Link>
      <Link to='genrePage' style={{textDecoration: 'none'}}><Dropdown.Item eventKey='Drama'>Drama</Dropdown.Item></Link>
      <Link to='genrePage' style={{textDecoration: 'none'}}><Dropdown.Item eventKey='Romantic'>Romantic</Dropdown.Item></Link>
    </DropdownButton>
  );
}

export default GenresDropdown;
