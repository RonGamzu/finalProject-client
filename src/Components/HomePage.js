import TopBox from "./TopBox";
import "../CSS/HomePage.css";
import MovieSearch from "./MovieSearch";
import { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage({ movies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    setOptions(movies);
  }, [movies, options]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  const setMovieDex = (movie) => {
    setSearch(movie);
    setDisplay(false);
  };
  return (
    <>
      <div className="HomePageBackGround">
<Row className='m-auto'>
    <Col lg={12} className='homePageMovieSearch' id='homeSearch'>
    <Form ref={wrapperRef} className="w-50 m-auto justify-content-center searchbox align-middle">
        <Form.Control
          type="search"
          placeholder="Search for a movie"
          aria-label="Search"
          // className="mr-2 w-100 "
          className="mr-2"
          onClick={() => setDisplay(!display)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {display && search != "" && (
          <div className="bg-white text-dark w-100 mr-2 border">
            {options
              .filter((movie) => movie.movie_name.toLowerCase().indexOf(search.toLowerCase()) > -1)
              .map((movie, index) => {
                return (
                  <Link to={`/moviePage/${movie.id}`}>
                    <div
                    style={{fontWeight: 'bold', paddingLeft: '10px'}}
                      onClick={() => setMovieDex(movie.movie_name)}
                      key={index}
                      tabIndex="0"
                    >
                      <span style={{textDecoration: 'none'}} className="text-dark">{movie.movie_name}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </Form>
    </Col>
</Row>
      </div>
      <h2 className="text-center my-3" style={{ color: "orange" }}>
        New Movies
      </h2>
      <TopBox movies={movies} />
    </>
  );
}

export default HomePage;
