import {useEffect, useState} from "react";
import "./Game.scss";

export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);
    const [finish, setFinish] = useState(false);

    useEffect(() => {
        if(cd >1){
            setTimeout(()=>setCD(cd-1),1000);
        }

    },[cd])

    useEffect( () => {
        setTimeout(()=>{countdown();},3000);
        // setTimeout(() =>{clearCD();}, 3000);
    },[])

    const countdown = () => {

        document.getElementById("countdownStart").innerHTML = "GO !!";
        setTimeout(() => {clearCD();}, 1000);


    }
    const clearCD = () => {
        document.getElementById("countdownStart").className = 'hide';
        document.getElementById("game").className = '';
    }

    return(
        <>
        <div id="countdownStart">{cd}</div>
        <div id="game" className="hide">
            <div className="topStats">
                <span>Timer :</span>
                <span>Score :</span>
            </div>

            <form className="inputAnswer">
                <input type="text"  onChange={(e)=> setAnswer(e)} />
            </form>

        </div>
        </>
    );
}