import { useState } from "react";
import Router from "./router/index";
import { AuthContext } from "./API/context/index";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setAdmin] = useState(localStorage.getItem("isAdmin"));
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        setAdmin,
        isAdmin,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
