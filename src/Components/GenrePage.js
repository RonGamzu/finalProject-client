import { Container, Card, Button, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";

function GenrePage({ genre, movies }) {
  return (
    <>
      <Container  className="mt-4">
        <h2 style={{ color: "orange" }}>{genre}</h2>
        <Row>
          {movies.map((movie, index) => {
            if ('Action' === genre) {
              return (
                <Col lg={3} md={4} sm={12} xs={12} className='my-3 h-50'>
                  <MovieCard index={index} name={movie.movie_name} imgSrc={`https://pnay.org.il/productImages2/201/2017/05/30/image1496137054.jpg`} synopsis={movie.synopsis.slice(0,50) + '...'}/>
                // </Col>
              );
            }
          })}
        </Row>
      </Container>
    </>
  );
}

export default GenrePage;
