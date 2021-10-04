import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { getAllMoviesOfGenre } from "../DAL/api";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";

function GenrePage({ genres, movies }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { genreId } = useParams();
  const [genreMovies, setGenreMovies] = useState([]);
  useEffect(async () => {
    const moviesOfGenre = await getAllMoviesOfGenre(genreId);
    setGenreMovies(moviesOfGenre[0]);
  }, [genreId]);
  return (
    <>
      {genres && (
        <Container>
          <h2 className='text-center my-5' style={{ color: "orange" }}>
            {genres
              .filter((genre) => genre.id == genreId)
              .map((genreName) => genreName.name)}
          </h2>
          <MovieSearch setSearchTerm={setSearchTerm} /> 
          <Row className='mt-5'>
            {genreMovies.filter((movie) => {
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
                    id={movie.id}
                    index={index}
                    name={movie.movie_name}
                    imgSrc={movie.image_path}
                    synopsis={movie.synopsis}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
}

export default GenrePage;
