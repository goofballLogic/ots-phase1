import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path as editTeamPath, pathToCreate as createTeamPath } from "./EditTeam";
import "./Team.css";

export const path = "/teams";

export default function Teams() {

    const [teams, setTeams] = useState(null);

    function teamsUpdated(err, data) {
        if (err) throw err;
        if (!Array.isArray(data)) throw new Error(`Expected array but received ${data}`);
        setTeams(data || []);
    }

    useEffect(() => {
        const detail = { path: "teams", callback: teamsUpdated };
        document.dispatchEvent(new CustomEvent("fetch-object", { detail }));
    });

    function Team({ team }) {
        return <Link to={`${path}/${encodeURIComponent(team.id)}`}>
            <div className="pic" data-img={`url(${team.img})`} style={{
                backgroundImage: `url(${team.img})`
            }}>
            </div>
            <span>{team.name}</span>
        </Link>;
    }

    return <>
        <h1>Teams</h1>
        <nav>
            <Link to={createTeamPath}>Create a new team</Link>
        </nav>
        {!teams && <p>Loading...</p>}
        {teams && !teams.length && <div>No teams found</div>}
        {teams && teams.length && <ul>
            {teams.map(t => <li className="team" key={t.id}>
                <Team team={t} />
            </li>)}
        </ul>}

    </>;
}