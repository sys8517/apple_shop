import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, {useState, useEffect} from 'react';

let Btn = styled.button`
  background : ${props => props.bg}; 
  color : ${props => props.bg == 'blue'? 'white' : 'black'};
  padding : 10px;
`
// props => props.bg 는 외부 라이브러리 문법

export default function DetailPage(props) {
  // const content = props.content;
  let {id} = useParams();
  const [alert, setAlert] = useState(true);
  
  useEffect(()=> {
    setTimeout(()=>{setAlert(false)}, 2000)
  }, [])
  return (
    <>
      <div className="container">
        { alert==true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null}
        
        <Btn bg = "blue">파란버튼</Btn>
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
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
}