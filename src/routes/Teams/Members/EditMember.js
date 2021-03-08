import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { ReactComponent as Kitty } from '../../../images/kitty.svg';
import { ReactComponent as Kiwi } from '../../../images/kiwi.svg';
import { ReactComponent as Owl } from '../../../images/owl.svg';

export const path = "/teams/:teamid/members/edit/:id";
export const pathToCreate = "/teams/:teamid/members/edit";

export default function EditMember() {

    const { teamid, id } = useParams();
    const [team, setTeam] = useState();
    const history = useHistory();

    const isEdit = !!id;

    useEffect(() => {

        function handleFetchedData(err, data) {
            if (err) throw err;
            if (!data) throw Error(`Team not found: ${teamid}`);
            setTeam(data);
        }

        const detail = {
            path: decodeURIComponent(teamid),
            callback: handleFetchedData
        };
        document.dispatchEvent(new CustomEvent("fetch-object", { detail }));

    });

    function handleStored(err) {
        if (err) throw err;
        history.goBack();
    }

    function handleFormSubmit(e) {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const teamMembers = team.members || [];
        const existingIndex = teamMembers.findIndex(m => m.id === id);
        if (existingIndex > -1)
            teamMembers[existingIndex] = { ...teamMembers[existingIndex], ...data };
        else
            teamMembers.push(data);
        const detail = {
            data: {
                ...team,
                members: teamMembers
            },
            callback: handleStored
        };
        document.dispatchEvent(new CustomEvent("store-object", { detail }));

    }

    const member = team?.members?.find(m => m.id === id);

    return <>
        <h1>{isEdit ? "Edit" : "New"} team member</h1>
        <form onSubmit={handleFormSubmit}>
            <label>
                <span>Name</span>
                <input type="text" defaultValue={member?.name} name="name"></input>
            </label>

            <label>
                <span>Avatar</span>
                <input type="text" defaultValue={member?.img} name="img" id="emimg"></input>
            </label>

            <button>{isEdit ? "Save" : "Create"}</button>
        </form>

        <button className="image-button" type="button" onClick={() => document.querySelector("#emimg").value = "kitty"}>
            <Kitty />
        </button>

        <button className="image-button" type="button" onClick={() => document.querySelector("#emimg").value = "kiwi"}>
            <Kiwi />
        </button>

        <button className="image-button" type="button" onClick={() => document.querySelector("#emimg").value = "owl"}>
            <Owl />
        </button>
    </>;
}
