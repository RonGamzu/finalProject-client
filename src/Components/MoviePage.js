import { useEffect, useState } from "react";
import { Accordion, Container, Card, Row, Col, Button } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router";
import { getMovieDetails, getMovieImage, getMovieReviews } from "../DAL/api";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

export default function MoviePage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieImage, setMovieImage] = useState(null);
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(async () => {
    getMovieDetails(id).then((response) => {
      console.log("ISRAELA", response);
      setMovieDetails(response[0][0]);
    });
    getMovieImage(id).then((response) => setMovieImage(response[0][0]));
    getMovieReviews(id).then((response) => setMovieReviews(response[0]));
  }, []);

  // const commentOwner = async () =>{

  // }
  // console.log('MAMAMAIYAAA', movieDetails.trailer_url);
  const VideoOpts = {
    height: "400px",
    width: "350px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div>
      {movieReviews && movieImage && movieDetails ? (
        <Container className="mb-4 mt-4">
          <Row>
            <Col lg={4} md={12} sm={12} xs={12}>
              <YouTube
                videoId={movieDetails.trailer_url.split("v=")[1].split("&")[0]}
                opts={VideoOpts}
              />
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <div className="text-center" style={{ wordBreak: "break-all" }}>
                <h2 style={{ color: "orange" }}>
                  {/* {movieDetails && movieDetails.movie_name} */}
                  {movieDetails.movie_name}
                </h2>
                <p style={{ color: "white" }}>
                  {/* {movieDetails && movieDetails.synopsis} */}
                  {movieDetails.synopsis}
                </p>
              </div>
            </Col>
            <Col lg={4} md={4} className="d-flex justify-content-end">
              <img
                style={{ height: "400px", width: "350px", objectFit: "cover" }}
                className="d-none d-lg-block"
                src={movieImage.image_path}
              ></img>
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to={`/addReview/${movieDetails.movie_name}`}>
                <Button className="mb-3" variant="warning" type="submit">
                  Add Review
                </Button>
              </Link>
              {movieReviews.length > 0 ? (
                <Accordion defaultActiveKey="0" style={{ cursor: "pointer" }}>
                  {movieReviews.map((review, index) => {
                    return (
                      <Card>
                        <Accordion.Toggle
                          className="d-flex justify-content-between"
                          as={Card.Header}
                          eventKey={index + 1}
                        >
                          <div>{review.title}</div>
                          <div>
                            {Array(review.rating)
                              .fill(review.rating)
                              .map(() => (
                                <BsFillStarFill style={{ color: "#ffb400" }} />
                              ))}
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index + 1}>
                          <Card.Body>
                            <p>
                              By: {review.user_name} <br /> post on:{" "}
                              {review.post_date.split("T")[0]}
                            </p>
                            <br />
                            {review.review_body}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  })}
                </Accordion>
              ) : (
                <h2>No reviews yet</h2>
              )}
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
}
