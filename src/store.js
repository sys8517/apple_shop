import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import cart from './store/cartSlice.js'




const stock = createSlice({ //useState 역할, state 하나를 slice 라고 부름
  name : 'stock',
  initialState : [10, 11, 12]
})



export default configureStore({ //여기에 등록해야 사용가능
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer

   }
}) 