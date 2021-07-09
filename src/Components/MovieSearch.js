import { Col, Form, Row } from "react-bootstrap";

export default function MovieSearch(params) {
  return (
    <Form style={{ color: "white", width: "60%" }}>
      <Row>
        <Col sm={12} xm={12}>
          <Form.Label>Show me:</Form.Label>
          <Form.Group>
            <Form.Check
              inline
              label="The newst"
              name="group1"
              type="radio"
              // id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="Most popular"
              name="group1"
              type="radio"
              // id={`inline-${type}-2`}
            />
          </Form.Group>
        </Col>
        <Col sm={12} xm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col sm={12} xm={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
