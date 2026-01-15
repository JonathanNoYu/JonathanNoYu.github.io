import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './notifSlice'

export const store = configureStore({
  reducer: {
    notifs: notifReducer,
  },
})
