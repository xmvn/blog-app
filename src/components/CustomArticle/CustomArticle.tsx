/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { getFullArticle, postArticle } from '../../services/apiService'
import { AppDispatch } from '../../store'
import { IArticlesState, IAuthState, ICustomArticle } from '../../types/Types'
import { Loading } from '../Loading/Loading'

import './CustomArticle.scss'

const CustomArticle = () => {
  const { slug } = useParams<{ slug: string }>()
  const { fullArticle, isLoading, error } = useSelector(
    ({ articlesReducer }: { articlesReducer: IArticlesState }) => articlesReducer
  )
  const { token } = useSelector((state: { authReducer: IAuthState }) => state.authReducer)
  const navigate = useNavigate()

  // const token: string = localStorage.getItem('token')
  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICustomArticle>({
    // defaultValues: {
    //   title: fullArticle?.title || '',
    //   description: fullArticle?.description || '',
    //   body: fullArticle?.body || '',
    //   tagList: fullArticle?.tagList || '',
    // },
  })

  useEffect(() => {
    if (slug) {
      dispatch(getFullArticle(slug))
    }
  }, [slug, dispatch])

  useEffect(() => {
    if (fullArticle) {
      setValue('title', fullArticle.title || '')
      setValue('description', fullArticle.description || '')
      setValue('body', fullArticle.body || '')
      //@ts-expect-error react-hook-form doesn't saw type of tag:string
      setValue('tagList', fullArticle.tagList || '')
    }
  }, [fullArticle, setValue])
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit: SubmitHandler<ICustomArticle> = async (data) => {
    const article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList || [],
      },
    }
    await dispatch(postArticle(article, token, slug))

    navigate('/')
  }

  const regTitle = register('title', {
    required: 'Поле необходимо для заполнения',
  })
  const regDescription = register('description', {
    required: 'Поле необходимо для заполнения',
  })
  const regTextField = register('body', {
    required: 'Поле необходимо для заполнения',
  })
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className='custom-article'>
          {fullArticle ? (
            <h3 className={'custom-article-title'}> Edit Article </h3>
          ) : (
            <h3 className={'custom-article-title'}> Create new article </h3>
          )}

          <form className='custom-article-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='custom-article-form-main'>
              <div className='custom-article-inputWrapper'>
                <label htmlFor='title' className='custom-article-input-label'>
                  Title
                </label>
                <input
                  id='title'
                  type='text'
                  placeholder='Title'
                  className='custom-article-input'
                  autoFocus
                  defaultValue={fullArticle?.title}
                  {...regTitle}
                />
                {errors.title && <p className='inputErrorTextLabel'>{errors.title.message}</p>}
              </div>
              <div className='custom-article-inputWrapper'>
                <label htmlFor='description' className='custom-article-input-label'>
                  Short description
                </label>

                <input
                  id='description'
                  type='text'
                  placeholder='Write a short description'
                  className='custom-article-input'
                  {...regDescription}
                />
                {errors.description && <p className='inputErrorTextLabel'>{errors.description.message}</p>}
              </div>
              <div className='custom-article-inputWrapper'>
                <label htmlFor='text' className='custom-article-input-label'>
                  Text
                </label>

                <textarea
                  id='text'
                  placeholder='Text'
                  className='custom-article-input custom-article-area'
                  {...regTextField}
                />
                {errors.body && <p className='inputErrorTextLabel'>{errors.body.message}</p>}
              </div>
            </div>
            <div className='tags-container'>
              <div className='tags-container-list'>
                {fields.length > 0 && <span className='custom-article-input-label'>Tags</span>}
                {fields.map((field, index) => (
                  <div className='custom-article-tag' key={index}>
                    <input
                      className='custom-article-input'
                      placeholder='tag'
                      {...register(`tagList.${index}`, {
                        required: 'Поле необходимо для заполнения',
                      })}
                    />
                    <button className='custom-article-tag-button button-delete' onClick={() => remove(index)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <button
                className='custom-article-tag-button button-add'
                onClick={() => {
                  //@ts-expect-error react-hook-form doesn't saw type of tag:string
                  append('')
                }}
              >
                Add tag
              </button>
            </div>
            <button
              type='submit'
              className={`custom-article-tag-button button-send ${
                errors.title || errors.description || errors.body || errors.tagList ? 'unactive' : ''
              }`}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default CustomArticle
