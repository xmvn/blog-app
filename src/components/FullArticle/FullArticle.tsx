/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format, parseISO } from 'date-fns'

import { AppDispatch } from '../../store'
import { IArticlesState } from '../../types/Types'
import { getFullArticle } from '../../services/apiService'
import avatar from '../../assets/default_avatar.png'

import { Loading } from './../Loading/Loading'
import { Error } from './../Error/Error'

import './FullArticle.scss'

interface FullArticleProps {}

const FullArticle: React.FC<FullArticleProps> = () => {
  const { slug } = useParams<{ slug: string }>()
  const { fullArticle, isLoading, error } = useSelector(
    ({ articlesReducer }: { articlesReducer: IArticlesState }) => articlesReducer
  )
  const dispatch: AppDispatch = useDispatch()

  const slicedStr = (str: string | undefined, length: number) => str?.slice(0, length)

  useEffect(() => {
    console.log('slug:', slug)
    if (slug) {
      console.log('slug')
      dispatch(getFullArticle(slug))
    }
  }, [slug, dispatch])

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && fullArticle && (
        <div className='full-article'>
          <div className='article'>
            <div className='article-left-side'>
              <div className='article-left-side-header'>
                <div className='article-left-side-header-text'>{fullArticle.title || 'Example'}</div>
                <span>♥ {fullArticle.favoritesCount}</span>
              </div>
              <div className='article-left-side-taglist'>
                {fullArticle.tagList &&
                  fullArticle.tagList
                    .filter((tag) => tag.trim() !== '')
                    .map((tag, index) => (
                      <span className='article-left-side-taglist-tag' key={index}>
                        {slicedStr(tag, 20)}
                      </span>
                    ))}
              </div>
              <div className='article-left-side-content'>{fullArticle.description}</div>
            </div>
            <div className='article-right-side'>
              <div className='article-right-side-user'>
                <span className='article-right-side-user-name'>{slicedStr(fullArticle.author?.username, 20)}</span>
                <span className='article-right-side-user-date'>
                  {' '}
                  {format(parseISO(fullArticle.createdAt), 'MMMM d, y')}
                </span>
              </div>
              <img className='article-right-side-user-avatar' src={fullArticle.author?.image || avatar} alt='avatar' />
            </div>
          </div>
          <div className='full-article-body'>
            <ReactMarkdown>{fullArticle.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  )
}

export default FullArticle
