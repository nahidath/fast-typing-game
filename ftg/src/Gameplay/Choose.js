import "./Choose.scss";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";



export default function Choose(){

    const navigate = useNavigate();

    const handleLangClick = (flag) => {
        let lang;
        if(flag === "french"){
            lang = "fr";
        }else if(flag === "english"){
            lang = "en";
        }else if(flag === "deutsch"){
            lang = "de";
        }else if(flag === "spanish"){
            lang = "es";
        }
        navigate("/start/", {state: {lang: lang}, replace: true});
    }

    let flags = [
        {name : "french", flagImg : 'france.png'},
        {name : "deutsch", flagImg : 'germany.png'},
        {name : "spanish", flagImg : 'spain.png'},
        {name : "english", flagImg : 'united-kingdom.png'}
    ];

    return(
        <>
            <div className="logo">
                Fast<br/>&emsp;&emsp;Word
            </div>
            <div className="language-select">
                <label htmlFor="language">Choose a language :</label>
                <div className="flag-container">
                    {flags.map((flag, index) => (

                        <Row key={index} xs={1} md={2} className="g-4">
                            <Col>
                                <Card key={flag.name}
                                        onClick={() => handleLangClick(flag.name)}
                                        className="card-flags"
                                >
                                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/Flags/' + flag.flagImg} />
                                </Card>
                                <h6 className="flag-name">{flag.name}</h6>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </>

    )
}