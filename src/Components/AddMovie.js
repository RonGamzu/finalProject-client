import { Col, Form, Row, Button, Container } from "react-bootstrap";
import "../CSS/AddReview.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import { ifMovieExists, postData } from "../DAL/api";
import AddMovieError from "./AddMovieError";
import "../CSS/AddMovie.css";

export default function AddMovie({
  getMoviesData,
  genres,
  connected,
  handleSignUp,
}) {
  const initialValues = {
    movieName: "",
    coverUrl: "",
    synopsis: "",
    trailer: "",
    genres: [],
  };
  const validationSchema = Yup.object({
    movieName: Yup.string()
      .max(50, "Max characters is 50")
      .required("Required"),
    coverUrl: Yup.string().url().required("Required"),
    synopsis: Yup.string()
      .max(500, "Max characters is 500")
      .required("Required"),
    trailer: Yup.string()
      .matches(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
        "YouTube url is required"
      )
      .required("Required"),
    // genres: Yup.number().required("Required"),
    genres: Yup.array()
      .required("genre is required")
      .min(1, "Please pick at least 1 genre"),
  });

  const [submitError, setSubmitError] = useState(null);
  const [movieExists, setMovieExists] = useState(true);
  const [movieExistsError, setMovieExistsError] = useState(false);
  console.log("connected", connected);

  const checkMovieName = async (name) => {
    if (name !== "") {
      const movie = await ifMovieExists(name);
      console.log("PKKK666", movie[0].length);
      if (movie[0].length === 0) {
        setMovieExists(false);
        setMovieExistsError(false);
      } else {
        setMovieExists(!!movie[0][0]);
        setMovieExistsError(true);
      }
      console.log(movie[0]);
      return movie[0][0];
    } else {
      setMovieExists(true);
      setMovieExistsError(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { id: userId } = connected[0];
      console.log("submit!");
      const movieId = await postData("http://localhost:3100/movies", {
        ...values,
        userId,
      });
      console.log("AddMovie xdxxdxdxd: ", movieId);
      if (!movieId.length) {
        console.log("not find user!!!");
        setSubmitError("Email is already exists");
      } else {
        getMoviesData();
        setSubmitError(null);
      }
    },
  });
  console.log("AddMovie formik values: ", formik.values);
  // console.log('**********************', formik.values.coverUrl);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form className="mt-5 form-container" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">
              Add new movie
            </h2>
            <Row className="justify-content-center">
              <Col lg={11}>
                <Form.Group>
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="movieName"
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      checkMovieName(formik.values.movieName);
                    }}
                    onChange={formik.handleChange}
                    placeholder="name"
                  />
                  {formik.touched.movieName && formik.errors.movieName ? (
                    <ErrorMessage message={formik.errors.movieName} />
                  ) : null}
                  {movieExistsError && (
                    <ErrorMessage message={"Movie already exists"} />
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={11}>
                <Form.Group>
                  <Form.Label>Movie cover url</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverUrl"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Image url"
                    disabled={movieExists}
                  />
                  {formik.touched.coverUrl && formik.errors.coverUrl ? (
                    <ErrorMessage message={formik.errors.coverUrl} />
                  ) : null}
                </Form.Group>
                {/* <Form.Group>
        <Form.File id="exampleFormControlFile1" label="pick movie cover" />
      </Form.Group> */}
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={11}>
                <Form.Label>Genres:</Form.Label>
                <Form.Group>
                  {genres.map((genre, index) => (
                    <Form.Check
                      inline
                      key={genre.name}
                      label={genre.name}
                      value={genre.id}
                      name="genres"
                      type="checkbox"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      disabled={movieExists}
                      // id={`inline-checkbox-1`}
                    />
                  ))}
                  {formik.touched.genres && formik.errors.genres ? (
                    <ErrorMessage message={formik.errors.genres} />
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
                  <Form.Label>Movie synopsis</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="synopsis"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    disabled={movieExists}
                    rows={3}
                  />
                  {formik.touched.synopsis && formik.errors.synopsis ? (
                    <ErrorMessage message={formik.errors.synopsis} />
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={11}>
                <Form.Group>
                  <Form.Label>Trailer url</Form.Label>
                  <Form.Control
                    type="text"
                    name="trailer"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    disabled={movieExists}
                    placeholder="YouTube video url"
                  />
                  {formik.touched.trailer && formik.errors.trailer ? (
                    <ErrorMessage message={formik.errors.trailer} />
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={11}>
                <Button
                variant='warning'
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Add Movie
                </Button>
              </Col>
            </Row>
            {/* <label for="basic-url" class="form-label">
        Trailer URL
      </label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3">
          https://example.com/users/
        </span>
        <input
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
