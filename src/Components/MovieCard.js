import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ index, name, imgSrc, synopsis, id }) {
  // <Col lg={3} md={4} sm={12} xs={12} className='my-3 h-50'>
  return (
    <Card key={index} className="p-0 w-75 mx-auto" style={{height: '450px', position: 'relative'}}>
      <Card.Img variant="top" src={imgSrc} fluid height='250px' style={{objectFit: 'cover'}} />
      <Card.Body height='200px'>
        <Card.Title>{name.length > 20 ? name.slice(0,20) + "..." : name}</Card.Title>
        <Card.Text>{synopsis.slice(0,45)+ "..."}</Card.Text>
        <Link to={`/moviePage/${id}`}>
          <Button style={{position: 'absolute', bottom: '20px'}} className='mb-0' variant="warning">See review</Button>
        </Link>
      </Card.Body>
    </Card>
  );
  //   </Col>;
}

export default MovieCard;
