import { Button, Modal } from "react-bootstrap";

function DeleteModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Are you sure want to delete the review? 
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button type="button" class="btn btn-secondary" onClick={props.onHide}>Close</Button>
          <Button variant='danger' onClick={props.deleteReview}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default DeleteModal;