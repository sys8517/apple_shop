import React, { memo, useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeName, increase } from "./../store/userSlice";
import {plus} from "./../store/cartSlice";


let Child = memo(function(){ //꼭 필요할때만 재렌더링, memo의 원리: props가 변할 때만 재렌더링 해줌
  console.log("재랜더링됨")
  return <div>자식임</div>
})



// function 함수(){
//   return 반복문 10억번 돌린결과
// }


export default function Cart() {
  // useMemo(()=> {return 함수()}, [state]) useEffect 처럼 처음에 한 번만 실행, useEffect랑 실행 시점이 다름
  const state = useSelector((state) => {
    return state;
  }); // (state) => state.stock 도 가능. (return문 한줄 시 괄호와 return단어 생략, 특정 state만 가져오고 싶을 시 .state이름 )

  const dispatch = useDispatch(); //store.js로 요청을 보내주는 함수
  const [count, setCount] = useState(0)




  return (
    <div>
      <Child/>
      <button onClick={()=>{setCount(count+1)}}>+</button>

      <h6>{state.user.name} {state.user.age}의 장바구니</h6>
      <button onClick={()=>{dispatch(increase(100))}}>버튼</button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((c, i) => {
            return(<tr>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.count}</td>
              <td><button onClick={()=>{
                dispatch(plus(c.id))
              }}>+</button></td>
            </tr>);
          })}

          {/* <tr>
          <td>3</td>
          <td colSpan={3}>ㅇㅇ</td>
        </tr> */}
        </tbody>
      </Table>
    </div>
  );
}
