// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Button, Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import DetailPage from "./page/Detail";
import MainPage from "./page/MainPage";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [content, setContent] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Blog
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
          <button
            onClick={() => {
              axios
                .get("https://codingapple1.github.io/shop/data2.json")
                .then((res) => {
                  // console.log(res.data)
                  // let copy = [...content];
                  // res.data.map((d,i)=> {
                  //   copy.push(d);
                  // })
                  // setContent(copy);
                  let copy = [...content, ...res.data];
                  setContent(copy);
                });
            }}
          >
            더보기
          </button>
        </Container>
      </Navbar>
      {/* <Link to="/">홈</Link>
    <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={<MainPage content={content} />} />
        <Route path="/detail/:id" element={<DetailPage content={content} />} />
        {/* <Route path="/event" element={<><h4>오늘의 이벤트</h4> <Outlet/></>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route> */}
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
