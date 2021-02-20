import React, { useState, useContext } from "react";
import LoginScreen from "../screens/loginScreen/index";
import HomeScreen from "../screens/HomeScreen/index";
import DetailScreen from "../screens/DetailsScreen/index";
import AdminPanel from "../screens/AdminPanel/index";
import { AuthContext } from "../API/context/index";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Router = () => {
  const { token, setToken } = useContext(AuthContext);
  const { isAdmin, setAdmin } = useContext(AuthContext);
  // const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  setToken(localStorage.getItem("isAdmin"));
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {token ? (
            <Redirect
              to={
                isAdmin === "true" || localStorage.getItem("isAdmin")
                  ? "/admin"
                  : "/home"
              }
            />
          ) : (
            <LoginScreen />
          )}
        </Route>
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/logout" component={LoginScreen} />
        <Route path="/details/:cause_id/:isAD" component={DetailScreen} />
        <Route path="/admin" component={AdminPanel} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
