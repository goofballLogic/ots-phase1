import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProvideUserContext from "./ProvideUserContext";
import AuthStatus from "./AuthStatus";

import Teams, { path as teamsPath } from "./routes/Teams/Teams";
import Login, { path as loginPath } from "./routes/Login";
import EditTeam, { path as editTeamPath, pathToCreate as createTeamPath } from "./routes/Teams/EditTeam";
import ViewTeam, { path as viewTeamPath } from "./routes/Teams/ViewTeam";

import EditTeamMember, { path as editTeamMemberPath, pathToCreate as createTeamMemberPath } from "./routes/Teams/Members/EditMember";

import Home from "./routes/Home";

import "./App.css";
import PrivateRoute from "./PrivateRoute";
import useAuthContext from "./hooks/useAuthContext";

export default function App() {

  return (
    <ProvideUserContext>
      <Routes />
    </ProvideUserContext>
  );
}

function Routes() {

  let { user } = useAuthContext();
  useEffect(() => {

    document.body.dataset.otsauth = !!user;

  }, [user]);

  return (
    <Router>

      <header>
        <AuthStatus />
      </header>
      <main>
        <Switch>
          <Route path={loginPath}>
            <Login />
          </Route>
          <PrivateRoute path={teamsPath} exact={true}>
            <Teams />
          </PrivateRoute>
          <PrivateRoute path={editTeamPath} exact={true}>
            <EditTeam />
          </PrivateRoute>
          <PrivateRoute path={createTeamPath} exact={true}>
            <EditTeam />
          </PrivateRoute>
          <PrivateRoute path={viewTeamPath} exact={true}>
            <ViewTeam />
          </PrivateRoute>
          <PrivateRoute path={createTeamMemberPath} exact={true}>
            <EditTeamMember />
          </PrivateRoute>
          <PrivateRoute path={editTeamMemberPath} exact={true}>
            <EditTeamMember />
          </PrivateRoute>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </main>

    </Router>
  );
}