import img1 from "../img/bg_img.jpg";
import img2 from "../img/bgi.png";
import img3 from "../img/iii.jpg";
import React, { useState } from "react";
import bg_img from "../img/iii.jpg";
import data from "../data";
import { Button, Navbar, Container, Nav, Col, Row } from "react-bootstrap";

export default function MainPage(props) {
    const content = props.content;
    const [img] = useState([img1, img2, img3]);
  return (
    <>
      <div
        className="main-bg"
        style={{
          backgroundImage: "url(" + bg_img + ")",
          marginBottom: "20px",
        }}
      ></div>
      <Container>
        <Row>
          {content.map((c, i) => {
            return (
              <Product
                title={c.title}
                content={c.content}
                price={c.price}
                img={img[i]}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
}

function Product(props) {
    return (
      <Col sm>
        <img src={props.img} width="80%" />
        {console.log(props.img)}
        <h4>{props.title}</h4>
        <p>{props.content}</p>
        <p>{props.price}원</p>
      </Col>
    );
  }