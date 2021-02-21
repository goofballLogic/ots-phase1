import { createContext, useContext } from "react";

export const authContext = createContext();

const useAuthContext = () => useContext(authContext);

export default useAuthContext;