import React, { useState, createContext } from "react";
import "./style.css";

import { AppInput } from "../../components/index";

import user from "../../Assets/user_ico.png";
import mail from "../../Assets/email_ico.png";
import lock from "../../Assets/lock_ico.png";

import { Link, useHistory } from "react-router-dom";

import API from "../../API/service/api";

const Token = createContext();

const LoginScreen = (props) => {
  const history = useHistory();
  const [isSignIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = async () => {
    const response = await (isSignIn
      ? API.postOAuth({ email, password })
      : API.post("register", { name: name, email: email, password: password }));
    if (
      response.status === "user logged in" ||
      response.status === "User created"
    ) {
      localStorage.setItem(
        "userID",
        isSignIn ? response.userId : response.user._id
      );
      localStorage.setItem("token", isSignIn ? response.token : response.token);
      localStorage.setItem(
        "isAdmin",
        isSignIn ? response.isAdmin : response.isAdmin
      );
      history.push(response.isAdmin ? "/admin" : "/home");
    } else {
      if (response.error === "user exist") {
        alert("User Exist! Please Login to Continue.");
      } else if (response.error === "user does not exist") {
        alert("User Does Not Exist! Please Sign Up to Continue.");
      } else if (response.error === "email or password is incorrect") {
        alert("Email or Password is Incorrect!");
      }
    }
    // <Token.Provider value={response.token} />;
  };

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div className="row">
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
              <button
                className="sign-button"
                onClick={() => {
                  setSignIn(true);
                }}
              >
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
                  <AppInput
                    type="email"
                    placeholder="email"
                    source={mail}
                    onInputText={(e) => setEmail(e.target.value)}
                  />
                  <AppInput
                    type="password"
                    placeholder="password"
                    source={lock}
                    onInputText={(e) => setPassword(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <AppInput
                    type="text"
                    placeholder="name"
                    source={user}
                    onInputText={(e) => setName(e.target.value)}
                  />
                  <AppInput
                    type="email"
                    placeholder="email"
                    source={mail}
                    onInputText={(e) => setEmail(e.target.value)}
                  />
                  <AppInput
                    type="password"
                    placeholder="password"
                    source={lock}
                    onInputText={(e) => setPassword(e.target.value)}
                  />
                </>
              )}
            </div>
            {/* <div className="submit-button-container"> */}
            <button className="submit-button" onClick={auth}>
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
export { Token };
