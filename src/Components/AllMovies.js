import { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";

export default function AllMovies({ movies }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center my-5" style={{ color: "orange" }}>
          All The Movies
        </h2>
        <MovieSearch setSearchTerm={setSearchTerm} /> 
        <Row fluid className="d-flex mt-5">
          {movies
            .filter((movie) => {
              if (searchTerm == "") {
                return movie;
              } else if (
                movie.movie_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return movie;
              }
            })
            .map((movie, index) => {
              return (
                <Col lg={4} md={4} sm={12} xs={12} className="my-3 h-50">
                  <MovieCard
                    index={index}
                    id={movie.id}
                    name={movie.movie_name}
                    // imgSrc={`https://pnay.org.il/productImages2/201/2017/05/30/image1496137054.jpg`}
                    imgSrc={movie.image_path}
                    synopsis={movie.synopsis}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}
