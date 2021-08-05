import { Col, Form, Row } from "react-bootstrap";

export default function MovieSearch({setSearchTerm}) {
  return (
    <Form style={{ color: "white", width: "100%" }}>
      <Row  className="justify-content-center">
        <Col className='homePageMovieSearch' lg={5} sm={12} xm={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search" onChange={(event)=> {setSearchTerm(event.target.value)}} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
