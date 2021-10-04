import { useFormik } from "formik";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "../CSS/LogIn.css";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Required"),
});

export default function LogIn({ handleLogIn }) {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
  const [submitError, setSubmitError] = useState(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const submit = await handleLogIn(values);
      if (!submit.length) {
        setSubmitError("Email or password are incorect");
      } else {
        setSubmitError(null);
        handleClick();
      }
    },
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form className=" mt-5 form-container" onSubmit={formik.handleSubmit}>
            <h2 className="text-center" style={{ color: "orange" }}>
              Log in
            </h2>
            <Row className="mt-3 justify-content-center">
              <Col lg={11}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="bold">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter email"
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
              <Col lg={11}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="bold">Password</Form.Label>
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
              <Col lg={11}>
                {submitError && (
                  <div style={{ color: "red" }}>{submitError}</div>
                )}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={11}>
                <Button
                  variant="warning"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
