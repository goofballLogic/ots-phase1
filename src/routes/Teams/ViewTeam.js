import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const path = "/teams/:id";
const NotFound = Symbol("not-found");

export default function ViewTeam() {

    const [team, setTeam] = useState(null);
    const { id } = useParams();

    useEffect(() => {

        function handleTeamData(err, data) {
            if (err) throw err;
            setTeam(data || NotFound);
        }

        const detail = { path: id, callback: handleTeamData };
        document.dispatchEvent(new CustomEvent("fetch-object", { detail }));

    }, [id, setTeam]);

    return team === NotFound
        ? <div>Not found!</div>
        : (!team)
            ? <div>loading...</div>
            :
            <>
                <h1>{team.name}</h1>
                <Link to={`/teams/edit/${encodeURIComponent(team.id)}`}>Edit</Link>
                <img alt="team logo" className="team" src={team.img}></img>
            </>;
}