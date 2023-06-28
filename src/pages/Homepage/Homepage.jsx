import React from "react";
import "./Homepage.css";
function Homepage() {
  return (
    <React.Fragment>
      <div className="vh-91 border border-primary bgcolor-homepage d-flex p-5">
        <div className="text-light d-flex flex-column justify-content-center w-50 border border-primary p-4">
          <h1 className="px48">
            Trello brings all your tasks, teammates, and tools together
          </h1>
          <h5>Keep everything in the same place—even if your team isn’t.</h5>

          <div className="d-flex gap-3 ">
            <input className="p-2 " type="text" placeholder="Enter" />
            <button> Sign up - it's free!</button>
          </div>
        </div>

        <div className="w-50 border border-primary p-4">
          <img
            src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=540&fm=webp"
            alt="homepage-img"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Homepage;
