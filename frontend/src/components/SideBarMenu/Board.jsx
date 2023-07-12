import React from "react";
import { useState } from "react";
import boardImg from "~/images/board-init-img.svg";
import "~/styles/style.css";
import CreateBoardModal from "../modals/CreatBoardModal";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { getAllBoards } from "../../services";

export default function Board() {
  const [boardStatus, setBoardStatus] = useState(false);
  const [boardArr, setBoardArr] = useState([]);

  useEffect(() => {
    getAllBoards()
      .then((res) => {
        setBoardArr(res.data);
      })
      .catch(() => {});
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

  return (
    <React.Fragment>
      <h2 className="p-4 border-bottom"> Workspace</h2>

      {boardArr.length === 0 ? initPageOfBoard() : <h1>boards present</h1>}
      <CreateBoardModal
        boardStatus={boardStatus}
        setBoardStatus={setBoardStatus}
      />
    </React.Fragment>
  );
}
