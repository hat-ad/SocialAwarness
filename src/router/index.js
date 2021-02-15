import React, { useState } from "react";
import LoginScreen from "../screens/loginScreen/index";
import HomeScreen from "../screens/HomeScreen/index";
import DetailScreen from "../screens/DetailsScreen/index";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Router = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {token ? <Redirect to="/home" /> : <LoginScreen />}
        </Route>
        <Route exact path="/logout" component={LoginScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/details/:cause_id/:isAD" component={DetailScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
