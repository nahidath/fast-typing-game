import "./Choose.scss";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Row} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {useState} from "react";


export default function Choose(){

    const navigate = useNavigate();

    const handleLangClick = (flag) => {
        let lang;
        const myArray = flag.split(".")[0];
        if(myArray === "france"){
            lang = "fr";
        }else if(myArray === "united-kingdom"){
            lang = "en";
        }else if(myArray === "germany"){
            lang = "de";
        }else if(myArray === "spain"){
            lang = "es";
        }
        navigate("/start/", {state: {lang: lang}, replace: true});
    }

    const [selected, setSelected] = useState(null);
    let flags = ['france.png', 'germany.png', 'spain.png', 'united-kingdom.png'];

    return(
        <>
            <div className="logo">
                Fast<br/>&emsp;&emsp;Word
            </div>
            <div className="language-select">
                <label htmlFor="language">Choose a language :</label>
                {/*<select name="languages" id="languages" onChange={(e) => setSelected(e.target.value)}>*/}
                {/*    <option value="none" selected disabled hidden>Select an Option</option>*/}
                {/*    <option  value="fr"><img src={process.env.PUBLIC_URL + '/Flags/france.png'}/> French</option>*/}
                {/*    <option value="en"><img src={process.env.PUBLIC_URL + '/Flags/united-kingdom.png'}/> English</option>*/}
                {/*    <option value="de"><img src={process.env.PUBLIC_URL + '/Flags/germany.png'}/> Deutsch</option>*/}
                {/*    <option value="es"><img src={process.env.PUBLIC_URL + '/Flags/spain.png'}/> Spanish</option>*/}
                {/*</select>*/}
                {/*<Button className="btn-choose" onClick={() => handleLangClick(selected)}><FaCheck id="check-icon"/></Button>*/}
                {/*<span>Choose a Language</span>*/}

                <div className="flag-container">
                    {flags.map((flag, index) => (

                        <Row key={index} xs={1} md={2} className="g-4">
                            <Col>
                                <Card key={index}
                                        onClick={() => handleLangClick(flag)}
                                        className="card-flags"
                                >
                                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/Flags/' + flag} />
                                </Card>
                                <h6 className="flag-name">{flag.split(".")[0]}</h6>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </>

    )
}