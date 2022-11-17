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
    const [file, setFile] = useState("");
    const [inputEmpty, setInputEmpty] = useState(true);
    // const {readFileSync, promises: fsPromises} = require('fs');
    // const fs = require('fs').promises;

    useEffect(() => {
        if(cd >1){
            setTimeout(()=>setCD(cd-1),1000);
        }

    },[cd])

    useEffect( () => {
        txtToArray();
        setTimeout(()=>{countdown();},3000);
        // setTimeout(() =>{clearCD();}, 3000);
    },[])

    useEffect(() => {
        if(playing && timer > 0 && inputEmpty){
            getRandomWord();
            setTimeout( ()=> setTimer(timer-1), 1000);
            submitAnswer();
        }

    },[playing, timer, inputEmpty])

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

    const txtToArray = () => {
        if(language == "fr"){
            fetch('../Languages/fr.txt')
                .then((r) => r.text())
                .then(text  => {
                    setFile(text)
                })
        }else if(language == "es"){
            fetch('../Languages/es.txt')
                .then((r) => r.text())
                .then(text  => {
                    setFile(text);
                })
        }else if(language == "de"){
            fetch('../Languages/de.txt')
                .then((r) => r.text())
                .then(text  => {
                    setFile(text);
                })
        }else if(language == "en") {
            fetch('../Languages/en.txt')
                .then((r) => r.text())
                .then(text  => {
                    setFile(text);
                })
        }

        const arr = file.split(/\r?\n/);
        return arr;

    }

    const getRandomWord = () => {
        let arrayWords = txtToArray();

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