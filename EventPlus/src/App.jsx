import './App.css';
import Rotas from './routes';
import { UserContext } from "./context/AuthContext";

function App() {
  const [userData, setUsarData] = useState({})
  return (
    <UserContext.Provider value = {{ userData, setUserData }}>
    <Rotas/>
    </UserContext.Provider>
  );
}

export default App;
