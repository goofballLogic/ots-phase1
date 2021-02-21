import { useHistory } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

export default function AuthStatus() {
    let history = useHistory();
    let auth = useAuthContext();

    function signout() {
        auth.signout(() => history.push("/"));
    }

    return <section>
        {auth.user ? `Logged in as ${auth.user}` : "Not logged in"}
        {auth.user && <button onClick={signout}>Sign out</button>}
    </section>;

}
