import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Get the token from localStorage
    const localStorageObject = localStorage.getItem("token");
    const initialToken = JSON.parse(localStorageObject);
    const [token, setToken] = useState(initialToken || null);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    // Save the token to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };