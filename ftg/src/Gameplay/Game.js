import {useEffect, useState} from "react";
import "./Game.scss";
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const [word, setWord] = useState("");
    const location = useLocation();
    const [file, setFile] = useState("");
    const [inputEmpty, setInputEmpty] = useState(true);
    const [arrayWords, setArrayWords] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {


        if(!isLoaded){
            console.log("loaded");
            getDataAxios();
            // txtToArray().then(r => setArrayWords(r) );
            // getDataAxios();
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
                getRandomWord();

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

    const getDataAxios = () => {
        axios.get('http://localhost:3000/Lang/fr.txt')
            .then(response => {
                const data = response.data;
                const dataSplit = data.split(/\r?\n/, 10);
                console.log(dataSplit);
                setArrayWords(dataSplit);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const txtToArray = async () => {
        let response;
        let data;
        if (location.state.lang === "fr") {
            response = await fetch("http://localhost:3000/Lang/fr.txt");
            data = await response.text();
        }
        // else if (location.state.lang === "es") {
        //     response = await fetch('http://localhost:3000/Lang/es.txt');
        //     data = await response.text();
        //     setFile(data);
        // } else if (location.state.lang === "de") {
        //     response = await fetch('http://localhost:3000/Lang/de.txt');
        //     data = await response.text();
        //     setFile(data);
        // } else if (location.state.lang === "en") {
        //     response = await fetch('http://localhost:3000/Lang/en.txt');
        //     data = await response.text();
        //     setFile(data);
        // }

        const dataSplit = data.split(/\r?\n/, 10);
        setArrayWords(arrayWords => [...arrayWords, dataSplit ]);
        return dataSplit;
    }

    const getRandomWord = () => {
        console.log("getRandomWord");
        console.log(arrayWords);
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