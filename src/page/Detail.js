import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { Nav } from "react-bootstrap";
import {Context1} from './../App.js';
import cart, {addItem} from "./../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
// import '../App.css';

let Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
// props => props.bg 는 외부 라이브러리 문법

export default function DetailPage(props) {
  let { id } = useParams();

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch()

  // let {nam, content} = useContext(Context1);

  // const content = props.content;
  
  const [alert, setAlert] = useState(true);
  const [tab, setTab] = useState(0);
  const [on, setOn] = useState('');
  const findItem = props.content.find(x => x.id == id);

  useEffect(()=> {
      console.log(findItem.id)
      let arr = JSON.parse(localStorage.getItem('watched'));
      if(arr.includes(findItem.id)){

      }else{
      arr.push(findItem.id)
      //arr = new Set(arr)
      //arr = Array.from(arr)
      localStorage.setItem('watched', JSON.stringify(arr))
    }
  },[])



  // const [txt, setTxt] = useState();
  // const [warning, setWarning] = useState(false);

  // useEffect(() => {
  //   if (isNaN(txt) == true) {
  //     setWarning(true);
  //   } else {
  //     setWarning(false);
  //   }
  // }, [txt]);
  useEffect(()=> {
    const t = setTimeout(()=>{setOn('end')}, 100)
    return ()=> {
      clearTimeout(t);
      setOn('');
    }
  }, [])
  return (
    <>
      <div className={`container start ${on}`} >
        {alert == true ? (
          <div className="alert alert-warning">2초 이내 구매시 할인</div>
        ) : null}


        {/* <Btn bg="blue">파란버튼</Btn> */}
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.content[id].title}</h4>
            <p>{props.content[id].content}</p>
            <p>{props.content[id].price}원</p>
            <button className="btn btn-danger" onClick={()=>{dispatch(addItem(props.content[id]))}}>주문하기</button>
            {/* dispatch(addItem({id : ~, name : ~, count : ~})) */}



            
            {/* {
              state.cart.map((c, i)=> {
                console.log(`!!!!!${c.name}`)    
                console.log(`!!!!!COUNT : ${c.count}`)    
                console.log(`!!!!!ID : ${c.id}`)    
              })
            } */}




            {/* {warning == true ? <p>숫자만 입력하세요</p> : null}
            <input
              type="text"
              onChange={(e) => {
                setTxt(e.target.value);
              }}
              placeholder="배송 희망 시간"
            ></input> */}
          </div>
        </div>
        <Nav variant="pills" defaultActiveKey="link0">
          <Nav.Item
            onClick={() => {
              setTab(0);
            }}
          >
            <Nav.Link eventKey="link0">Tab1</Nav.Link>
          </Nav.Item>
          <Nav.Item
            onClick={() => {
              setTab(1);
            }}
          >
            <Nav.Link eventKey="link1">Tab2</Nav.Link>
          </Nav.Item>
          <Nav.Item
            onClick={() => {
              setTab(2);
            }}
          >
            <Nav.Link eventKey="link2">Tab3</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
        {/* {tab == 0 ? <div>내용0</div> : null}
        {tab == 1 ? <div>내용1</div> : null}
        {tab == 2 ? <div>내용2</div> : null} */}
      </div>
    </>
  );
}
function TabContent(props) {
  //(props) => ({tab})
  const [fade, setFade] = useState('');
  useEffect(()=> {
    const a = setTimeout(()=>{setFade('end')}, 100)
    
    return()=> {
      clearTimeout(a);
      setFade('');
    }

  }, [props.tab])
  return <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>
  
  // if (props.tab == 0) {
  //   return <div>내용0</div>;
  // } else if (props.tab == 1) {
  //   return <div>내용1</div>;
  // } else if (props.tab == 2) {
  //   return <div>내용2</div>;
  // }

  // ==> return [<div>내용0</div>;,<div>내용1</div>;,<div>내용2</div>;][tab]
}
