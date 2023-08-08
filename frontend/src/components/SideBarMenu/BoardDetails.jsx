import React, { useState, useEffect, Component } from "react";
import { useLocation } from "react-router-dom";
import {
  addNewCard,
  addNewList,
  deleteListByID,
  getBoardDetailsByID,
  updateBoardTitle,
  updateList,
} from "../../services";
import { GrEdit } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import "~/styles/style.css";
import "./BoardDetails.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DetailsBgImg from "../../images/photo-1688909987766-8797b4f909b9.jpg";
import GetCardDetailsModal from "../modals/GetCardDetailsModal";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import reorder, { reorderQuoteMap } from "./Reorder";

function BoardDetails() {
  console.log("in board details");

  const { register, handleSubmit, reset } = useForm();

  const [show, setShow] = useState(false);
  const [board, setBoard] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [listEditStatus, setlistEditStatus] = useState(false);
  const [isAddListVisible, setIsAddListVisible] = useState(false);
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);

  const data = useLocation();

  const myStyle = {
    backgroundImage: `url(${DetailsBgImg})`,
    height: "100vh",
    backgroundSize: "cover",
    opacity: 0.8,
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    const fetchBoardDetails = () => {
      getBoardDetailsByID(data?.state?.boardID)
        .then((res) => {
          setBoard(res.data[0]);
        })
        .catch(() => {});
    };

    // Run the API call when isAddListVisible is true
    if (isAddListVisible) {
      fetchBoardDetails();
    }

    // Run the API call when other dependencies change (except isAddListVisible)
    if (!isAddListVisible) {
      fetchBoardDetails();
    }
  }, [editStatus, data?.state?.boardID, isAddListVisible]); // if isAddListVisible is true only that time i want to run useffect
  console.log(board);

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

  const submitCard = async (formData, list) => {
    formData.listID = list.listID;

    await addNewCard(formData)
      .then(() => {
        board.list[list.listIndex].card.push(formData);
      })
      .catch(() => {});

    setIsAddCardVisible(!isAddCardVisible);
    reset({
      cardTitle: "",
    });
  };

  const deleteList = (listID) => {
    deleteListByID(listID)
      .then(() => {
        board.list = board.list.filter((list) => list._id !== listID);
        setBoard((prev) => ({ ...prev, board }));
      })
      .catch(() => {});
  };

  const submitListTitle = async (formData, list) => {
    await updateList(formData, list.listID)
      .then((res) => {})
      .catch(() => {});

    setlistEditStatus(!listEditStatus);
  };

  /* ----------------------------------------------------------------------------------------------------------------------------- */

  const submitList = (formData) => {
    formData.boardID = data.state.boardID;

    if (formData.listTitle !== "") {
      addNewList(formData)
        .then((res) => {
          toast.success(res.data.message);
          setIsAddListVisible(!isAddListVisible);
        })
        .catch(() => {});
      reset({
        listTitle: "",
      });
    }
  };

  // ------------------------------------------------- show list new code ------------------------------------------------
  const transformedObject = {};

  board?.list.forEach((list) => {
    transformedObject[list.listTitle] = list.card;
  });

  const [ordered, setOrdered] = useState(
    board?.list.map((item) => item.listTitle) || []
  );
  useEffect(() => {
    setOrdered(board?.list.map((item) => item.listTitle));
  }, [board]);

  const onDragEnd = (result) => {
    console.log(result);

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(() => reorderedorder);

      const orderedList = reorderedorder.map((listTitle) => {
        return board.list.find((list) => list.listTitle === listTitle);
      });

      board.list = orderedList;
      setBoard(board);

      return;
    }

    console.log(transformedObject);

    const data = reorderQuoteMap({
      quoteMap: transformedObject,
      source,
      destination,
    });
    console.log("data.quoteMap", data.quoteMap);

    const updatedBoardList = board?.list.map((item) => {
      item.card = data.quoteMap[item.listTitle];
      return item;
    });
    setBoard((prev) => {
      return { ...prev, list: updatedBoardList };
    });
  };

  const showList = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="d-flex border border-3"
            >
              {board?.list.map((list, index) => (
                <Column
                  key={list.listTitle}
                  index={index}
                  title={list.listTitle}
                  cards={list.card}
                />
              ))}
              <div>add new list</div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
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
        <div className="overflow-x-scroll vh-91">{showList()}</div>

        <GetCardDetailsModal show={show} setShow={setShow} />
        {/*end board body */}
      </div>
    </React.Fragment>
  );
}

export default BoardDetails;
