import React from "react";

import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addNewBoard } from "../../services/boardService";
import { toast } from "react-toastify";
import { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";

function CreateBoardModal({ boardStatus, setBoardStatus, setBoardArr }) {
  const [imgIndex, setImgIndex] = useState(0);

  const images = [
    "bg-img1.jpeg",
    "bg-img2.jpeg",
    "bg-img3.jpeg",
    "bg-img4.jpeg",
    "bg-img5.jpeg",
    "bg-img6.jpeg",
    "bg-img7.jpeg",
    "bg-img8.jpeg",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    resetForm();
    setBoardStatus(!boardStatus);
  };

  const resetForm = () => {
    reset({
      boardTitle: "",
    });
  };

  const submit = (formdata) => {
    
    // console.log(formdata);
    if (Object.keys(errors).length === 0) {
      addNewBoard(formdata)
        .then((res) => toast.success(res.data.message))
        .catch(() => {});
      setBoardStatus(!boardStatus);
      setBoardArr((prev) => [...prev, formdata]);
      resetForm();
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
              <div className="row ">
                <p>Select Background </p>
                {images.map((fileName, index) => {
                  const imgUrl = require(`~/images/bg-image/${fileName}`);
                  return (
                    <div
                      className="position-relative col-3 d-flex align-items-center justify-content-center "
                      key={index}
                    >
                      <img
                        className={`hover-border p-1 w-100  ${
                          imgIndex === index && "border"
                        }`}
                        width={50}
                        src={imgUrl}
                        alt={fileName}
                        onClick={() => setImgIndex(index)}
                      />
                      {imgIndex === index && (
                        <IoMdDoneAll
                          size={50}
                          className="position-absolute opacity-50"
                          style={{ zIndex: "100" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
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
