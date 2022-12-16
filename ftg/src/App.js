import {Route, Routes, useNavigate} from "react-router-dom";
import './App.scss';
import Home from "./Gameplay/Home";
import Game from "./Gameplay/Game";
import Choose from "./Gameplay/Choose";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import {useEffect, useState} from "react";
import {IoHome} from "react-icons/io5";



function App() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  let audioURL = process.env.PUBLIC_URL + '/Beat_One.mp3';
  localStorage.setItem("muted", JSON.stringify(isMuted));



  useEffect(() => {
      setIsMuted(JSON.parse(localStorage.getItem("muted")));
      setCurTime();

  },[]);

  const goToHomePage = () => {
    navigate("/", {replace: true});
  }
  const muteBtn = () => {
      if (!isMuted) {
          setIsMuted(true);
      }else{
          setIsMuted(false);

      }

  }

  const setCurTime = () => {
      let audio = document.getElementById("audio");
      audio.currentTime = 3;
  }


  return (
      <>
        <div id="sound">
            {isMuted ? <HiSpeakerXMark className="speaker" color={"#ea0000"} size={40} onClick={muteBtn}/> : <HiSpeakerWave className="speaker" color={"#ffffff"} size={40} onClick={muteBtn}/>}
            <audio id="audio" src={audioURL} autoPlay={true} loop={true} muted={isMuted}/>
        </div>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/lang' element={<Choose/>} />
            <Route path='/start' element={<Game/>} />
          </Routes>
        </div>
        <button className="restart" onClick={goToHomePage}><IoHome /> Home</button>
      </>
  );
}

export default App;
