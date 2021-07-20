import { Container, Card,  Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function TopBox({ movies }) {
  return (
    <Container >
      <Row>
      {movies.map((movie, index) => {
          if (index < 4) {
            return (
        <Col lg={3} md={4} sm={12} xs={12} className="my-3">
          <MovieCard index={index} id={movie.id} name={movie.movie_name} imgSrc={movie.image_path} synopsis={movie.synopsis}></MovieCard>
          </Col>);   
          }
      })}
      </Row>
    </Container >
  );
}

export default TopBox;
