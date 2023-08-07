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
  const [globalIndex, setGlobalIndex] = useState(-1);
  const [editStatus, setEditStatus] = useState(false);
  const [listEditStatus, setlistEditStatus] = useState(false);
  const [isAddListVisible, setIsAddListVisible] = useState(false);
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);

  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);

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

  // display cards of list
  const displayAllCardsByIndex = (listIndex) =>
    board?.list[listIndex]?.card.map((card, i) => {
      return (
        <Draggable key={i} draggableId={card._id || "45648749424874"} index={i}>
          {/*  '45648749424874' - If we don't provide this ID, then a draggableId error occurs. it is dummy _id value */}
          {/* Because when we save a card, we are not making a call; we are simply saving this card to the parent list. 
          That's why the _id is not available here. After rendering, it tries to find card._id, but it's not available at that time. */}
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className="px-2 py-1 my-2 rounded card-bg-color pointer"
                key={i}
                onClick={() => {
                  setShow(!show);
                }}
              >
                <span>{card.cardTitle}</span>
              </div>
            </div>
          )}
        </Draggable>
        // ))}
      );
    });

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

  const displayAllListssss =
    board &&
    board.list.map((list, index) => {
      return (
        <div
          className="list-bg-color col-6 col-sm-4 col-lg-3  p-3 m-2 rounded h-100"
          key={index}
        >
          <div className="d-flex align-items-center justify-content-between ">
            {listEditStatus && globalIndex === index ? (
              <form
                className="d-flex flex-column align-items-start gap-1"
                onSubmit={handleSubmit((formData) =>
                  submitListTitle(formData, { listID: list._id })
                )}
              >
                <input
                  className="bg-transparent w-75 border-bottom border-0 primary-color"
                  placeholder={list.listTitle}
                  {...register("listTitle", { required: true })}
                />
                <div className="d-flex gap-2 align-items-center">
                  <button className="btn btn-sm btn-outline-info">save</button>
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
                submitCard(formData, { listID: list._id, listIndex: index })
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
                <button className="btn btn-sm btn-warning">Add card </button>
                <RxCross2
                  size={25}
                  onClick={() => setIsAddCardVisible(!isAddCardVisible)}
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
      );
    });

  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };

  // function onDragEnd(result) {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   const list = reorder(
  //     board.list,
  //     result.source.index,
  //     result.destination.index
  //   );
  //   setBoard({ ...board, list });
  // }

  // working perfectely
  // const displayAllLists = () => {
  //   return (
  //     <>
  //       <DragDropContext onDragEnd={onDragEnd}>
  //         <Droppable droppableId="droppable" direction="horizontal">
  //           {(provided, snapshot) => (
  //             <div
  //               ref={provided.innerRef}
  //               // style={getListStyle(snapshot.isDraggingOver)}
  //               className="d-flex "
  //               {...provided.droppableProps}
  //             >
  //               {board?.list?.map((list, index) => (
  //                 <Draggable key={index} draggableId={list._id} index={index}>
  //                   {(provided, snapshot) => (
  //                     <div
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                       className=" col-3"
  //                     >
  //                       <div
  //                         className="list-bg-color p-3 m-2 rounded "
  //                         key={index}
  //                       >
  //                         <div className="d-flex align-items-center justify-content-between ">
  //                           {listEditStatus && globalIndex === index ? (
  //                             <form
  //                               className="d-flex flex-column align-items-start gap-1"
  //                               onSubmit={handleSubmit((formData) =>
  //                                 submitListTitle(formData, {
  //                                   listID: list._id,
  //                                 })
  //                               )}
  //                             >
  //                               <input
  //                                 className="bg-transparent w-75 border-bottom border-0 primary-color"
  //                                 placeholder={list.listTitle}
  //                                 {...register("listTitle", { required: true })}
  //                               />
  //                               <div className="d-flex gap-2 align-items-center">
  //                                 <button className="btn btn-sm btn-outline-info">
  //                                   save
  //                                 </button>
  //                                 <RxCross2
  //                                   size={25}
  //                                   onClick={() => {
  //                                     setlistEditStatus(!listEditStatus);
  //                                   }}
  //                                 />
  //                               </div>
  //                             </form>
  //                           ) : (
  //                             <div className="d-flex gap-2 align-items-center gap-2">
  //                               <p className="m-0">{list.listTitle}</p>

  //                               <MdOutlineModeEditOutline
  //                                 className="pointer"
  //                                 size={17}
  //                                 onClick={() => {
  //                                   setGlobalIndex(index);
  //                                   setlistEditStatus(!listEditStatus);
  //                                 }}
  //                               />
  //                             </div>
  //                           )}

  //                           <div className="dropdown">
  //                             <PiDotsThreeOutlineThin
  //                               className="pointer dropdown-toggle "
  //                               data-bs-toggle="dropdown"
  //                               aria-expanded="false"
  //                               size={20}
  //                             />

  //                             <ul className="dropdown-menu ">
  //                               <li>
  //                                 <span
  //                                   className="dropdown-item pointer"
  //                                   onClick={() => deleteList(list._id)}
  //                                 >
  //                                   delete
  //                                 </span>
  //                               </li>
  //                             </ul>
  //                           </div>
  //                         </div>

  //                         {displayAllCardsByIndex(index)}

  //                         {isAddCardVisible && globalIndex === index ? (
  //                           <form
  //                             className="p-2 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0 w-100"
  //                             onSubmit={handleSubmit((formData) =>
  //                               submitCard(formData, {
  //                                 listID: list._id,
  //                                 listIndex: index,
  //                               })
  //                             )}
  //                           >
  //                             <input
  //                               className="rounded px-2 text-light w-100"
  //                               placeholder="enter card name"
  //                               style={{
  //                                 backgroundColor: "#22272B",
  //                                 border: "1px solid #85B8FF",
  //                               }}
  //                               {...register("cardTitle", { required: true })}
  //                             />

  //                             <div className="d-flex align-items-center gap-2 ">
  //                               <button className="btn btn-sm btn-warning">
  //                                 Add card{" "}
  //                               </button>
  //                               <RxCross2
  //                                 size={25}
  //                                 onClick={() =>
  //                                   setIsAddCardVisible(!isAddCardVisible)
  //                                 }
  //                               />
  //                             </div>
  //                           </form>
  //                         ) : (
  //                           <div
  //                             className="p-2 hoverEffect rounded pointer"
  //                             onClick={() => {
  //                               setIsAddCardVisible(!isAddCardVisible);
  //                               setGlobalIndex(index);
  //                             }}
  //                           >
  //                             + add new card
  //                           </div>
  //                         )}
  //                       </div>
  //                     </div>
  //                   )}
  //                 </Draggable>
  //               ))}

  //               {/* conditional rendering for show add new list card */}
  //               {!isAddListVisible ? (x`
  //                 <div
  //                   className=" p-2 col-3 m-3 newlist-bg-color text-light rounded-3 pointer"
  //                   style={{ height: "45px" }}
  //                   onClick={() => setIsAddListVisible(!isAddL istVisible)}
  //                 >
  //                   <span>+ add new list</span>
  //                 </div>
  //               ) : (
  //                 <form
  //                   className="p-2 m-3 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 border h-25"
  //                   onSubmit={handleSubmit(submitList)}
  //                 >
  //                   <input
  //                     className="rounded px-2 text-light w-100"
  //                     placeholder="enter list name"
  //                     style={{
  //                       backgroundColor: "#22272B",
  //                       border: "1px solid #85B8FF",
  //                     }}
  //                     {...register("listTitle", { required: true })}
  //                   />
  //                   <div className="d-flex align-items-center gap-2">
  //                     <button className="btn btn-sm btn-info">Add list </button>
  //                     <RxCross2
  //                       size={25}
  //                       onClick={() => setIsAddListVisible(!isAddListVisible)}
  //                     />
  //                   </div>
  //                 </form>
  //               )}

  //               {provided.placeholder}
  //             </div>
  //           )}
  //         </Droppable>
  //       </DragDropContext>
  //     </>
  //   );
  // };
  // =====================================================

  /* ----------------------------------------------------------------------------------------------------------------------------- */

  // function onDragEnd(result) {

  //   const reorderList = (list, startIndex, endIndex) => {
  //     const result = Array.from(list);
  //     const [removed] = result.splice(startIndex, 1);
  //     result.splice(endIndex, 0, removed);
  //     return result;
  //   };

  //   const { source, destination } = result;
  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }
  //   const sInd = +source.droppableId;
  //   const dInd = +destination.droppableId;
  //   if (destination.droppableId === "dropableIdd") {
  //     //   // dropped outside the list
  //     //   if (!result.destination) {
  //     //     return;
  //     //   }

  //     const list = reorderList(
  //       board.list,
  //       result.source.index,
  //       result.destination.index
  //     );
  //     setBoard({ ...board, list });
  //   } else if (sInd === dInd) {
  //     const updatedList = reorder(
  //       board.list[sInd],
  //       source.index,
  //       destination.index
  //     );

  //     var list = board.list;

  //     list[sInd].card = updatedList;
  //   } else {
  //     const result = move(
  //       board.list[sInd],
  //       board.list[dInd],
  //       source,
  //       destination
  //     );

  //     const list = [...board.list];

  //     list[sInd].card = result[sInd];
  //     list[dInd].card = result[dInd];

  //     setBoard({ ...board, list });
  //   }
  // }

  // want to move card
  const displayAllLists = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"dropableIdd"}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="d-flex">
                  {board?.list?.map((list, ind) => (
                    <Draggable
                      index={ind}
                      key={list._id}
                      draggableId={list._id || "45648749424874"}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list-bg-color col-6 col-sm-4 col-lg-3 p-3 m-2 rounded   border d-flex"
                        >
                          <Droppable key={list._id} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                key={ind}
                                className="w-100"
                              >
                                <div className="d-flex align-items-center justify-content-between ">
                                  {/* <p>this is list {list?.listTitle}</p> */}

                                  {listEditStatus && globalIndex === ind ? (
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
                                        {...register("listTitle", {
                                          required: true,
                                        })}
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
                                          setGlobalIndex(ind);
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

                                {displayAllCardsByIndex(ind)}

                                {isAddCardVisible && globalIndex === ind ? (
                                  <form
                                    className="p-2 text-light list-bg-color rounded-3 pointer col-3 d-flex flex-column align-items-start gap-2 end-0 w-100"
                                    onSubmit={handleSubmit((formData) =>
                                      submitCard(formData, {
                                        listID: list._id,
                                        listIndex: ind,
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
                                      {...register("cardTitle", {
                                        required: true,
                                      })}
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
                                      setGlobalIndex(ind);
                                    }}
                                  >
                                    + add new card
                                  </div>
                                )}

                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* conditional rendering for show add new list card */}
          {/* {!isAddListVisible ? (
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
          )} */}
        </div>
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

  const [columns, setColumns] = useState(transformedObject);

  const [ordered, setOrdered] = useState(
    board?.list.map((item) => item.listTitle) || []
  );
  useEffect(() => {
    setOrdered(board?.list.map((item) => item.listTitle));
  }, [board]);

  const onDragEnd = (result) => {
    console.log(result);

    // if (result.combine) {
    //   if (result.type === "COLUMN") {
    //     const shallow = [...ordered];
    //     shallow.splice(result.source.index, 1);
    //     setOrdered(shallow);
    //     const orderedList = shallow.map((listTitle) => {
    //       return board.list.find((list) => list.listTitle === listTitle);
    //     });

    //     board.list = orderedList;
    //     setBoard(board);
    //     return;
    //   }

    //   const column = columns[result.source.droppableId];
    //   const withQuoteRemoved = [...column];

    //   withQuoteRemoved.splice(result.source.index, 1);

    //   const orderedColumns = {
    //     ...columns,
    //     [result.source.droppableId]: withQuoteRemoved,
    //   };
    //   setColumns(orderedColumns);
    //   return;
    // }

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
              className="d-flex gap-3"
            >
              {board?.list.map((list, index) => (
                <Column
                  key={list.listTitle}
                  index={index}
                  title={list.listTitle}
                  quotes={list.card}
                  // isScrollable={withScrollableColumns}
                  // isCombineEnabled={isCombineEnabled}
                  // useClone={useClone}
                />
              ))}
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
        {/* <div className="overflow-x-scroll vh-91">{displayAllLists()}</div> */}
        <div className="overflow-x-scroll vh-91">{showList()}</div>

        <GetCardDetailsModal show={show} setShow={setShow} />
        {/*end board body */}
      </div>
    </React.Fragment>
  );
}

// fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     content: `item ${k + offset}`,
//   }));

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list.card);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

/**
 * Moves an item from one list to another list.
 */
// const move = (source, destination, droppableSource, droppableDestination) => {
//   const sourceClone = Array.from(source.card);
//   const destClone = Array.from(destination.card);

//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };
// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });
// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

export default BoardDetails;
