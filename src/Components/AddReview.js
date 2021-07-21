import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "../CSS/AddReview.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import { getReviewById, ifMovieExists, postData } from "../DAL/api";
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

// const useStyles = makeStyles({
//   root: {
//     width: 200,
//     display: "flex",
//     alignItems: "center",
//   },
// });

export default function AddReview({ connected, handleAddReview }) {
  const [hover, setHover] = useState(-1);
  let history = useHistory();
  function handleClick() {
    history.push("/myReviews");
  }
  const initialValues = {
    movieName: "",
    title: "",
    review: "",
    rating: 5,
  };
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
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { id: movieId } = movieExists;
      const { id: userId } = connected[0];
      console.log("movieId: ", movieId, ".//////userId: ", userId);
      const submit = await postData("http://localhost:3100/reviews", {
        ...values,
        movieId,
        userId,
      });
      console.log("DELETE Review WOWWWWW: ", submit);
        console.log('handleClick();');
        handleClick();
    },
  });
  console.log("review formik values: ", formik.values);
  return (
    <Container >
      <Row className="justify-content-center">
        <Col lg={6}>
      <Form className="mt-4 form-container" onSubmit={formik.handleSubmit}>
        <h2 className="text-center" style={{ color: "orange" }}>
          Add new review
        </h2>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Form.Group>
              <Form.Label>Movie</Form.Label>
              <Form.Control
                type="text"
                name="movieName"
                onBlur={(e) => {
                  formik.handleBlur(e);
                  checkMovieName(formik.values.movieName);
                }}
                onChange={formik.handleChange}
                value={formik.values.movieName}
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
          <Col lg={8}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Review title"
                disabled={!movieExists}
              />
              {formik.touched.title && formik.errors.title ? (
                <ErrorMessage message={formik.errors.title} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
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
                rows={4}
                disabled={!movieExists}
              />
              {formik.touched.review && formik.errors.review ? (
                <ErrorMessage message={formik.errors.review} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
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
                name="rating"
                class="custom-select"
                id="inputGroupSelect01"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={!movieExists}
              >
                <option disabled selected>
                  stars
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
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
          <Col lg={8}>
            <Button variant='warning' type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Add Review
            </Button>
          </Col>
        </Row>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}
