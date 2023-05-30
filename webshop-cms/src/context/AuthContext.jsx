import { createContext, useState } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    
  // Get the token from localStorage, if it exists
    const localStorageObject = localStorage.getItem("token");
    
    // Parse the token from a string to an object
    const initialToken = localStorageObject != "undefined" ? JSON.parse(localStorageObject) : null;
   
     // Initialize the token state with the initial token value
    const [token, setToken] = useState(initialToken?.token || null);
  
    const updateToken = (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", JSON.stringify(newToken));
    };
  
    return (
      <AuthContext.Provider value={{ token, updateToken }}>
        {children}
      </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };