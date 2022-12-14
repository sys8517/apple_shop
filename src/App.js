// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Button, Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import React, { createContext, useEffect, useState } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import DetailPage from "./page/Detail";
import MainPage from "./page/MainPage";
import axios from "axios";
import Cart from "./page/Cart";
import { useQuery } from "@tanstack/react-query";

//const Detail = lazy(()=> import('./page/Detail.js'))
//const Cart = lazy(()=> import('./page/Cart.js')) 
//해당 컴포넌트로 이동할 때 지연시간 발생


//context = state 보관함 같은 개념
export let Context1 = createContext();

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  const obj = { name: "sys" };

  let watched = JSON.parse(localStorage.getItem("watched"));

  localStorage.setItem("data", JSON.stringify(obj));
  const item = localStorage.getItem("data");
  console.log(JSON.parse(item));

  const navigate = useNavigate();
  const [content, setContent] = useState(data);
  const [nam, setNam] = useState([10, 11, 12]);

  // axios.get('https://codingapple1.github.io/userdata.json').then((a)=> {
  //   a.data
  // })

  //useQuery 쓰면 
  //1. 성공/실패/로딩중 쉽게 파악 가능
  //2. 틈날때마다 알아서 refresh 해줘서 sns, 실시간 시스템이 필요한 곳에 쓰기 좋음
  //3. 자동으로 retry 해줌 ( 요청 실패시 3~4번 다시 알아서 재요청함)
  //4. state 공유 안해도 됨 (부모/ 자식 컴포넌트에서 똑같은 요청 2번 적어도 알아서 1번만 해줌 똑똑함)
  //5. ajax 결과 캐싱기능 (이전에 같은 요청이 있었는데 5분 정도 내에 다시 같은 요청이 왔다면 이전요청의 결과를 우선 보여주고 다시 get요청 보냄)
  let result = useQuery(["plz"], () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        //return 과 중괄호는 동시 생략 가능, useQuery 쓸 땐 return 2개 꼭 확인
        console.log("요청")
        return a.data;
      })
      // ,{staleTime : 2000}
  });

  //result.data : 받아오는 걸 성공했을 때 데이터
  //result.error : 받아오는 걸 실패했을 때 true
  //result.isLoading : 요청중일 때 true




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
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
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
          <Nav style={{ color: "white" }}>{
            result.isLoading ? '로딩중' : result.data.name
          }</Nav>
        </Container>
      </Navbar>
      {/* <Link to="/">홈</Link>
    <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={<MainPage content={content} />} />
        <Route
          path="/detail/:id"
          element={
            // <Context1.Provider value={{nam, content}}>
            <DetailPage content={content} />
            // </Context1.Provider>
          }
        />
        {/* <Route path="/event" element={<><h4>오늘의 이벤트</h4> <Outlet/></>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
