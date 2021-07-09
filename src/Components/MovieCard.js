import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ index, name, imgSrc, synopsis }) {
  // <Col lg={3} md={4} sm={12} xs={12} className='my-3 h-50'>
  return (
    <Card key={index} className="p-0 w-75">
      <Card.Img variant="top" src={imgSrc} fluid />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{synopsis}</Card.Text>
        <Link to="reviewPage">
          <Button variant="primary">See review</Button>
        </Link>
      </Card.Body>
    </Card>
  );
  //   </Col>;
}

export default MovieCard;
