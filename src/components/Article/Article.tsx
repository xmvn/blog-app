/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'

import avatar from '../../assets/default_avatar.png'

import { IArticle } from './../../types/Types'

import './Article.scss'

interface ArticleProps {
  article: IArticle
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const slicedStr = (str: string, length: number) => str?.slice(0, length)

  return (
    <div className='article'>
      <div className='article-left-side'>
        <div className='article-left-side-header'>
          <Link to={`/articles/${article.slug}`}>
            <div className='article-left-side-header-text'>{article.title || 'Example'}</div>
          </Link>
          <span>♥ {article.favoritesCount}</span>
        </div>
        <div className='article-left-side-taglist'>
          {article.tagList &&
            article.tagList
              .filter((tag) => tag.trim() !== '')
              .map((tag, index) => (
                <span className='article-left-side-taglist-tag' key={index}>
                  {slicedStr(tag, 20)}
                </span>
              ))}
        </div>
        <div className='article-left-side-content'>{slicedStr(article.body, 203)}</div>
      </div>
      <div className='article-right-side'>
        <div className='article-right-side-user'>
          <span className='article-right-side-user-name'>{slicedStr(article.author?.username, 20)}</span>
          <span className='article-right-side-user-date'> {format(parseISO(article.createdAt), 'MMMM d, y')}</span>
        </div>
        <img className='article-right-side-user-avatar' src={article.author?.image || avatar} alt='avatar' />
      </div>
    </div>
  )
}

export default Article
