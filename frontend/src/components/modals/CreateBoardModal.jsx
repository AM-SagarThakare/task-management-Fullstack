import React from "react";

import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addNewBoard } from "../../services/boardService";
import { toast } from "react-toastify";

function CreateBoardModal({ boardStatus, setBoardStatus, setBoardArr }) {
  const handleClose = () => {
    setBoardStatus(!boardStatus);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (formdata) => {
    // console.log(formdata);
    if (Object.keys(errors).length === 0) {
      addNewBoard(formdata)
        .then((res) => toast.success(res.data.message))
        .catch(() => {});
      setBoardStatus(!boardStatus);
      setBoardArr((prev) => [...prev, formdata]);
    }
  };

  return (
    <React.Fragment>
      <Modal show={boardStatus} onHide={handleClose} className="primary-color">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Create New Board</h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(submit)}>
          <Modal.Body className="px-4">
            <div className="d-flex flex-column ">
              <label>
                <h6>
                  Board Title <span className="text-danger">*</span>
                </h6>
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
            <Button
              variant="secondary"
              onClick={handleClose}
              className="btn-sm"
            >
              Close
            </Button>
            <Button variant="primary" type="submit" className="btn-sm">
              Create Board
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default CreateBoardModal;
