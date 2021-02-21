import React from "react";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export const loginPath = "/login";

export default function Login() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuthContext();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <p>You must log in to view the page at {from.pathname}</p>
            {auth.inProgress
                ? "Signing in..."
                : <button onClick={login}>Log in</button>}
        </div>
    );
}