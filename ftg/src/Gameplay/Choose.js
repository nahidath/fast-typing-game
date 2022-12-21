import "./Choose.scss";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {useState} from "react";


export default function Choose(){

    const navigate = useNavigate();

    const handleLangClick = (lang) => {
        navigate("/start/", {state: {lang: lang}, replace: true});
    }

    const [selected, setSelected] = useState(null);

    return(
        <>
            <div className="logo">
                Fast<br/>&emsp;&emsp;Word
            </div>
            <div className="language-select">
                <label htmlFor="language">Choose a language :</label>
                <select name="languages" id="languages" onChange={(e) => setSelected(e.target.value)}>
                    <option value="none" selected disabled hidden>Select an Option</option>
                    <option  value="fr"><img src={process.env.PUBLIC_URL + '/Flags/france.png'}/> French</option>
                    <option value="en"><img src={process.env.PUBLIC_URL + '/Flags/united-kingdom.png'}/> English</option>
                    <option value="de"><img src={process.env.PUBLIC_URL + '/Flags/germany.png'}/> Deutsch</option>
                    <option value="es"><img src={process.env.PUBLIC_URL + '/Flags/spain.png'}/> Spanish</option>
                </select>
                <Button className="btn-choose" onClick={() => handleLangClick(selected)}><FaCheck id="check-icon"/></Button>
            </div>
        </>

    )
}