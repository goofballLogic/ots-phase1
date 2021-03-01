import { useHistory } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

export default function AuthStatus() {
    let history = useHistory();
    let auth = useAuthContext();

    function signout() {
        auth.signOut(() => history.push("/"));
    }

    return <section>
        {auth.user ? `Logged in as ${auth.user.name}` : "Not logged in"}
        {auth.user && <button onClick={signout}>Sign out</button>}
    </section>;

}
