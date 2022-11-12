import {Route, Router, Routes, useNavigate} from "react-router-dom";
import './App.scss';
import {VscDebugRestart} from "react-icons/vsc";
import {Button} from "react-bootstrap";
import Home from "./Gameplay/Home";
import Game from "./Gameplay/Game";


function App() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/", {replace: true});
  }

  return (
      <>
        <div className="logo">
          {/*<img src="/logo.png" alt="Logo" />*/}
        </div>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/start" element={<Game/>} />
            {/*<Route path="/end" element={<EndGame/>} />*/}
          </Routes>
        </div>
        <div className="restart">
          <VscDebugRestart onClick={goToHomePage}/> Restart
        </div>
      </>
  );
}

export default App;
