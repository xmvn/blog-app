import React, { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import avatar from '../../assets/default_avatar.png'
import { slicedStr } from '../../common/functions'
import { likeArticle } from '../../services/apiService'
import { AppDispatch } from '../../store'

import { IArticle, IAuthState } from './../../types/Types'

import './Article.scss'

interface ArticleProps {
  article: IArticle
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const [like, setLike] = useState(article.favorited || false)
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)

  const { token } = useSelector((state: { authReducer: IAuthState }) => state.authReducer)

  const dispatch: AppDispatch = useDispatch()

  const pressLikeButton = () => {
    if (token) {
      if (!like) {
        setLike(true)
        setFavoritesCount(favoritesCount + 1)
      } else if (favoritesCount >= 1) {
        setLike(false)
        setFavoritesCount(favoritesCount - 1)
      }
      dispatch(likeArticle(article.slug, token, article.favorited))
    } else return
  }

  return (
    <div className='article'>
      <div className='article_main'>
        <div className='article-left-side'>
          <div className='article-left-side-header'>
            <Link to={`/articles/${article.slug}`}>
              <div className='article-left-side-header-text'>{slicedStr(article.title, 40) || 'Example'}</div>
            </Link>
            <div className='fav-container' onClick={pressLikeButton}>
              <span>{like ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}</span>
              {favoritesCount}
            </div>
          </div>
          <div className='article-left-side-taglist'>
            {article.tagList &&
              article.tagList
                .filter((tag) => tag?.trim() !== '')
                .filter((tag) => slicedStr(tag, 20) !== '')
                .map((tag, index) => (
                  <span className='article-left-side-taglist-tag' key={index}>
                    {slicedStr(tag, 20)}
                  </span>
                ))}
          </div>
        </div>
        <div className='article-right-side'>
          <div className='article-right-side-user'>
            <span className='article-right-side-user-name'>{slicedStr(article.author?.username, 20)}</span>
            <span className='article-right-side-user-date'> {format(parseISO(article.createdAt), 'MMMM d, y')}</span>
          </div>
          <img className='article-right-side-user-avatar' src={article.author?.image || avatar} alt='avatar' />
        </div>
      </div>
      <div className='article-left-side-content'>{slicedStr(article.description, 203)}</div>
    </div>
  )
}

export default Article
