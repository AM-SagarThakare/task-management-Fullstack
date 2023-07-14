// css
import "./Sidebar.css";
//dependencies
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getAllBoards } from "../../services";
import { useEffect } from "react";

//react-icons
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import {BsFillClipboard2DataFill} from 'react-icons/bs'

function SideBar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const toggleSlideBar = () => setIsOpen(!isOpen);
  const [boardArr, setBoardArr] = useState([]);

  useEffect(() => {
    console.log('sidebar useffect');
    getAllBoards()
      .then((res) => {
        setBoardArr(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

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

  const showBoardSubset = boardArr.map((board,i) => {
    return (
      <div className="d-flex gap-2 border-bottom my-1" key={i}>
        <BsFillClipboard2DataFill size={20}/>
        <p className="">{board.boardTitle}</p>
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
          <div className="mb-1 border-bottom">{showMenu}</div>
          <div>
            <p>board subset</p>
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
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
