/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAuthState } from '../../types/Types'

const initialState: IAuthState = {
  token: '',
  email: '',
  username: '',
  image: '',
  authError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthError(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        authError: action.payload,
      }
    },
    setUser(state, action) {
      const { email, token, username, image } = action.payload.user
      return { ...state, authError: null, email, token, username: username, image: image }
    },
    setLogOut(state) {
      return { ...state, authError: null, email: '', token: '', userName: '', image: '' }
    },
  },
})

export const { setAuthError, setUser, setLogOut } = authSlice.actions
export default authSlice.reducer
