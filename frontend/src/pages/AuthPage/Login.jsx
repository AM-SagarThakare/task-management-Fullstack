import React from "react";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // registerUser(data);
  };

  return (
    <React.Fragment>
      <div
        className={`tab-pane fade show active`}
        id="pills-login"
        role="tabpanel"
        aria-labelledby="tab-login"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="loginName"
              className="form-control"
              {...register("email", { required: true })}
            />
             <p role="alert" className={errors.email?.type === "required" ? "fs-10px" : ""}>
           
           {errors.email?.type === "required"
             ? "email is required"
             : "email"}
         </p>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="loginPassword"
              className="form-control"
              {...register("password", { required: true })}
            />
             <p role="alert" className={errors.password?.type === "required" ? "fs-10px" : ""}>
           
           {errors.password?.type === "required"
             ? "password is required"
             : "password"}
         </p>
          </div>

          {/* <!-- 2 column grid layout --> */}
          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              {/* <!-- Checkbox --> */}
              <div className="form-check mb-3 mb-md-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={null}
                  value=""
                  id="loginCheck"
                />
                <label className="form-check-label" htmlFor="loginCheck">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              {/* <!-- Simple link --> */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          {/* <!-- Register buttons --> */}
          {/* <div className="text-center">
            <p>
              Not a member? <a href="#pills-register">Register</a>
            </p>
          </div> */}
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
