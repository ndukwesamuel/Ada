// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   // Configure Axios
//   axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;

//   // Load auth data from localStorage on component mount
//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parsed = JSON.parse(data);
//       setAuth({ ...auth, user: parsed.user, token: parsed.token });
//     }
//   }, []);

//   // Logout function
//   const logout = () => {
//     setAuth({ user: null, token: "" }); // Clear auth state
//     localStorage.removeItem("auth"); // Remove auth data from localStorage
//     delete axios.defaults.headers.common["Authorization"]; // Clear Axios auth header
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };


import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const getInitialAuth = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : { user: null, token: "" };
  };

  const [auth, setAuth] = useState(getInitialAuth);

  // Configure Axios
  axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;

  // Sync auth state with localStorage when it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Logout function
  const logout = () => {
    setAuth({ user: null, token: "" }); // Clear auth state
    localStorage.removeItem("auth"); // Remove auth data from localStorage
    delete axios.defaults.headers.common["Authorization"]; // Clear Axios auth header
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
