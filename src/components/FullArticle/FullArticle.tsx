/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'
import { Popconfirm } from 'antd'

import { AppDispatch } from '../../store'
import { IArticlesState, IAuthState } from '../../types/Types'
import { getFullArticle, deleteArticle } from '../../services/apiService'
import avatar from '../../assets/default_avatar.png'
import { slicedStr } from '../../common/functions'

import { Loading } from './../Loading/Loading'
import { Error } from './../Error/Error'

import './FullArticle.scss'

const FullArticle = () => {
  const [like, setLike] = useState(false)
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { fullArticle, isLoading, error } = useSelector(
    ({ articlesReducer }: { articlesReducer: IArticlesState }) => articlesReducer
  )
  const { token, username } = useSelector((state: { authReducer: IAuthState }) => state.authReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (slug) {
      dispatch(getFullArticle(slug))
    }
  }, [slug, dispatch])

  const handleDeleteArticle = () => {
    if (slug && token) {
      dispatch(deleteArticle(slug, token))
      navigate('/')
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && fullArticle && (
        <div className='full_article'>
          <div className='full_article-top'>
            <div className='full_article-left-side'>
              <div className='full_article-left-side-header'>
                <div className='full_article-left-side-header-text'>
                  {slicedStr(fullArticle.title, 40) || 'Example'}
                </div>
                <div className='fav-container'>
                  <span
                    className={`heart ${like ? 'heart-liked' : 'heart-unliked'}`}
                    onClick={() => setLike(!like)}
                  ></span>
                  {fullArticle.favoritesCount}
                </div>
              </div>
              <div className='full_article-left-side-taglist'>
                {fullArticle.tagList &&
                  fullArticle.tagList
                    .filter((tag) => tag?.trim() !== '')
                    .filter((tag) => slicedStr(tag, 30) !== '')
                    .map((tag, index) => (
                      <span className='full_article-left-side-taglist-tag' key={index}>
                        {slicedStr(tag, 30)}
                      </span>
                    ))}
              </div>
              <div className='full_article-left-side-content'>{slicedStr(fullArticle.description, 100)}</div>
            </div>
            <div className='full_article-right-side'>
              <div className='full_article-right-side-user'>
                <div className='full_article-right-side-user-info'>
                  <span className='full_article-right-side-user-name'>
                    {slicedStr(fullArticle.author?.username, 20)}
                  </span>
                  <span className='full_article-right-side-user-date'>
                    {' '}
                    {format(parseISO(fullArticle.createdAt), 'MMMM d, y')}
                  </span>
                </div>
                <img
                  className='full_article-right-side-user-avatar'
                  src={fullArticle.author?.image || avatar}
                  alt='avatar'
                />
              </div>
              {token && username === fullArticle.author.username && (
                <div className='full_article-right-side-buttons_container'>
                  <Popconfirm
                    title='Are you sure to delete this article?'
                    placement='left'
                    onConfirm={handleDeleteArticle}
                  >
                    <button className='full_article-right-side-buttons_container-button delete_btn'>Delete</button>
                  </Popconfirm>
                  <button className='full_article-right-side-buttons_container-button edit_btn'>
                    <Link to={`/articles/${slug}/edit`}>Edit</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='full_article-body'>
            <ReactMarkdown>{fullArticle.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  )
}

export default FullArticle
