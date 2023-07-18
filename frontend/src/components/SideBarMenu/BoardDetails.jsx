import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBoardDetailsByID, updateBoardTitle } from "../../services";
import { GrEdit } from "react-icons/gr";
import "~/styles/style.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DetailsBgImg from "../../images/photo-1688909987766-8797b4f909b9.jpg";

function BoardDetails() {
  console.log("in board details");

  const { register, handleSubmit } = useForm();
  const data = useLocation();
  console.log(data);

  const [board, setBoard] = useState(null);
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    getBoardDetailsByID(data?.state?.boardID)
      .then((res) => {
        setBoard(res.data[0]);
        console.log(res);
      })
      .catch(() => {});
  }, [editStatus, data?.state?.boardID]);

  const updateTitle = async (data) => {
    data.boardID = board._id;

    if (data.boardTitle !== board.boardTitle && data.boardTitle !== "") {
      await updateBoardTitle(data)
        .then((res) => {
          toast.success("updated successfully", { autoClose: 2000 });
        })
        .catch(() => {});
    }
    setEditStatus(!editStatus);
  };
  const myStyle = {
    backgroundImage: `url(${DetailsBgImg})`,
    height: "100vh",
    backgroundSize: "cover",
    opacity: 0.5,
    backgroundRepeat: "no-repeat",
  };

  return (
    <React.Fragment>
      <div className="bg-ligh" style={myStyle}>
        <div
          className="border-bottom py-2 ps-4 text-light"
          style={{ backgroundColor: "rgba(20, 20, 20,0.4)" }}
        >
          {editStatus ? (
            <form
              className="d-flex gap-3 "
              onSubmit={handleSubmit(updateTitle)}
            >
              <input
                className="p-2 sidebar-menu-bg"
                placeholder={board?.boardTitle}
                autoFocus
                {...register("boardTitle")}
                style={{ backgroundColor: "transparent" }}
              />
              <button type="submit" className="btn btn-sm btn-primary">
                save
              </button>
            </form>
          ) : (
            <div className="d-flex gap-3 align-items-center text-light">
              <h2 className=" "> {board?.boardTitle}</h2>
              <GrEdit
                size={23}
                className="primary-color"
                role="button"
                style={{ opacity: "1" }}
                onClick={() => {
                  setEditStatus(!editStatus);
                }}
              />
            </div>
          )}
        </div>
        <div className=" border border-primary ">
          <h1>sagar</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BoardDetails;
