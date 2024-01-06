/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setArticles, startLoading, setError, setFullArticle } from '../store/slices/articlesSlice'
import { setAuthError, setUser } from '../store/slices/authSlice'
import { IFullArticle, ILogin, ISubmitLogin, ISubmitReg } from '../types/Types'

const API_URL = 'https://blog.kata.academy/api/'

export const getArticles =
  (page: number = 1) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading())
      const response = await axios.get(`${API_URL}/articles?limit=5&offset=${5 * (page - 1)}`)
      console.log(response.data)
      dispatch(setArticles(response.data))
    } catch (error) {
      console.error(error)
      dispatch(setError(String(error)))
    }
  }

export const getFullArticle = (slug: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading())
    const response = await axios.get<{ article: IFullArticle }>(`${API_URL}/articles/${slug}`)
    console.log(response.data.article)
    dispatch(setFullArticle(response.data.article))
  } catch (error) {
    console.error(error)
    dispatch(setError(String(error)))
  }
}
export const createNewUser = (newUser: ISubmitReg) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${API_URL}users`, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data)
    dispatch(setUser(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', response.data.token)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.message.includes('422')) {
      console.error('Email or username is already taken', error)
      dispatch(setAuthError('Email or username is already taken'))
    } else console.error('Error creating new user:', error)
  }
}

export const loginUser = (userData: ISubmitLogin) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch(setUser(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', JSON.stringify(response.data.user.token.replace(/['"]/g, '')))
    console.log(response.data.user)
    console.log(localStorage.getItem('token'))
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.message.includes('422')) {
      console.error('Email or password is wrong', error)
      dispatch(setAuthError('Email or password is wrong'))
    } else console.error('Error creating new user:', error)
  }
}
export const updateUser = (userData: ISubmitLogin, token: string) => async (dispatch: Dispatch) => {
  try {
    if (!token) {
      console.error('No token found')
      return
    }
    const response = await axios.put(`${API_URL}user`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch(setUser(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', response.data.user.token)
    console.log(response.data.user)
    console.log(localStorage.getItem('token'))
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
