// css
import "./Sidebar.css";
//dependencies
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

//react-icons
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";

function SideBar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isOpen, setIsOpen] = useState();
  const toggleSlideBar = () => setIsOpen(!isOpen);

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

  return (
    <React.Fragment>
      
      <div className="d-flex ">
        <div
          className="vh-100 bg-dark overflow-hidden border-end "
          style={{ width: isOpen ? "300px" : "48px" }}
        >
          
          {menuItems.map((item, i) => {
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
          })}
        </div>
        <div className="w-100 position-relative">
        <div className="border position-absolute rounded-circle bg-dark " style={{left : '-20px'}}>
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
