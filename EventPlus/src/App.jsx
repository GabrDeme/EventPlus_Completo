import { useEffect, useState } from "react";
import { UserContext } from "./context/AuthContext";
import "./App.css";

import Rotas from "./routes";
//importa nosso app encapsulado pelo sistema de roteamento

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserData(token === null ? {} : JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;
