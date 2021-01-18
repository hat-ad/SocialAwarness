import React from "react";
import LoginScreen from "../screens/loginScreen/index";
import HomeScreen from "../screens/HomeScreen/index";
import DetailScreen from "../screens/DetailsScreen/index";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route path="/details" component={DetailScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
