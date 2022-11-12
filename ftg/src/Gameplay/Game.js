import {useEffect, useState} from "react";
import "./Game.scss";

export default function Game(){

    const [answer, setAnswer] = useState("");
    const [cd, setCD] = useState(3);

    useEffect(() => {
        countdown();
    },[])

    const countdown = () => {
        // setTimeout(()=>setCD(3-1),1000);
        setTimeout(function (){
            setCD(cd-1);
            if (cd == 0){
                document.getElementById("countdownStart").innerHTML = "GO !!";
                document.getElementById("countdownStart").className = 'hide';
                document.getElementById("game").className = '';

            }
            document.getElementById("countdownStart").innerHTML = cd;
        },1000)
    }

    return(
        <>
        <div id="countdownStart"></div>
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