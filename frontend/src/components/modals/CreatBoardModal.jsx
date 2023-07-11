import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
function CreateBoardModal({ boardStatus, setBoardStatus }) {
  const handleClose = () => {
    setBoardStatus(!boardStatus);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (formdata) => {
    console.log(formdata);
    if (Object.keys(errors).length === 0) {
      setBoardStatus(!boardStatus);
    }
    // reset({ boardTitle: "" });
  };

  return (
    <React.Fragment>
      <Modal show={boardStatus} onHide={handleClose} className="primary-color ">
        <Modal.Header closeButton>
          <Modal.Title>Create New Board</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(submit)}>
          <Modal.Body className="px-4">
            <div className="d-flex flex-column ">
              <label>
                <b>
                  Board Title <span className="text-danger">*</span>
                </b>
              </label>
              <input
                className="p-2 bg-dark border-0 primary-color "
                placeholder="Enter title here"
                {...register("boardTitle", { required: true })}
              />
              <p className="error">
                {errors.boardTitle?.type === "required"
                  ? "Board Title is required"
                  : ""}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" >
              Create Board
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default CreateBoardModal;
