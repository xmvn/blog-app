import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IArticle, IArticlesState, IFullArticle } from '../../types/Types'

const initialState: IArticlesState = {
  articles: [],
  fullArticle: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    startLoading(state) {
      return {
        ...state,
        isLoading: true,
      }
    },
    setArticles(state, action: PayloadAction<{ articles: IArticle[]; articlesCount: number }>) {
      const { articles } = action.payload
      return {
        ...state,
        articles: [...articles],
        totalPages: action.payload.articlesCount * 2,
        isLoading: false,
        error: null,
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload }
    },
    setFullArticle(state, action: PayloadAction<IFullArticle | null>) {
      return { ...state, fullArticle: action.payload, isLoading: false, error: null }
    },
  },
})

export const { startLoading, setArticles, setCurrentPage, setError, setFullArticle } = articlesSlice.actions
export default articlesSlice.reducer
