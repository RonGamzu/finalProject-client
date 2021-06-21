import { Form, Button } from "react-bootstrap";

export default function Profile({ genres }) {
  return (
    <Form className="mt-4" style={{ color: "white", width: "30%" }}>
      <h2 style={{ color: "orange" }}>Profile</h2>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>User name</Form.Label>
        <Form.Control value="Ron Gamzu" type="text" placeholder="User name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value="Ron@gmail.com"
          type="email"
          placeholder="Enter email"
        />
        <Form.Text>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" disabled />
      </Form.Group>
      <Form.Label>Genres you like:</Form.Label>
      <Form.Group>
        {genres.map((genre) => (
          <Form.Check
            inline
            key={genre}
            label={genre}
            name="group1"
            type="checkbox"
            // id={`inline-checkbox-1`}
          />
        ))}
      </Form.Group>

      <Button
        className="mt-5"
        style={{ display: "block" }}
        variant="primary"
        type="submit"
      >
        Update details
      </Button>
    </Form>
  );
}
