/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import axios from 'axios'
import { Dispatch } from 'redux'

import { setArticles, startLoading, setError, setFullArticle } from '../store/slices/articlesSlice'
import { IFullArticle } from '../types/Types'
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
    dispatch(setError('An error occurred while fetching the article.'))
  }
}
