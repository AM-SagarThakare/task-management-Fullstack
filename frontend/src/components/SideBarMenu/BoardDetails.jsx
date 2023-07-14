import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBoardDetailsByID } from "../../services";
import {GrEdit} from 'react-icons/gr'
import '~/styles/style.css'

function BoardDetails() {
  const data = useLocation();

  const [board, setBoard] = useState(null);

  useEffect(() => {
    getBoardDetailsByID(data.state.boardID)
      .then((res) => {
        setBoard(res.data[0]);
        console.log(res.data[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <React.Fragment>
      <div className="border-bottom d-flex py-3 ps-4 align-items-center border gap-2">
        <h2 className=" "> {board?.boardTitle}</h2>
        <GrEdit size={23}  className="primary-color"/>
        
      </div>
    </React.Fragment>
  );
}

export default BoardDetails;
