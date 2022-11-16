import "./Choose.scss";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {useState} from "react";


export default function Choose(){

    const navigate = useNavigate();

    const handleLangClick = (lang) => {
        navigate("/star/"+ lang, {replace: true});
    }

    const [selected, setSelected] = useState("");

    return(
        <form className="language-select">
            <label for="language">Choose a language :</label>
            <select name="languages" id="languages" onChange={(e) => setSelected(e.target.value)}>
                <option value="fr">French</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Spanish</option>
            </select>
            <Button className="btn-choose" onSubmit={() => handleLangClick(selected)}><FaCheck id="check-icon"/></Button>
        </form>
    )
}