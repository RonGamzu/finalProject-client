import { Form } from "react-bootstrap";

export default function AddMovie({ genres }) {
  return (
    <Form className="mt-4" style={{ color: "white", width: "30%" }}>
      <h2 style={{ color: "orange" }}>Add new movie</h2>
      <Form.Group>
        <Form.File id="exampleFormControlFile1" label="pick movie cover" />
      </Form.Group>
      <Form.Label>Genres:</Form.Label>
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
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Movie synopsis</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <label for="basic-url" class="form-label">
        Trailer URL
      </label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3">
          https://example.com/users/
        </span>
        <input
          type="text"
          class="form-control"
          id="basic-url"
          aria-describedby="basic-addon3"
        />
      </div>
    </Form>
  );
}
