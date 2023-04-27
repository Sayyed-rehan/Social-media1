import { configureStore } from '@reduxjs/toolkit'
import usersSlice from "./counterSlice"

export default configureStore({
  reducer: {
    users: usersSlice
  }
})