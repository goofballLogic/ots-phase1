import useAuth from "./hooks/useAuth";
import { authContext } from "./hooks/useAuthContext";

export default function ProvideUserContext({ children }) {
    const userContext = useAuth();
    return (
        <authContext.Provider value={userContext}>
            {children}
        </authContext.Provider>
    );
}