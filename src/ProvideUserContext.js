import { useEffect, useState } from "react";
import { authContext } from "./hooks/useAuthContext";

function gapi_signout_user(callback) {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(callback);
}

export default function ProvideUserContext({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const handleGAPIUser = e => console.log(e.detail) || setUser(e.detail);
        document.addEventListener("gapi-user", handleGAPIUser);
        document.dispatchEvent(new Event("user-request"));
        return () => document.removeEventListener("gapi-user", handleGAPIUser);

    });

    function signOut() {
        document.dispatchEvent(new Event("sign-out"));
    }

    return (
        <authContext.Provider value={{ user, signOut }}>
            {children}
        </authContext.Provider>
    );
}