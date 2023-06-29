import React from "react";
import "./Homepage.css";
import "~/styles/style.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Homepage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/auth", { state: { bydefaultTab: "registration",userEmail:data.userEmail } });
  };
  return (
    <React.Fragment>
      <div className="vh-91  bgcolor-homepage d-flex p-5">
        <div className="text-light d-flex flex-column justify-content-center w-50  p-5">
          <h1 className="rem3">
            Trello brings all your tasks, teammates, and tools together
          </h1>
          <p className="px20">
            Keep everything in the same place—even if your team isn't.
          </p>

          <div className="d-flex justify-content-between ">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex gap-3 justify-content-between w-100">
              <input
                className="p-12px rounded border-0 "
                style={{ width: "300px" }}
                type="text"
                placeholder="Email"
                {...register("userEmail")}
              />
              <button
                className="btn btn-primary button-bgcolor p-12px "
                type="submit"
              >
                Sign up - it's free!
              </button>
            </form>

          </div>
        </div>

        <div className="w-50  p-4">
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
