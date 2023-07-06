import React from "react";
import "./Homepage.css";
import "~/styles/style.css";    // global css file
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Homepage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    navigate("/auth", { state: { bydefaultTab: "registration",userEmail:data.userEmail } });
  };
  return (
    <React.Fragment>
      <div className="vh-sm-91 bgcolor-homepage d-lg-flex w-sm-100 p-sm-5 p-3 pt-5 pt-sm-none">
        <div className="text-light d-flex flex-column justify-content-center w-50 w-sm-100 p-0 text-center text-lg-start p-lg-5">
          <h1 className="rem-lg-3 fs-sm-44 fs-32">
            Trello brings all your tasks, teammates, and tools together
          </h1>
          <p className="px20">
            Keep everything in the same place—even if your team isn't.
          </p>

          <div className="d-flex justify-content-between ">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center justify-content-sm-evenly gap-lg-3 justify-content-lg-between w-100 p-sm-3">
              <input
                className="p-12px rounded border-0 d-none d-sm-block "
                style={{ width: "280px" }}
                type="text"
                placeholder="Email"
                {...register("userEmail")}
              />
              <button
                className="btn btn-primary button-bgcolor  width-100 mt-2 mt-sm-0"
                type="submit"
              >
                Sign up - it's free!
              </button>
            </form>

          </div>
        </div>

        <div className="w-sm-50 p-lg-4 p-sm-5 pt-3 pt-sm-0">
          <img
            src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=540&fm=webp"
            alt="homepage-img"
            className="w-100"
          />
        </div>

      </div>
    </React.Fragment>
  );
}

export default Homepage;
