import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/ApiService";

function Register({userEmail}) {

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    registerUser(data)
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
          {/* <!-- Name input --> */}
          {/* <div className="form-outline mb-4">
            <input type="text" id="registerName" className="form-control" defaultValue={userEmail ? userEmail : " "}/>
            <label className="form-label" htmlFor="registerName">
              Name
            </label>
          </div> */}

          {/* <!-- Username input --> */}
          <div className="form-outline mb-4">
            <input type="text" id="registerUsername" className="form-control" {...register('userName')}/>
            <label className="form-label" htmlFor="registerUsername">
              Username
            </label>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="registerEmail" className="form-control" {...register('email')}/>
            <label className="form-label" htmlFor="registerEmail">
              Email
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="registerPassword"
              className="form-control"
              {...register('password')}
            />
            <label className="form-label" htmlFor="registerPassword">
              Password
            </label>
          </div>

          {/* <!-- Repeat Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="registerRepeatPassword"
              className="form-control"
              {...register('confirmPassword')}
            />
            <label className="form-label" htmlFor="registerRepeatPassword" >
              confirm password
            </label>
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
