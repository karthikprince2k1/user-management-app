import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import CreateUpdateUser from "../pages/CreateUpdateUser";
import CreateUpdateContact from "../pages/CreateUpdateContact";
import ViewUsers from "../pages/ViewUsers";
import NotFound from "../pages/NotFound";
import "../styles/menu.css";

export default function (props) {
  return (
    <Router>
      <div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createuser">Create User</Link>
          </li>
          <li>
            <Link to="/createcontact">Create Contact</Link>
          </li>
          <li>
            <Link to="/viewusers">View Users</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/createuser/:userId" component={CreateUpdateUser} />
          <Route path="/createcontact" component={CreateUpdateContact} />
          <Route path="/viewusers" component={ViewUsers} />
          <Route default component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
