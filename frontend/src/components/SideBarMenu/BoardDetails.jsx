import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  addNewList,
  getBoardDetailsByID,
  updateBoardTitle,
} from "../../services";
import { GrEdit } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import "~/styles/style.css";
import "./BoardDetails.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DetailsBgImg from "../../images/photo-1688909987766-8797b4f909b9.jpg";

function BoardDetails() {
  console.log("in board details");

  const { register, handleSubmit } = useForm();
  const [board, setBoard] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [isAddListVisible, setIsAddListVisible] = useState(false);
  const data = useLocation();
  console.log(data.state);

  const myStyle = {
    backgroundImage: `url(${DetailsBgImg})`,
    height: "100vh",
    backgroundSize: "cover",
    opacity: 0.8,
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    getBoardDetailsByID(data?.state?.boardID)
      .then((res) => {
        setBoard(res.data[0]);
        console.log(res);
      })
      .catch(() => {});
  }, [editStatus, data?.state?.boardID, isAddListVisible === false]); // if isAddListVisible is true only that time i want to run useffect

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

  const displayAllLists =
    board &&
    board.list.map((list, index) => (
      <React.Fragment>
        <div className="list-bg-color col-3 border p-3 m-2  rounded">
          <div>
            <p>{list.listTitle}</p>
          </div>

          <div className="p-2">+ add new card</div>
        </div>
      </React.Fragment>
    ));

  const submitList = (formData) => {
    formData.boardID = data.state.boardID;

    if (formData.listTitle !== "") {
      addNewList(formData)
        .then((res) => {
          toast.success(res.data.message);
          setIsAddListVisible(!isAddListVisible);
        })
        .catch(() => {});
    }
  };

  return (
    <React.Fragment>
      <div className="h-100" style={myStyle}>
        {/* board title  */}
        <div
          className=" py-2 ps-4 text-light"
          style={{ backgroundColor: "rgba(20, 20, 20,0.1)" }}
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
        {/* end board title */}

        {/* board body */}
        <div className="overflow-x-scroll d-flex ">
          {displayAllLists}

          {/* conditional rendering for show create new list  */}
          {!isAddListVisible ? (
            <div
              className=" p-2 col-3 m-3 newlist-bg-color text-light rounded-3 pointer"
              style={{height : '45px'}}
              onClick={() => setIsAddListVisible(!isAddListVisible)}
            >
              <span>+ add new list</span>
            </div>
          ) : (
            <form
              className="p-2 m-3 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0"
              onSubmit={handleSubmit(submitList)}
            >
              <input
                className="rounded px-2 text-light"
                placeholder="enter list name"
                style={{
                  backgroundColor: "#22272B",
                  border: "1px solid #85B8FF",
                }}
                {...register("listTitle")}
              />
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-primary">Add list </button>
                <RxCross2
                  size={25}
                  onClick={() => setIsAddListVisible(!isAddListVisible)}
                />
              </div>
            </form>
          )}
        </div>
        {/*end board body */}
      </div>
    </React.Fragment>
  );
}

export default BoardDetails;
