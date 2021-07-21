import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "../CSS/AddReview.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import { getReviewById, ifMovieExists, deleteData, putData } from "../DAL/api";
import AddMovieError from "./AddMovieError";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import DeleteModal from "./DeleteModal";
import "../CSS/EditReview.css";


const labels = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
};

export default function EditReview({ connected, handleAddReview }) {
  const [hover, setHover] = useState(-1);
  const [modalShow, setModalShow] = useState(false);

  let history = useHistory();
  function handleClick() {
    history.push("/myReviews");
  }
  const { id } = useParams();
  console.log("reviewId! @# ", id);
  const [review, setReview] = useState({
    movie_name: "",
    title: "",
    review_body: "",
    rating: "",
  });
  //   const [reviewDetails, setReviewDetails] = useState({});
  useEffect(() => {
    const callApi = async () => {
      console.log("reviewId! @# ", id);
      const reviewDetails = await getReviewById(id);
      //   setReviewDetails(r[0][0]);
      setReview(reviewDetails[0][0]);
      console.log("EDIT REVIEW: ", review);
    };
    callApi();
  }, []);

  const deleteReview = async () => {
    const ok = await deleteData("http://localhost:3100/reviews", { id: id });
    console.log("that what i delete: ", ok);
    handleClick();
  };

  console.log("EDIT REVIEW the firstt: ", review);

  const validationSchema = Yup.object({
    movieName: Yup.string().required("Required"),
    title: Yup.string().max(45, "Max characters is 45").required("Required"),
    review: Yup.string().max(500, "Max characters is 500").required("Required"),
    rating: Yup.number().required("Required"),
  });

  const [submitError, setSubmitError] = useState(null);
  const [movieExists, setMovieExists] = useState(false);
  const [movieExistsError, setMovieExistsError] = useState(false);

  const checkMovieName = async (name) => {
    if (name !== "") {
      const movie = await ifMovieExists(name);
      if (movie[0].length > 0) {
        setMovieExists(movie[0][0]);
        setMovieExistsError(false);
      } else {
        setMovieExists(false);
        setMovieExistsError(true);
      }
      console.log(movie[0]);
      return movie[0][0];
    } else {
      setMovieExistsError(false);
      setMovieExists(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      movieName: review?.movie_name || "",
      title: review?.title || "",
      review: review?.review_body || "",
      rating: review?.rating || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { id: movieId } = movieExists;
      const { id: userId } = connected[0];
      console.log("movieId: ", movieId, ".//////userId: ", userId);
      const submit = await putData("http://localhost:3100/reviews/update", {
        ...values,
        movieId,
        userId,
        reviewId: id,
      });
      console.log("AddReview WOWWWWW: ", submit);
      if (!submit.length) {
        console.log("not find user!!!");
        setSubmitError("error");
      } else {
        setSubmitError(null);
        handleClick();
      }
    },
  });
  console.log("EDITreview formik values: ", formik.values);
  return (
    <Container>
          <Row className="justify-content-center">
        <Col lg={6}>
      <Form className="mt-5 form-container" onSubmit={formik.handleSubmit}>
        <h2 className="text-center">
          Edit Review
        </h2>
        <Row className="justify-content-center">
          <Col lg={11} >
            <Form.Group>
              <Form.Label>Movie</Form.Label>
              <Form.Control
                disabled={true}
                type="text"
                name="movieName"
                onBlur={(e) => {
                  formik.handleBlur(e);
                  checkMovieName(formik.values.movieName);
                }}
                onChange={formik.handleChange}
                value={formik.values.movieName}
                // defaultValue={review.movie_name}
                placeholder="movie name"
              />
              {formik.touched.movieName && formik.errors.movieName ? (
                <ErrorMessage message={formik.errors.movieName} />
              ) : null}
              {movieExistsError && <AddMovieError />}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                // defaultValue={review.title}
                placeholder="Review title"
              />
              {formik.touched.title && formik.errors.title ? (
                <ErrorMessage message={formik.errors.title} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.review}
                // defaultValue={review.review_body}
                rows={4}
              />
              {formik.touched.review && formik.errors.review ? (
                <ErrorMessage message={formik.errors.review} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Form.Group controlId="formGridState">
              <Form.Label style={{ display: "block" }}>Rate</Form.Label>
              <Rating
                name="rating"
                value={formik.values.rating}
                precision={1}
                onChange={formik.handleChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {formik.values.rating !== null && (
                <Box ml={2}>
                  {labels[hover !== -1 ? hover : formik.values.rating]}
                </Box>
              )}
              {formik.touched.rating && formik.errors.rating ? (
                <ErrorMessage message={formik.errors.rating} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11}>
            <Button  type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Update Review
            </Button>
            {/* <Button className="ml-3" variant="danger" onClick={deleteReview}>
              Delete Review
            </Button> */}
            <Button className="ml-3" variant="danger" onClick={() => setModalShow(true)}>
              Delete Review
            </Button>
            <DeleteModal show={modalShow} deleteReview={deleteReview} onHide={() => setModalShow(false)} />
          </Col>
        </Row>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}
