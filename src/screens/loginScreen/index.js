import React, { useState } from "react";
import "./style.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { AppInput } from "../../components/index";

import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import lock from "../../Assets/lock_ico.png";

import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [isSignIn, setSignIn] = useState(false);

  return (
    <>
      <div className="row" style={{ overflow: "hidden" }}>
        <div className="col-md-4 sidebar">
          {/* <div className=""> */}
          <div className="side-title">
            <h1>{isSignIn ? "Hello Friend!" : "Welcome Back"}</h1>
          </div>
          <div className="side-body-text">
            <h6>
              {isSignIn
                ? "Enter your personal details and start journey with us"
                : " To keep connected with us please login with your personal info"}
            </h6>
          </div>
          {isSignIn ? (
            // <div className="sign-button-container">
            <button className="sign-button" onClick={() => setSignIn(false)}>
              Sign Up
            </button>
          ) : (
            // </div>
            <button className="sign-button" onClick={() => setSignIn(true)}>
              Sign In
            </button>
          )}

          {/* </div> */}
        </div>
        <div className="col-md-8 right-side-bar">
          <div className="heading">
            <h1>{isSignIn ? "Sign In" : "Create Account"}</h1>
          </div>
          <div className="form">
            {isSignIn ? (
              <>
                <AppInput placeholder="email" source={mail} />
                <AppInput placeholder="password" source={lock} />
              </>
            ) : (
              <>
                <AppInput placeholder="name" source={user} />
                <AppInput placeholder="email" source={mail} />
                <AppInput placeholder="password" source={lock} />
              </>
            )}
          </div>
          {/* <div className="submit-button-container"> */}
          <Link to="/home" className="submit-button">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Link>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
