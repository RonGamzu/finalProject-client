import { useState } from "react";
import { Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function AddReview(params) {
  const [value, setValue] = useState(0);

  return (
    <Form className="mt-4" style={{ color: "white", width: "30%" }}>
      <h2 style={{ color: "orange" }}>Add new review</h2>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>review</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formBasicRange">
        <Form.Label>Rate</Form.Label>
        <RangeSlider
          value={value}
          onChange={(changeEvent) => setValue(changeEvent.target.value)}
          min= '1'
          max = '5'
        />
      </Form.Group>
    </Form>
  );
}
