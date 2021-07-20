import { Col, Form, Row } from "react-bootstrap";

export default function MovieSearch({setSearchTerm}) {
  return (
    <Form style={{ color: "white", width: "100%" }}>
      <Row  className="justify-content-center">
        {/* <Col sm={12} xm={12}>
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
        </Col> */}
        <Col lg={5} sm={12} xm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search" onChange={(event)=> {setSearchTerm(event.target.value)}} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
