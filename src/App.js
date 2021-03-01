import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProvideUserContext from "./ProvideUserContext";
import AuthStatus from "./AuthStatus";
import Teams, { teamsPath } from "./routes/Teams";
import Login, { loginPath } from "./routes/Login";
import "./App.css";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <ProvideUserContext>
      <Router>
        <header>
          <AuthStatus />
        </header>

        <nav>
          <Link to="/">Home</Link>
          <Link to={teamsPath}>Teams</Link>
        </nav>

        <main>
          <Switch>
            <Route path={loginPath}>
              <Login />
            </Route>
            <PrivateRoute path={teamsPath}>
              <Teams />
            </PrivateRoute>
            <Route path="/" exact={true}>
              <h1>Welcome to dev@OpenTeamSpace</h1>
            </Route>
          </Switch>
        </main>

      </Router>
    </ProvideUserContext>
  );
}