import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: { articlesReducer, authReducer },
  devTools: false,
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
