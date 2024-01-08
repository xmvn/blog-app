import axios from 'axios'
import { Dispatch } from 'redux'

import { AppDispatch } from '../store'
import { setArticles, startLoading, setError, setFullArticle } from '../store/slices/articlesSlice'
import { setAuthError, setUser } from '../store/slices/authSlice'
import { IFullArticle, ISubmitArticle, ISubmitLogin, ISubmitReg } from '../types/Types'

const API_URL = 'https://blog.kata.academy/api/'

export const getArticles =
  (page: number = 1, token?: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading())
      const response = await axios.get(`${API_URL}/articles?limit=5&offset=${5 * (page - 1)}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch(setArticles(response.data))
    } catch (error) {
      console.error(error)
      dispatch(setError(String(error)))
    }
  }

export const getFullArticle = (slug: string, token?: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading())
    const response = await axios.get<{ article: IFullArticle }>(`${API_URL}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
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
    dispatch(setUser(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', JSON.stringify(response.data.user.token))
  } catch (error) {
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
    localStorage.setItem('token', JSON.stringify(response.data.user.token))
  } catch (error) {
    //@ts-ignore
    if (error.message.includes('422')) {
      console.error('Email or password is wrong', error)
      dispatch(setAuthError('Email or password is wrong'))
    } else console.error('Auth error:', error)
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
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
export const postArticle = (data: ISubmitArticle, token: string, slug?: string) => async (dispatch: Dispatch) => {
  try {
    const NEW_URL = `${API_URL}articles${slug ? `/${slug}` : ''}`
    const method = slug ? 'PUT' : 'POST'

    await axios({
      method: method,
      url: NEW_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
  } catch (error) {
    dispatch(setError(String(error)))
  }
}

export const deleteArticle = (slug: string, token: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${API_URL}articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    dispatch(setError(String(error)))
  }
}

export const likeArticle =
  (slug: string | undefined, token: string, favorited: boolean) => async (dispatch: AppDispatch) => {
    try {
      const method = favorited ? 'delete' : 'post'
      await axios(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      dispatch(setError(String(error)))
    }
  }
