import { useState } from "react";
import Router from "./router/index";
import { AuthContext } from "./API/context/index";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
