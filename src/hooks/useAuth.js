import { useState } from "react";

function fakeSignIn(callback) {
    setTimeout(callback, 1000); // fake async
}

function fakeSignOut(callback) {
    setTimeout(callback, 1000);
}

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const signin = callback => {
        setInProgress(true);
        fakeSignIn(() => {
            setUser("user");
            setInProgress(false);
            callback();
        });
    };

    const signout = callback => {
        setInProgress(true);
        fakeSignOut(() => {
            setUser(null);
            setInProgress(false);
            callback();
        });
    };

    return {
        user,
        inProgress,
        signin,
        signout
    };
}