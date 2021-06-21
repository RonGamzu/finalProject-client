import { Container, Card,  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function TopBox({ movies }) {
  return (
    <Container fluid className="row">
      {movies.map((movie, index) => {
          if (index < 4) {
            return <Card key={index} className="mx-auto my-3 p-0 col-lg-2 col-md-4 col-sm-6">
            <Card.Img variant="top" src= {movie.imgSrc} style={{height: '200px'}}/>
            <Card.Body>
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>
                {
                    movie.synopsis
                }
              </Card.Text>
              <Link to='reviewPage'>
              <Button variant="primary">See review</Button>
              </Link>
            </Card.Body>
          </Card>;   
          }
      })}
    </Container >
  );
}

export default TopBox;
