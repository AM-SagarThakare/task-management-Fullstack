// css
import "./Sidebar.css";
//dependencies
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { deleteBoardByID, getAllBoards } from "../../services";

//react-icons
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

function SideBar() {
  console.log("in sidebar ");

  const [activeMenu, setActiveMenu] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [boardArr, setBoardArr] = useState([]);
  const navigate = useNavigate();

  const toggleSlideBar = () => setIsOpen(!isOpen);

  useEffect(() => {
    getAllBoards()
      .then((res) => {
        console.log(res);
        setBoardArr(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, [boardArr.length]);

  const menuItems = [
    {
      path: "/user/board",
      name: "Board",
      icon: <BiBarChartAlt2 />,
    },
    {
      path: "/user/members",
      name: "Members",
      icon: <IoIosPeople />,
    },
    {
      path: "/user/setting",
      name: "Setting",
      icon: <AiOutlineSetting />,
    },
  ];

  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  const showMenu = menuItems.map((item, i) => {
    return (
      <NavLink
        to={item.path}
        key={i}
        className={`link d-flex gap-3 p-3 hoverEffect primary-color ${
          activeMenu === item.path ? "sidebar-menu-bg" : ""
        }`}
        onClick={() => handleMenuClick(item.path)}
      >
        <div className="icon">{item.icon}</div>
        <div className="icon">{item.name}</div>
      </NavLink>
    );
  });

  const showBoardSubset = boardArr.map((board, i) => {
    const openBoardDetails = (index) => {
      navigate(`/user/board/${boardArr[index]._id}`, {
        state: { boardID: boardArr[index]._id },
      });
    };

    const deleteBoard = (boardID) => {
      deleteBoardByID(boardID)
        .then((res) => {
          setBoardArr((prev) => prev.filter((item) => item._id !== boardID));
        })
        .catch(() => {});
    };

    return (
      <div
        className="d-flex  my-1 justify-content-between p-2 hoverEffect align-items-center"
        key={i}
      >
        <div
          className="d-flex gap-2 pointer align-items-center"
          onClick={() => openBoardDetails(i)}
        >
          <BsFillClipboard2DataFill size={20} />
          <p className="m-0">{board.boardTitle}</p>
        </div>
        <div>
          <MdOutlineDeleteForever
            size={20}
            color="#d62020"
            onClick={() => deleteBoard(board._id)}
          />
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="d-flex bg-dark primary-color">
        <div
          className="vh-100 bg-dark overflow-hidden border-end"
          style={{ width: isOpen ? "300px" : "48px" }}
        >
          <div className="mb-1 border-bottom ">{showMenu}</div>
          <div className={showBoardSubset.length > 0 ? "p-1" : "d-none"}>
            <p>My Boards</p>
            {showBoardSubset}
          </div>
        </div>
        <div className="w-100 position-relative p-2">
          <div
            className="border position-absolute rounded-circle bg-dark "
            style={{ left: "-20px", top: "3px" }}
          >
            {isOpen ? (
              <FiChevronsLeft size={30} onClick={toggleSlideBar} />
            ) : (
              <FiChevronsRight size={30} onClick={toggleSlideBar} />
            )}
          </div>
          <Outlet context={[boardArr, setBoardArr]} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
