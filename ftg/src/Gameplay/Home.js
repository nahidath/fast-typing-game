import {useNavigate} from "react-router-dom";
import {BsFillPlayCircleFill} from "react-icons/bs";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();

    const goToStart = () => {
        navigate("/lang", {replace: true});
    }

    return(
        <>
            <div className="logo">
                Fast<br/>&emsp;&emsp;Word
            </div>
            <div className="home">
                <div className="gameTitle">
                    How fast are you ?
                </div>
                <div className="iconBackground">
                    {/*<BsFillPlayCircleFill color={"#eac300"} size={120} onClick={goToStart} className="playGame"/>*/}
                </div>
                <BsFillPlayCircleFill color={"#2B0853"} size={120} onClick={goToStart}className="playGame"/>
                <h4 className="start-msg">Let's start !!</h4>
            </div>
        </>

    )
}
