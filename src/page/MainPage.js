import img1 from "../img/bg_img.jpg";
import img2 from "../img/bgi.png";
import img3 from "../img/iii.jpg";
import React, { useState } from "react";

import data from "../data";
import { Button, Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MainPage(props) {
  const content = props.content;
  const [img] = useState([img1, img2, img3]);
  // const navigate = useNavigate();/
  return (
    <>
      <Container>
        <Row>
          {content.map((c, i) => {
            return (
              <Product
                
                title={c.title}
                content={c.content}
                price={c.price}
                img={img[i]}
                i={i}
                id={c.id}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
}

function Product(props) {
  const navigate = useNavigate()
  
  return (
    <Col sm>
      <img
      onClick={() => {
        navigate(`/detail/${props.id}`);
        
      }}
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <p>{props.price}원</p>
    </Col>
  );
}
