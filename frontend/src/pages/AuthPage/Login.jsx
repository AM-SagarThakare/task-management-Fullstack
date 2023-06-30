import React from "react";

function Login({ userEmail }) {
  return (
    <React.Fragment>
      <div
        className={`tab-pane fade show active`}
        id="pills-login"
        role="tabpanel"
        aria-labelledby="tab-login"
      >
        <form>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="loginName"
              className="form-control"
              defaultValue={userEmail ? userEmail : " "}
            />
            <label className="form-label" htmlFor="loginName">
              Email or username
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="loginPassword"
              className="form-control"
            />
            <label className="form-label" htmlFor="loginPassword">
              Password
            </label>
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
          <div className="text-center">
            <p>
              Not a member? <a href="#pills-register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
