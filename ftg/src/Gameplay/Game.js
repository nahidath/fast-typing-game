import {useEffect, useState} from "react";
import "./Game.scss";
// import {readFileSync, promises as fsPromises} from 'fs';

export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);
    const [playing, setPlaying] = useState(false);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const [word, setWord] = useState("");
    const [language, setLanguage] = useState("");
    const pathArray = window.location.pathname.split("/");
    setLanguage(pathArray[2]);
    // const {readFileSync, promises: fsPromises} = require('fs');
    // const fs = require('fs').promises;

    useEffect(() => {
        if(cd >1){
            setTimeout(()=>setCD(cd-1),1000);
        }

    },[cd])

    useEffect( () => {
        setTimeout(()=>{countdown();},3000);
        // setTimeout(() =>{clearCD();}, 3000);
    },[])

    useEffect(() => {
        if(playing && timer > 0){
            setTimeout( ()=> setTimer(timer-1), 1000);
            // updtScore();
        }

    },[playing, timer])

    const countdown = () => {
        document.getElementById("countdownStart").innerHTML = "GO !!";
        setTimeout(() => {clearCD();}, 1000);


    }
    const clearCD = () => {
        setPlaying(true);
        document.getElementById("countdownStart").className = 'hide';
        document.getElementById("game").className = '';
        document.getElementById("input").focus();
    }

    const updtScore = () => {
        if(answer == word){
            setScore(score + 1);
        }

    }

    // const txtToArray = async () => {
    //     let file;
    //     try {
    //         if(language == "fr"){
    //             file = await fs.readFile("../Languages/fr.txt");
    //         }else if(language == "es"){
    //             file = await fs.readFile("../Languages/es.txt");
    //         }else if(language == "de"){
    //             file = await fs.readFile("../Languages/de.txt");
    //         }else if(language == "en") {
    //             file = await fs.readFile("../Languages/en.txt");
    //         }
    //
    //         const arr = file.split(/\r?\n/);
    //         return arr;
    //     }catch (e) {
    //         console.log(e);
    //     }
    // }
    //
    // const getRandomWord = () => {
    //     let arrayWords = txtToArray();
    //
    //     const rndWord = Math.floor(Math.random() * arrayWords.length);
    //     setWord(arrayWords[rndWord]);
    // }

    return(
        <>
        <div id="countdownStart">{cd}</div>
        <div id="game" className="hide">
            <div className="topStats">
                <span>Timer : {timer}</span>
                <span>Score : {score}</span>
            </div>

            <div id="wordDisplay"></div>
            <form className="inputAnswer" onSubmit={updtScore}>
                <input type="text" id="input"  onChange={(e)=> setAnswer(e)} />
            </form>

        </div>
        </>
    );
}