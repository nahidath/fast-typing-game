import {useEffect, useState} from "react";
import "./Game.scss";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {GiCrossMark} from "react-icons/gi";
import {IoHome} from "react-icons/io5";


export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const location = useLocation();
    const [arrayWords, setArrayWords] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {


        if(!isLoaded){
            getDataAxios();
            setIsLoaded(true);
        }
        if (!isRunning){
            let i = cd-1;
            const interval = setInterval(()=>{
                if(i >= 1) {
                    setCD(i);
                    i--;
                }else{
                    clearInterval(interval);
                    startGame();
                }
            },1000);
            setIsRunning(true);
        }
        if(started && timer > 0){
            getRandomWord();
            nextWord();
        }



    },[isRunning, isLoaded, started, timer]);

    const startGame = () => {
        document.getElementById("countdownStart").innerHTML = "GO !!";
        setTimeout(() => {displayGame();}, 1000);


    }
    const displayGame = () => {
        document.getElementById("countdownStart").className = 'hide';
        document.getElementById("game").className = '';
        document.getElementById("input").focus();
        let i = timer-1;
        const interval = setInterval(()=>{
            if(i >= 0) {
                setTimer(i);
                i--;
                setStarted(true);

            }else{
                clearInterval(interval);
                setStarted(false);
                setIsFinished(true);
            }
        },1000);

        if(isFinished) {
            // document.getElementById("restart").classList.add("hide");
            document.getElementById("endGame").classList.remove("hide");
        }
    }

    const submitAnswer = (event) => {
        event.preventDefault();
        let key;
        let isCorrect = false;
        if(document.getElementById("input").value === ''){
            return;
        }else{
            let allWords = document.getElementById("wordDisplay").querySelectorAll("span");
            for(let i = 0; i < allWords.length; i++){
                if(allWords[i].innerHTML === answer){
                    isCorrect = true;
                    key = i;
                    break;
                }else{
                    key = i;
                    isCorrect = false;
                    document.getElementById("crossMark").classList.remove("hidden");
                    setTimeout(() => {
                        document.getElementById("input").value='';
                        document.getElementById("crossMark").classList.add("hidden");
                    }, 400);


                }
            }
            if(isCorrect){
                console.log("key",key);
                allWords[key].style.backgroundColor = "#04BA16";
                setScore(score+1);
            }
            document.getElementById("input").value='';
        }

    }

    const getDataAxios = () => {
        if (location.state.lang === "fr"){
            axios.get('http://localhost:3000/Lang/fr.txt')
                .then(response => {
                    const data = response.data;
                    const dataSplit = data.split(/\r?\n/, 10);
                    const dataShuffle = dataSplit.sort(() => Math.random() - 0.5);
                    setArrayWords(dataShuffle);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (location.state.lang === "en"){
            axios.get('http://localhost:3000/Lang/en.txt')
                .then(response => {
                    const data = response.data;
                    const dataSplit = data.split(/\r?\n/, 10);
                    const dataShuffle = dataSplit.sort(() => Math.random() - 0.5);
                    setArrayWords(dataShuffle);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (location.state.lang === "es"){
            axios.get('http://localhost:3000/Lang/es.txt')
                .then(response => {
                    const data = response.data;
                    const dataSplit = data.split(/\r?\n/, 10);
                    const dataShuffle = dataSplit.sort(() => Math.random() - 0.5);
                    setArrayWords(dataShuffle);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (location.state.lang === "de"){
            axios.get('http://localhost:3000/Lang/de.txt')
                .then(response => {
                    const data = response.data;
                    const dataSplit = data.split(/\r?\n/, 10);
                    const dataShuffle = dataSplit.sort(() => Math.random() - 0.5);
                    setArrayWords(dataShuffle);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }


    const getRandomWord = () => {
        const rndWord = Math.floor(Math.random() * arrayWords.length);
        return arrayWords[rndWord];
    }

    const nextWord = () => {
        const word = getRandomWord();
        const wordDiv = document.createElement('span');
        wordDiv.style.padding = "10px";
        wordDiv.style.display = "inline-block";
        wordDiv.innerText = word;
        document.getElementById("wordDisplay").appendChild(wordDiv);

    }

    const restartGame = () => {
        navigate("/", {replace: true});
    }

    return(
        <>
        {/*<div id="countdownStart">{cd}</div>*/}
        {/*<div id="game" className="hide">*/}
        {/*    <div className="topStats">*/}
        {/*        <span>Timer : {timer}</span>*/}
        {/*        <span>Score : {score}</span>*/}
        {/*    </div>*/}

        {/*    <div id="wordDisplay"></div>*/}
        {/*    <form className="inputAnswer" onSubmit={submitAnswer}>*/}
        {/*        <input type="text" id="input"  onChange={(e)=> setAnswer(e.target.value)} /><GiCrossMark id="crossMark" className="hidden" size={30}/>*/}
        {/*    </form>*/}

        {/*</div>*/}
            <div id="endBckgrnd" >
                <div className="endGame" id="endGame" >
                    <h4>GAME OVER</h4>
                    <img src="http://localhost:3000/alarm-clock.png" alt="timeBroken"/>
                    <h5>Your score is : {score}</h5>
                    <button onClick={restartGame}><IoHome size={30}/></button>
                </div>
            </div>

        </>
    );
}