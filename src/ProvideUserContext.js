import { useEffect, useState } from "react";
import { authContext } from "./hooks/useAuthContext";

export default function ProvideUserContext({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const handleGAPIUser = e => setUser(e.detail);
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