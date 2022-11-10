import {useNavigate} from "react-router-dom";
import {BsFillPlayCircleFill} from "react-icons/bs";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();

    const goToStart = () => {
        navigate("/start", {replace: true});
    }

    return(
        <div className="home">
            <div className="gameTitle">
                Fast Word<br/>How fast are you ?
            </div>
            <div className="iconBackground">
                <BsFillPlayCircleFill color={"#eac300"} size={120} onClick={goToStart} className="playGame"/>
            </div>
            <h4 className="start-msg">Let's start !!</h4>
        </div>
    )
}
