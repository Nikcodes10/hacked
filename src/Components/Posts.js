import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Posts(props) {
  const [myarry, setmyarry] = useState([]);
  console.log(props);
  
    var myq = props.query.map((q) => {
      return (
        <div key={q} id="subq">
          <p>{q}</p>
        </div>
      );
    });
    //setmyarry(myq);
    console.log(props.query.length)
    console.log(myq)
  
   
  if (myq.length !== 0) {
    return (
      <Container fluid id="mycont">
        <Row>
          <Col md={10} id="myrow2">
            {myq}
          </Col>
        </Row>
      </Container>
    );
  }
  else{
      return <div></div>
  }
}

export default Posts;
