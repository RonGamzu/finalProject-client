import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "../CSS/AddReview.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import { getReviewById, ifMovieExists, postData, putData } from "../DAL/api";
import AddMovieError from "./AddMovieError";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels = {
1: '',
2: '',
3: '',
4: '',
5: ''
};

export default function EditReview({ connected, handleAddReview }) {
  const [hover, setHover] = useState(-1);

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
    rating: '',
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
  //   useEffect(async () => {
  //     initialValues.movieName = reviewDetails ? reviewDetails.movie_name : ''
  //     initialValues.title = reviewDetails ? reviewDetails.title : ''
  //     initialValues.review = reviewDetails ? reviewDetails.review : ''
  //     initialValues.rating = reviewDetails ? reviewDetails.rating : ''

  //   }, [reviewDetails]);

  console.log("EDIT REVIEW the firstt: ", review);

  //   const initialValues = {
  //     movieName: '',
  //     title: '',
  //     review: '',
  //     rating: '',
  //   };
  ///////////////////////////////////////////
  // const initialValues = {
  //   enableReinitialize: true,
  //   movieName: review.movie_name,
  //   title: review.title,
  //   review: review.review_body,
  //   rating: review.rating,
  // };
  /////////////////////////////////////////
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
    <Container fluid>
      <Form className="mt-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-center" style={{ color: "orange" }}>Edit Review</h2>
        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
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
          <Col lg={4} xm={6}>
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
          <Col lg={4} xm={6}>
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
          <Col lg={4} xm={6}>
            <Form.Group controlId="formGridState">
              <Form.Label style={{display: 'block'}}>Rate</Form.Label>
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
                <Box ml={2}>{labels[hover !== -1 ? hover : formik.values.rating]}</Box>
              )}

              {/* <select
                defaultChecked={review.rating}
                name="rating"
                class="custom-select"
                id="inputGroupSelect01"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.rating}
              >
                <option disabled>stars</option>

                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select> */}
              {/* /////////////////////////////////// */}
              {/* <RangeSlider
                // value={value}
                // onChange={(changeEvent) => setValue(changeEvent.target.value)}
                onChange={(changeEvent) => {formik.handleChange();setValue(changeEvent.target.value)}}
                onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                value={formik.values.rating}
                name="rating"
                min="1"
                max="5"
              /> */}
              {formik.touched.rating && formik.errors.rating ? (
                <ErrorMessage message={formik.errors.rating} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Update Review
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
