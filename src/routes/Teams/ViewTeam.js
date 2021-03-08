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
                <nav>
                    <Link to={`/teams/edit/${encodeURIComponent(team.id)}`}>Edit</Link>
                </nav>
                <img alt="team logo" className="team" src={team.img}></img>
                <h2>Members</h2>
                <Link to={`/teams/${encodeURIComponent(team.id)}/members/edit`}>Add a team member</Link>
                {Members(team)}
            </>;
}

function Members(team) {
    return (team?.members && team.members.length)
        ? <ul className="members">
            {team.members.map(m => Member(m, team))}
        </ul>
        : <div>No team members yet</div>
}

function Member(member, team) {
    return <li key={member.id}>
        {member.img}<br />
        {member.name}<br />
        <Link to={`/teams/${encodeURIComponent(team.id)}/members/edit/${encodeURIComponent(member.id)}`}>Edit</Link>
    </li>;
}