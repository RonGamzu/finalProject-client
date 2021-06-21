import { Form } from "react-bootstrap";

export default function MovieSearch(params) {
  return (
    <Form style={{ color: "white", width: "30%" }}>
      <Form.Label>Show me:</Form.Label>
      <Form.Group>
      <Form.Check
        inline
        label="The newst"
        name="group1"
        type='radio'
        // id={`inline-${type}-1`}
      />
      <Form.Check
        inline
        label="Most popular"
        name="group1"
        type='radio'
        // id={`inline-${type}-2`}
      />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}
