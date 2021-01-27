import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Posts from "./Components/posts/Posts";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCamera} from "@fortawesome/free-solid-svg-icons";
import Signup from "./Components/signup/Signup";
import RefForm from "./refer/RefForm";

function App() {
  const [value, setval] = useState("");
  const [query,setq] = useState([]);
  var temparr;
  function Onmysubmit(){
    console.log("hai")
     temparr=[...query,value]
     setq(temparr);
  }
  return (
    <div className="App">
      <Container id="cont">
        <Row id="myrow1" >
        
          <Col md={10} id="col1" className="d-flex flex-column align-items-center">
            <input></input>
            <textarea
              value={value}
              onChange={(e) => setval(e.target.value)}
              placeholder="Ask a question"
              id="txt"
            ></textarea>
            <FontAwesomeIcon icon={faCamera} size="2x" id="cam"></FontAwesomeIcon>
            <Button type="submit" onClick={()=>Onmysubmit()}>Submit</Button>
          </Col>
          
        </Row>
        
      </Container>

      <Posts query={query}></Posts>

      <Signup></Signup>

      <RefForm></RefForm>
    </div>
  );
}

export default App;
 