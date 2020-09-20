import React from "react";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Bookmark from "./Pages/Bookmark/Bookmark";
import Movies from "./Pages/Movies/Movies";
import PrivateRoute from "./components/HOC/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/HOC/PublicRoute/PublicRoute";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <PublicRoute component={Login} path="/login" exact />
        <PublicRoute component={SignUp} path="/signup" exact />
        <PrivateRoute component={Bookmark} path="/bookmark" exact />
        <PrivateRoute component={Movies} path="/movies" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
