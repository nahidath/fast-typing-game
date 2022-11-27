import {useEffect, useState} from "react";
import "./Game.scss";
import {useLocation} from "react-router-dom";

export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const [word, setWord] = useState("");
    const location = useLocation();
    const [file, setFile] = useState(null);
    const [inputEmpty, setInputEmpty] = useState(true);
    const [arrayWords, setArrayWords] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {

        if(!isLoaded){
            console.log("loaded");
            // txtToArray().then(r => console.log(r) );
            // txtToArray().then(file => console.log(file) );
            const func = async () => {
                let response;
                let data;
                if (location.state.lang === "fr") {
                    response = await fetch("./Lang/fr.txt");
                    data = await response.text();
                    setFile(data);
                    console.log(response);

                }
            }
            setIsLoaded(true);
            func().then(r => console.log(r));
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


    },[isRunning, isLoaded]);

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
                // getRandomWord();
            }else{
                clearInterval(interval);
            }
        },1000);


    }

    const submitAnswer = () => {
        setInputEmpty(false);
        let styleWord = document.getElementById("wordDisplay");
        if(answer === word){
            styleWord.style.backgroundColor = "#04BA16";
            setScore(score + 1);
        }else{
            styleWord.style.backgroundColor = "#C40F0A";
        }

        document.getElementById("input").value='';
        setInputEmpty(true);

    }

    const txtToArray = async () => {
        let response;
        let data;
        if (location.state.lang === "fr") {
            response = await fetch("./Lang/fr.txt");
            data = await response.text();
            setFile(data);
            console.log(response);
            // await fetch('./Gameplay/fr.txt')
            //     .then((r) => r.text())
            //     .then(text  => {
            //         console.log(text);
            //         setFile(text);
            //     })
            //     .catch((e) => console.log(e));
        }
        // else if (location.state.lang === "es") {
        //     fetch('../Languages/es.txt')
        //         .then((r) => r.text())
        //         .then(text => {
        //             setFile(text);
        //         })
        // } else if (location.state.lang === "de") {
        //     fetch('../Languages/de.txt')
        //         .then((r) => r.text())
        //         .then(text => {
        //             setFile(text);
        //         })
        // } else if (location.state.lang === "en") {
        //     fetch('../Languages/en.txt')
        //         .then((r) => r.text())
        //         .then(text => {
        //             setFile(text);
        //         })
        // }

        // setArrayWords(file.split(/\r?\n/));
        // console.log(arrayWords);
    }

    const getRandomWord = () => {
        const rndWord = Math.floor(Math.random() * arrayWords.length);
        setWord(arrayWords[rndWord]);
    }

    return(
        <>
        <div id="countdownStart">{cd}</div>
        <div id="game" className="hide">
            <div className="topStats">
                <span>Timer : {timer}</span>
                <span>Score : {score}</span>
            </div>

            <div id="wordDisplay">{word}</div>
            <form className="inputAnswer" onSubmit={submitAnswer}>
                <input type="text" id="input"  onChange={(e)=> setAnswer(e)} />
            </form>

        </div>
        </>
    );
}