import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Login } from './components/login/Login';
import {Therapist} from './components/therapist/Therapist';
import { Client } from './components/client/Client';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/therapist" element={<Therapist/>} />
        <Route path="/client" element={<Client/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
