/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './slices/articlesSlice'

export const store = configureStore({
  reducer: { articlesReducer },
  devTools: false,
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
