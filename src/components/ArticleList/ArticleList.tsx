import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { getArticles } from '../../services/apiService'
import { IArticlesState, IAuthState } from '../../types/Types'
import { AppDispatch } from '../../store'
import { setCurrentPage, setError } from '../../store/slices/articlesSlice'
import { Loading } from '../Loading/Loading'
import { Error } from '../Error/Error'

import Article from './../Article/Article'

import './ArticleList.scss'

export default function ArticleList() {
  const dispatch: AppDispatch = useDispatch()
  const { page: paramPage } = useParams()
  const navigate = useNavigate()
  const state = useSelector((state: { articlesReducer: IArticlesState }) => state.articlesReducer)
  const { token } = useSelector((state: { authReducer: IAuthState }) => state.authReducer)

  useEffect(() => {
    if (paramPage) {
      const parsedPage = parseInt(paramPage, 10)

      if (!isNaN(parsedPage)) {
        if (parsedPage && parsedPage > 0) {
          dispatch(setCurrentPage(parsedPage))
          dispatch(getArticles(parsedPage, token))
          navigate(`/articles/page/${parsedPage}`)
        }
      } else {
        dispatch(setError('Введите допустимое значение страницы!'))
      }
    } else {
      dispatch(getArticles(state.currentPage, token))
    }
  }, [state.currentPage, state.totalPages, dispatch, paramPage, navigate])

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    navigate(`/articles/page/${page}`)
  }

  return (
    <>
      {state.isLoading && <Loading />}
      {state.error && <Error />}
      {!state.isLoading && (
        <div className='article-list'>
          {state.articles.map((article) => (
            <Article article={article} key={article.slug} />
          ))}

          <Pagination
            current={state.currentPage}
            total={state.totalPages}
            size='default'
            style={{ textAlign: 'center', marginTop: 20, paddingBottom: 10 }}
            showSizeChanger={false}
            onChange={handlePageChange}
            hideOnSinglePage
          />
        </div>
      )}
    </>
  )
}
