import React from "react";
import { useState } from "react";
import boardImg from "~/images/board-init-img.svg";
import "~/styles/style.css";
import CreateBoardModal from "../modals/CreatBoardModal";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { getAllBoards } from "../../services";
import { AiFillProject } from "react-icons/ai";
import UseGenerateRandomColor from "../../utils/useGenerateRandomColor";

export default function Board() {
  const [boardStatus, setBoardStatus] = useState(false);
  const [boardArr, setBoardArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // restrict

  useEffect(() => {
    getAllBoards()
      .then((res) => {
        setBoardArr(res.data);
        console.log(res.data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const initPageOfBoard = () => {
    return (
      <div className="d-flex flex-column align-items-center w-50 mx-auto fs-14px">
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
    return boardArr.map((board,ind) => {
      return (
        <div
          className="col-2 mb-3 p-2 rounded opacity-decrease"
          style={{ height: "100px", backgroundColor: `#034d82` }}
          key={ind}
        >
          {board.boardTitle}
        </div>
      );
    });
  };

  const boardsAvailable = () => {
    return (
      <React.Fragment>
        <div className="p-3 ">
          <div className="d-flex py-3 gap-2 ">
            <AiFillProject size={30} />
            <h4>
              <u>Your Boards</u>
            </h4>
          </div>
          <div className="container ">
            <div className="row gap-2">
              {loadAllBoards()}
              <div
                className="col-2 mb-3 p-2 rounded sidebar-menu-bg "
                role="button"
                style={{ height: "100px" }}
                onClick={() => setBoardStatus(!boardStatus)}
              >
                + Create New Board
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <h2 className="p-4 border-bottom"> Workspace</h2>

      {/* before loading the proper Function dont show anything */}
      {isLoading
        ? null
        : boardArr.length === 0
        ? initPageOfBoard()
        : boardsAvailable()}

      <CreateBoardModal
        boardStatus={boardStatus}
        setBoardStatus={setBoardStatus}
      />
    </React.Fragment>
  );
}
