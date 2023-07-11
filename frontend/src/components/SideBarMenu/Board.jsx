import React from "react";
import { useState } from "react";
import boardImg from "~/images/board-init-img.svg";
import "~/styles/style.css";
import CreateBoardModal from "../modals/CreatBoardModal";
import { Button } from "react-bootstrap";


export default function Board() {
  const [boardStatus, setBoardStatus] = useState(false);

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

  return (
    <React.Fragment>
      <h2 className="p-4"> Workspace</h2>
      {initPageOfBoard()}
      <CreateBoardModal
        boardStatus={boardStatus}
        setBoardStatus={setBoardStatus}
      />
    </React.Fragment>
  );
}
