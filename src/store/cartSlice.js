import { configureStore, createSlice } from '@reduxjs/toolkit'


const cart = createSlice({ //useState 역할, state 하나를 slice 라고 부름
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ] ,
    reducers : {
      plus(state, id) {
        //const index = state.findIndex((a)=>{return a.id==id.payload})
        //state[index].count++
        state.map((s, i)=> {
          if(s.id==id.payload) {
            s.count+=1
          }
        })
      },
      addItem(state, item){
        console.log(item)
        console.log(item.payload.title)
        state.push({
            id : item.payload.id,
            name : item.payload.title,
            count : 1,
        })
        console.log(state)
      }
    }
  })
  
  export let {plus, addItem} = cart.actions
  export default cart;