import { Form, Button } from "react-bootstrap";

export default function LogIn(params) {
  return (
    <Form className="mt-4" style={{ color: "white", width: "30%" }}>
      <h2 style={{ color: "orange" }}>Log in</h2>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
