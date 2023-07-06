import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function SideBar({children}) {
  console.log("in slidebar");

  const [isOpen,setIsOpen] =useState()
  const toggleSlideBar = ()=> setIsOpen(!isOpen)

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
    }
  ];
  return (
    <React.Fragment>
      <div className='d-flex'>

      <div className="vh-100 bg-dark overflow-hidden " style={{width : isOpen ? '300px' : '48px'}}>
        {menuItems.map((item, i) => {
          return (
            <NavLink
              to={item.path}
              key={i}
              className="link d-flex gap-3 p-3  border-bottom "
            >
              <div className="icon">{item.icon}</div>
              <div className="icon">{item.name}</div>
            </NavLink>
          );
        })}

      <button className="border" onClick={toggleSlideBar}> close</button>
      </div>
      <main>
        {/* {children}   */}
      </main>
      <Outlet />
      </div>
    </React.Fragment>
  );
}

export default SideBar;
