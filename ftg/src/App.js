import {Route, Router, Routes, useNavigate} from "react-router-dom";
import './App.scss';
import {VscDebugRestart} from "react-icons/vsc";
import {Button} from "react-bootstrap";
import Home from "./Gameplay/Home";
import Game from "./Gameplay/Game";
import Choose from "./Gameplay/Choose";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import {useState} from "react";


function App() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  // let audio = new Audio("http://localhost:3000/Beat_One.mp3");
  // audio.play().then(r => console.log(r)).catch(e => console.log(e));
  // audio.loop = true;
  let audio = document.getElementById("audio");
  audio.play();

  const goToHomePage = () => {
    navigate("/", {replace: true});
  }
  const muteBtn = () => {
      console.log(isMuted);
      if (!isMuted) {
          audio.pause();
          setIsMuted(true);
      }else{
          audio.play();
          setIsMuted(false);
      }

  }

  return (
      <>
        <div id="sound">
            {isMuted ? <HiSpeakerXMark className="speaker" color={"#ea0000"} size={35} onClick={muteBtn}/> : <HiSpeakerWave className="speaker" color={"#ffffff"} size={35} onClick={muteBtn}/>}
            {/*<HiSpeakerWave size={35} color={"#ffffff"} className="speaker"/>*/}
            <audio id="audio" src="http://localhost:3000/Beat_One.mp3" preload="auto"></audio>
        </div>
        <div className="logo">
          {/*<img src="/logo.png" alt="Logo" />*/}
        </div>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/lang' element={<Choose/>} />
            <Route path='/start' element={<Game/>} />
          </Routes>
        </div>
        <button className="restart" onClick={goToHomePage}><VscDebugRestart /> Restart</button>
        {/*<div id="restart" className="restart">*/}
        {/* */}
        {/*</div>*/}
      </>
  );
}

export default App;
