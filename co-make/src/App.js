import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

import NavBar from "./components/NavBar";
import Issues from "./components/Issues";
import PostIssue from "./components/PostIssue";
import EditIssue from "./components/EditIssue";
import Profile from "./components/profileComp/Profile";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/issues" component={Issues} />
          <Route exact path="/issueform" component={PostIssue} />
          <Route exact path="/editissue/:id" component={EditIssue} />
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
