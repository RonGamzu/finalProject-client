import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../CSS/SignUp.css";
import * as Yup from "yup";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router";
import { getUserFavorites, putData } from "../DAL/api";
import Cookies from "js-cookie";

export default function SignUp({ connected, genres, handleSignUp, readCookie }) {
  let history = useHistory();
  function handleClick() {
    history.push("/home");
  }
  console.log("log from signUp: ", connected);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(5, "User name must be at least 5 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("Required"),
  });

  const [submitError, setSubmitError] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: connected ? connected[0].user_name : "",
      email: connected ? connected[0].email : "",
      password: connected ? connected[0].password : "",
      confirmPassword: connected ? connected[0].password : "",
      genres: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!connected) {
        const submit = await handleSignUp(values);
        if (!submit.length) {
          console.log("not find user!!!");
          setSubmitError("Email already exists");
        } else {
          setSubmitError(null);
          handleClick();
        }
      } else {
        const updatedDetails = await putData(
          "http://localhost:3100/signUp/update",
          values
        );
        console.log('updatedDetails PROFILE: ', updatedDetails);
        Cookies.set("user",  updatedDetails[0]);
        readCookie();
        handleClick();
      }
    },
  });

  const [userFavorites, setUserFavorites] = useState([]);
  useEffect(async () => {
    if (connected) {
      const favoritesGenres = await getUserFavorites(connected[0].id);
      setUserFavorites(favoritesGenres[0]);
    }
  }, []);

  console.log("formik values", formik.values);
  console.log("genressssss", genres);
  console.log("O.K now i connected", connected);

  return (
    <Container fluid>
      <Form className="mt-4" onSubmit={formik.handleSubmit}>
        {connected ? (
          <h2 className="text-center" style={{ color: "orange" }}>
            Profile
          </h2>
        ) : (
          <h2 className="text-center" style={{ color: "orange" }}>
            Sign up
          </h2>
        )}
        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className='bold'>User name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userName}
                placeholder="User name"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <ErrorMessage message={formik.errors.userName} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='bold'>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter email"
                disabled={!!connected}
              />
              <Form.Text>
                We'll never share your email with anyone else.
              </Form.Text>
              {formik.touched.email && formik.errors.email ? (
                <ErrorMessage message={formik.errors.email} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className='bold'>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <ErrorMessage message={formik.errors.password} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            <Form.Group controlId="formBasicRepeatPassword">
              <Form.Label className='bold'>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <ErrorMessage message={formik.errors.confirmPassword} />
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        {!connected && (
          <Row className="justify-content-center">
            <Col lg={4} xm={6}>
              <Form.Label className='bold'>Genres you like:</Form.Label>
              <Form.Group role="group" aria-labelledby="checkbox-group">
                {genres.map((genre, index) => (
                  <Form.Check
                    // checked={userFavorites.map(item => item.genre_id).includes(genre.id) ? true : false}
                    defaultChecked={
                      userFavorites
                        .map((item) => item.genre_id)
                        .includes(genre.id)
                        ? true
                        : false
                    }
                    inline
                    key={genre.name}
                    label={genre.name}
                    value={genre.id}
                    name="genres"
                    type="checkbox"
                    // onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // id={`inline-checkbox-1`}
                  />
                ))}
              </Form.Group>
            </Col>
          </Row>
        )}
        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            {submitError && <div style={{ color: "red" }}>{submitError}</div>}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} xm={6}>
            {connected ? (
              <Button
                className="mt-5"
                style={{ display: "block" }}
                variant="primary"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Update details
              </Button>
            ) : (
              <Button
                className="mt-5"
                style={{ display: "block" }}
                variant="primary"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
