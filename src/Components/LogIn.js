import { useFormik } from "formik";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../CSS/LogIn.css";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

// let location = useLocation();
// const { handleLogIn} = location.state;

// const onSubmit = (values) => {
//   console.log("submit!", values);
//   handleLogIn(values)
// };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Required"),
});

export default function LogIn({ handleLogIn }) {
  const [submitError, setSubmitError] = useState(null);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("submit!", values);
      let submit;
      handleLogIn(values).then((response) => (submit = response));
      console.log("sariii", submit);
      if (!submit.length) {
        console.log("not find user!!!");
        setSubmitError("Email or password are incorect");
      } else {
        setSubmitError(null);
      }
    },
  });

  console.log("formik errors", formik.errors);
  return (
    <Form className="myForm mt-4" onSubmit={formik.handleSubmit}>
      <h2 style={{ color: "orange" }}>Log in</h2>
      <Row>
        <Col lg={4} sm={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4} sm={6}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
      {submitError && (
        <Row>
          <Col lg={4} xm={6}>
            <div style={{ color: "red" }}>{submitError}</div>
          </Col>
        </Row>
      )}
      <Row>
        <Col lg={4} xm={6}>
          <Button
            variant="primary"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
