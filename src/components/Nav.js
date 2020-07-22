import React from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import CreateUpdateUser from "../pages/CreateUpdateUser";
import CreateUpdateContact from "../pages/CreateUpdateContact";
import ViewUsers from "../pages/ViewUsers";
import NotFound from "../pages/NotFound";
import "../styles/menu.css";

export default function (props) {
  return (
    <div>
      <ul className="menu">
        <li>
          <Link to="/viewusers">View Users</Link>
        </li>
        <li>
          <Link to="/createuser" data-testid="createuser-link">
            Create User
          </Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/createuser/:userId?/createcontact/:contactId"
          component={CreateUpdateContact}
        />
        <Route path="/createuser/:userId?" component={CreateUpdateUser} />
        <Route path="/createcontact/:userId?" component={CreateUpdateContact} />

        <Route path="/viewusers" component={ViewUsers} />
        <Route default component={NotFound} />
      </Switch>
    </div>
  );
}
