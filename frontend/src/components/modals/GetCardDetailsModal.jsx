import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
// import '~/styles/style.css'

function GetCardDetailsModal({ show, setShow }) {
  const handleClose = () =>setShow(!show);

  return (
    <Modal show={show} animation={false} centered className="primary-color">
      <Modal.Header >
        <Modal.Title>{}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button className="btn-sm" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn-sm" variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GetCardDetailsModal;
