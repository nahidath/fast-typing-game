import "./Choose.scss";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {useState} from "react";


export default function Choose(){

    const navigate = useNavigate();

    const handleLangClick = (lang) => {
        console.log(lang);
        navigate("/start/"+ lang, {replace: true});
    }

    const [selected, setSelected] = useState(null);
    console.log(selected);

    return(
        <div className="language-select">
            <label htmlFor="language">Choose a language :</label>
            <select name="languages" id="languages" onChange={(e) => setSelected(e.target.value)}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option  value="fr">French</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Spanish</option>
            </select>
            <Button className="btn-choose" onClick={() => handleLangClick(selected)}><FaCheck id="check-icon"/></Button>
        </div>
    )
}