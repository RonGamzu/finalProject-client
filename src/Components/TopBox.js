import { Container, Card,  Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function TopBox({ movies }) {
  return (
    <Container fluid>
      <Row>
      {movies.map((movie, index) => {
          if (index < 4) {
            return (
        <Col lg={3} md={4} sm={12} xs={12} className="my-3">
          <MovieCard index={index} name={movie.movie_name} imgSrc={`https://pnay.org.il/productImages2/201/2017/05/30/image1496137054.jpg`} synopsis={movie.synopsis.slice(0,50)+ "..."}></MovieCard>
          </Col>);   
          }
      })}
      </Row>
    </Container >
  );
}

export default TopBox;
