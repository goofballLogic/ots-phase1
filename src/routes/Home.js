import React from "react";
import { path as teamsPath } from "./Teams/Teams";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

export default function Home() {

    let { user } = useAuthContext();

    return <>

        <h1>Welcome to dev@OpenTeamSpace</h1>
        {user && <Link to={teamsPath}>Teams</Link>}
        {!user && <p>In order to access the system, you need to log in using one of the options available below</p>}

    </>;
}