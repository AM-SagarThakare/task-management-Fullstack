//css
import "~/styles/style.css";
//dependencies
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
// react-icons
import { AiFillProject } from "react-icons/ai";
// images
import boardImg from "~/images/board-init-img.svg";
// folders
import { CreateBoardModal } from "../";
import { getAllBoards } from "~/services";
import { useNavigate, useOutletContext } from "react-router-dom";
import movableIcon from '~/images/movable-icon.svg'

export default function Board() {
  console.log("in board ");
  const [boardArr, setBoardArr] = useOutletContext();
  // console.log("OutletContext",boardArr,setBoardArr)

  const navigate = useNavigate();
  const [boardStatus, setBoardStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllBoards()
      .then((res) => {
        if (res.data.length !== 0) {
          setBoardArr(res.data);
          console.log(res);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(!isLoading));
  }, []);

  const initPageOfBoard = () => {
    return (
      <div className="d-flex flex-column align-items-center w-50 mx-auto fs-14px w-sm-100 ">
        <img src={boardImg} className="w-100" alt="img" />

        <p>
          Boards are where work gets done in Trello. On a board, you can move
          between lists to keep projects, tasks, and more on track
        </p>
        <Button
          onClick={() => setBoardStatus(!boardStatus)}
          className="text-dark fs-14px button-bgcolor border-0 rounded-1"
        >
          Create Your First Board
        </Button>
      </div>
    );
  };

  const loadAllBoards = () => {
    const openBoardDetails = (index) => {
      navigate(`/user/board/${boardArr[index].boardTitle}`, {
        state: { boardID: boardArr[index]._id },
      });
    };

    return boardArr?.map((board, ind) => {
      return (
        <div className="col-6 col-sm-4 col-lg-2 mb-2 text-break  " key={ind}>
          <div
            style={{ height: "100px", backgroundColor: `#034d82` }}
            className="rounded p-2 opacity-decrease pointer"
            onClick={() => openBoardDetails(ind)}
          >
            {board.boardTitle}
          </div>
        </div>
      );
    });
  };

  const boardsAvailable = () => {
    return (
      <React.Fragment>
        <div className="p-3 ">
          <div className="d-flex py-3 gap-2 ">
            {/* <AiFillProject size={30} /> */}
            <img src={movableIcon} height={30} alt='' />
            <h4>
              <u>Your Boards</u>
            </h4>
          </div>
          <div className="container ">
            <div className="row row-wrap">
              {loadAllBoards()}

              <div className="col-sm-4 col-lg-2 col-6 mb-2 pointer">
                <div
                  style={{ height: "100px", backgroundColor: `#5c5c5c` }}
                  className="rounded p-2 "
                  onClick={() => setBoardStatus(!boardStatus)}
                >
                  + create new board
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {console.log('in return')}
      <h2 className="p-4 border-bottom"> Workspace</h2>

      {/* before loading the proper Function dont show anything */}
      {isLoading
        ? null
        : boardArr?.length === 0
        ? initPageOfBoard()
        : boardsAvailable()}

      <CreateBoardModal
        boardStatus={boardStatus}
        setBoardStatus={setBoardStatus}
        setBoardArr={setBoardArr}
      />
    </React.Fragment>
  );
}
