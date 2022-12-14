import {createSlice} from '@reduxjs/toolkit'

const user = createSlice({ //useState 역할, state 하나를 slice 라고 부름
    name : 'user',
    initialState : {name : 'sys', age : 20},
    reducers : {
      changeName(state){ //기존 state
        return {name : 'son', age : 20}
      },
      increase(state, action){ //state 변경 함수들을 action 이라고 함
        state.age += action.payload
      },
    }
  
  
  })
  export let {changeName, increase} = user.actions
  export default user