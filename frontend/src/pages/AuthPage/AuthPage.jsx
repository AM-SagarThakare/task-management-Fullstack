import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function AuthPage() {
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const data = useLocation().state;



  const changeStatus = () => {
    if (loginStatus === "active") {
      setLoginStatus("");
      setRegisterStatus("active");
    } else {
      setLoginStatus("active");
      setRegisterStatus("");
    }
  };

  const setInitialTab = () => {
    data?.bydefaultTab === "registration"
      ? setRegisterStatus("active")
      : setLoginStatus("active");
  };
  useEffect(() => {
    setInitialTab();
  }, []);

  return (
    <React.Fragment>

      <div className="w-75 mx-auto mt-4 w-lg-50">
        {/* <!-- Pills navs --> */}
        <ul
          className="nav nav-pills nav-justified mb-3 border rounded"
          id="ex1"
          role="tablist"
        >
          <li
            className="nav-item"
            role="presentation"
            onClick={() => {
              changeStatus();
            }}
          >
            <a
              className={`nav-link ${loginStatus}`}
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Login
            </a>
          </li>
          <li
            className="nav-item"
            role="presentation"
            onClick={() => {
              changeStatus();
            }}
          >
            <a
              className={`nav-link ${registerStatus}`}
              id="tab-register"
              data-mdb-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Register
            </a>
          </li>
        </ul>
        {/* <!-- Pills navs --> */}

        {/* <!-- Pills content --> */}
        <div className="tab-content ">
          {loginStatus ? (
            <Login />
          ) : (
            <Register userEmail={data?.userEmail} />
          )}
        </div>
        {/* <!-- Pills content --> */}
      </div>
    </React.Fragment>
  );
}

export default AuthPage;
