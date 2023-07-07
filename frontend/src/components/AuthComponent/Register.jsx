import React from "react";
import { useForm } from "react-hook-form";
import "./AuthComponent.css";
import { registerUser } from "../../services/authService";

function Register({ userEmail }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    registerUser(data);
  };

  return (
    <React.Fragment>
      <div
        className={`tab-pane fade show active`}
        id="pills-register"
        role="tabpanel"
        aria-labelledby="tab-register"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Username input --> */}
          <div className="form-outline mb-4">
            <input
              type="text"
              id="registerUsername"
              className="form-control border-btm"
              placeholder="user name"
              {...register("userNames", { required: true })}
              defaultValue={userEmail}
            />

            <p
              role="alert"
              className={errors.userName?.type === "required" ? "fs-10px" : ""}
            >
              {errors.userName?.type === "required"
                ? "username is required"
                : "Username"}
            </p>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="registerEmail"
              className="form-control border-btm"
              placeholder="username@gmail.com"

              {...register("email", { required: true })}
            />
            <p
              role="alert"
              className={errors.email?.type === "required" ? "fs-10px" : ""}
            >
              {errors.email?.type === "required"
                ? "email is required"
                : "Email"}
            </p>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="registerPassword"
              className="form-control border-btm"
              placeholder="........"
              {...register("password", { required: true })}
            />

            <p
              role="alert"
              className={errors.password?.type === "required" ? "fs-10px" : ""}
            >
              {errors.password?.type === "required"
                ? "password is required"
                : "Password"}
            </p>
          </div>

          {/* <!-- Repeat Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="registerRepeatPassword"
              className="form-control border-btm"
              placeholder="........"
              {...register("confirmPassword", { required: true })}
            />
            <p
              role="alert"
              className={
                errors.confirmPassword?.type === "required" ? "fs-10px" : ""
              }
            >
              {errors.confirmPassword?.type === "required"
                ? "confirm password is required"
                : "confirm Password"}
            </p>
          </div>

          {/* <!-- Checkbox --> */}
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              onChange={null}
              value=""
              id="registerCheck"
              aria-describedby="registerCheckHelpText"
            />
            <label className="form-check-label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-3">
            Sign in
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Register;
