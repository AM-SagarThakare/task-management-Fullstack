import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

function SideBar() {
  console.log("in sidebar");
  const [activeMenu, setActiveMenu] = useState("");

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
      <div className="d-flex">
        <div
          className="vh-100 bg-dark overflow-hidden border-end"
          style={{ width: "280px" }}
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

          {/* <button className="border" onClick={toggleSlideBar}>
            {" "}
            close
          </button> */}
        </div>
        <div className="w-100 ">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
