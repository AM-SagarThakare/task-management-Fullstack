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

import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BoardDetails() {
  console.log("in board details");

  const { register, handleSubmit, reset } = useForm();

  const [show, setShow] = useState(false);
  const [board, setBoard] = useState(null);
  const [globalIndex, setGlobalIndex] = useState(-1);
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

  // display cards of list
  const displayAllCardsByIndex = (listIndex) =>
    board.list[listIndex].card.map((card, i) => {
      return (
        <div
          className="px-2 py-1 my-2 rounded card-bg-color pointer"
          key={i}
          onClick={() => {
            setShow(!show);
          }}
        >
          <span>{card.cardTitle}</span>
        </div>
      );
    });

  const submitCard = async (formData, list) => {
    formData.listID = list.listID;

    await addNewCard(formData)
      .then(() => {
        board.list[list.listIndex].card.push(formData);
      })
      .catch((err) => console.log(err));

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
      .then((res) => {
        console.log(res);
      })
      .catch(() => {});

    setlistEditStatus(!listEditStatus);
  };

  // const displayAllLists =
  // board &&
  // board.list.map((list, index) => {
  //   return (
  //     <div
  //       className="list-bg-color col-6 col-sm-4 col-lg-3  p-3 m-2 rounded h-100"
  //       key={index}
  //     >
  //       <div className="d-flex align-items-center justify-content-between ">
  //         {console.log(globalIndex)}

  //         {listEditStatus && globalIndex === index ? (
  //           <form
  //             className="d-flex flex-column align-items-start gap-1"
  //             onSubmit={handleSubmit((formData) =>
  //               submitListTitle(formData, { listID: list._id })
  //             )}
  //           >
  //             <input
  //               className="bg-transparent w-75 border-bottom border-0 primary-color"
  //               placeholder={list.listTitle}
  //               {...register("listTitle", { required: true })}
  //             />
  //             <div className="d-flex gap-2 align-items-center">
  //               <button className="btn btn-sm btn-outline-info">save</button>
  //               <RxCross2
  //                 size={25}
  //                 onClick={() => {
  //                   setlistEditStatus(!listEditStatus);
  //                 }}
  //               />
  //             </div>
  //           </form>
  //         ) : (
  //           <div className="d-flex gap-2 align-items-center gap-2">
  //             <p className="m-0">{list.listTitle}</p>

  //             <MdOutlineModeEditOutline
  //               className="pointer"
  //               size={17}
  //               onClick={() => {
  //                 setGlobalIndex(index);
  //                 setlistEditStatus(!listEditStatus);
  //               }}
  //             />
  //           </div>
  //         )}
  //         <div className="dropdown">
  //           <PiDotsThreeOutlineThin
  //             className="pointer dropdown-toggle "
  //             data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //             size={20}
  //           />

  //           <ul className="dropdown-menu ">
  //             <li>
  //               <span
  //                 className="dropdown-item pointer"
  //                 onClick={() => deleteList(list._id)}
  //               >
  //                 delete
  //               </span>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>

  //       {displayAllCardsByIndex(index)}

  //       {isAddCardVisible && globalIndex === index ? (
  //         <form
  //           className="p-2 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0 w-100"
  //           onSubmit={handleSubmit((formData) =>
  //             submitCard(formData, { listID: list._id, listIndex: index })
  //           )}
  //         >
  //           <input
  //             className="rounded px-2 text-light w-100"
  //             placeholder="enter card name"
  //             style={{
  //               backgroundColor: "#22272B",
  //               border: "1px solid #85B8FF",
  //             }}
  //             {...register("cardTitle", { required: true })}
  //           />

  //           <div className="d-flex align-items-center gap-2 ">
  //             <button className="btn btn-sm btn-warning">Add card </button>
  //             <RxCross2
  //               size={25}
  //               onClick={() => setIsAddCardVisible(!isAddCardVisible)}
  //             />
  //           </div>
  //         </form>
  //       ) : (
  //         <div
  //           className="p-2 hoverEffect rounded pointer"
  //           onClick={() => {
  //             setIsAddCardVisible(!isAddCardVisible);
  //             setGlobalIndex(index);
  //           }}
  //         >
  //           + add new card
  //         </div>
  //       )}
  //     </div>
  //   );
  // });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result) {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const list = reorder(
      board.list,
      result.source.index,
      result.destination.index
    );
    setBoard({ ...board, list });
  }

  const displayAllLists = () => {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
                className="d-flex "
                {...provided.droppableProps}
              >
                {board?.list?.map((list, index) => (
                  <Draggable key={index} draggableId={list._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=" col-3"
                      >
                        <div
                          className="list-bg-color p-3 m-2 rounded "
                          key={index}
                        >
                          <div className="d-flex align-items-center justify-content-between ">
                            {listEditStatus && globalIndex === index ? (
                              <form
                                className="d-flex flex-column align-items-start gap-1"
                                onSubmit={handleSubmit((formData) =>
                                  submitListTitle(formData, {
                                    listID: list._id,
                                  })
                                )}
                              >
                                <input
                                  className="bg-transparent w-75 border-bottom border-0 primary-color"
                                  placeholder={list.listTitle}
                                  {...register("listTitle", { required: true })}
                                />
                                <div className="d-flex gap-2 align-items-center">
                                  <button className="btn btn-sm btn-outline-info">
                                    save
                                  </button>
                                  <RxCross2
                                    size={25}
                                    onClick={() => {
                                      setlistEditStatus(!listEditStatus);
                                    }}
                                  />
                                </div>
                              </form>
                            ) : (
                              <div className="d-flex gap-2 align-items-center gap-2">
                                <p className="m-0">{list.listTitle}</p>

                                <MdOutlineModeEditOutline
                                  className="pointer"
                                  size={17}
                                  onClick={() => {
                                    setGlobalIndex(index);
                                    setlistEditStatus(!listEditStatus);
                                  }}
                                />
                              </div>
                            )}

                            <div className="dropdown">
                              <PiDotsThreeOutlineThin
                                className="pointer dropdown-toggle "
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                size={20}
                              />

                              <ul className="dropdown-menu ">
                                <li>
                                  <span
                                    className="dropdown-item pointer"
                                    onClick={() => deleteList(list._id)}
                                  >
                                    delete
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {displayAllCardsByIndex(index)}

                          {isAddCardVisible && globalIndex === index ? (
                            <form
                              className="p-2 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0 w-100"
                              onSubmit={handleSubmit((formData) =>
                                submitCard(formData, {
                                  listID: list._id,
                                  listIndex: index,
                                })
                              )}
                            >
                              <input
                                className="rounded px-2 text-light w-100"
                                placeholder="enter card name"
                                style={{
                                  backgroundColor: "#22272B",
                                  border: "1px solid #85B8FF",
                                }}
                                {...register("cardTitle", { required: true })}
                              />

                              <div className="d-flex align-items-center gap-2 ">
                                <button className="btn btn-sm btn-warning">
                                  Add card{" "}
                                </button>
                                <RxCross2
                                  size={25}
                                  onClick={() =>
                                    setIsAddCardVisible(!isAddCardVisible)
                                  }
                                />
                              </div>
                            </form>
                          ) : (
                            <div
                              className="p-2 hoverEffect rounded pointer"
                              onClick={() => {
                                setIsAddCardVisible(!isAddCardVisible);
                                setGlobalIndex(index);
                              }}
                            >
                              + add new card
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {/* conditional rendering for show add new list card */}
                {!isAddListVisible ? (
                  <div
                    className=" p-2 col-3 m-3 newlist-bg-color text-light rounded-3 pointer"
                    style={{ height: "45px" }}
                    onClick={() => setIsAddListVisible(!isAddListVisible)}
                  >
                    <span>+ add new list</span>
                  </div>
                ) : (
                  <form
                    className="p-2 m-3 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 border h-25"
                    onSubmit={handleSubmit(submitList)}
                  >
                    <input
                      className="rounded px-2 text-light w-100"
                      placeholder="enter list name"
                      style={{
                        backgroundColor: "#22272B",
                        border: "1px solid #85B8FF",
                      }}
                      {...register("listTitle", { required: true })}
                    />
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-sm btn-info">Add list </button>
                      <RxCross2
                        size={25}
                        onClick={() => setIsAddListVisible(!isAddListVisible)}
                      />
                    </div>
                  </form>
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  };

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
        <div className="overflow-x-scroll vh-91">{displayAllLists()}</div>

        <GetCardDetailsModal show={show} setShow={setShow} />
        {/*end board body */}
      </div>
    </React.Fragment>
  );
}

export default BoardDetails;
