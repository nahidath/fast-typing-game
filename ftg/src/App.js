import {Route, Router, Routes, useNavigate} from "react-router-dom";
import './App.scss';
import Home from "./Gameplay/Home";
import Game from "./Gameplay/Game";
import Choose from "./Gameplay/Choose";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import {useEffect, useRef, useState} from "react";
import Sound from 'react-sound';
import {IoHome} from "react-icons/io5";



function App() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);
  let audioURL = process.env.PUBLIC_URL + '/Beat_One.mp3';
  localStorage.setItem("muted", JSON.stringify(isMuted));

  useEffect(() => {
      setIsMuted(JSON.parse(localStorage.getItem("muted")));
      setPosition(soundCmp.current.position);
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

  const soundCmp = useRef();
  // console.log(soundCmp.sound.position);

  return (
      <>
        <div id="sound">
            {isMuted ? <HiSpeakerXMark className="speaker" color={"#ea0000"} size={35} onClick={muteBtn}/> : <HiSpeakerWave className="speaker" color={"#ffffff"} size={35} onClick={muteBtn}/>}
            <Sound
                url={audioURL}
                playStatus={!isMuted ? Sound.status.PLAYING : Sound.status.STOPPED}
                playFromPosition={position}
                autoLoad={true}
                loop={true}
                ref={soundCmp}

            />
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
        <button className="restart" onClick={goToHomePage}><IoHome /> Home</button>
      </>
  );
}

export default App;
