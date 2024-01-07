/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { IAuthState, IUserInfo } from '../../../types/Types'
import { avatarUrlRegex, emailRegExp, passwordRegExp } from '../../../common/regex'
import { AppDispatch } from '../../../store'
import { updateUser } from '../../../services/apiService'

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer) || {}

  // useEffect(() => {
  //   if (!state.token) {
  //     navigate('/sign-in')
  //   } else {
  //     navigate('/profile')
  //   }
  // }, [state.token])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({
    mode: 'onChange',
  })

  const onSubmit = async (data: IUserInfo) => {
    const updatedInfo = {
      user: {
        username: data.username || state.username,
        email: data.email.toLowerCase() || state.email,
        password: data.password,
        image: data.image || state.image,
      },
    }
    console.log(updatedInfo)
    dispatch(updateUser(updatedInfo, state.token))
  }
  const regEmail = register('email', {
    pattern: {
      value: emailRegExp,
      message: 'Некорректный формат email.',
    },
  })
  const regPassword = register('password', {
    required: 'Пароль обязателен к заполнению.',
    pattern: {
      value: passwordRegExp,
      message: 'Пароль не должен содержать пробелы.',
    },
    minLength: {
      value: 6,
      message: 'Пароль должен содержать минимум 6 символов.',
    },
    maxLength: {
      value: 40,
      message: 'Пароль не должен превышать 40 символов.',
    },
  })
  const regUserName = register('username', {
    minLength: {
      value: 3,
      message: 'Имя юзера должно содержать минимум 3 символа.',
    },
    maxLength: {
      value: 20,
      message: 'Имя юзера должно содержать максимум 20 символов.',
    },
  })
  const regImage = register('image', {
    pattern: {
      value: avatarUrlRegex,
      message: 'Изображение должно содержать корректную ссылку',
    },
  })

  return (
    <div className='auth'>
      {/* <ToastContainer /> */}
      <div className='auth-container'>
        <h2 className='auth-title'>Edit profile</h2>
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <label className='auth-form-label'>Username</label>
          <div className='auth-form-inputWrapper'>
            <input
              type='text'
              className={`auth-form-input ${errors.username && 'error'}`}
              defaultValue={state.username}
              placeholder='Enter a new username'
              {...regUserName}
            />
            {errors.username && (
              <p role='alert' className='inputErrorTextLabel'>
                {errors.username.message}
              </p>
            )}
          </div>
          <label className='auth-form-label'>Email address</label>
          <div className='auth-form-inputWrapper'>
            <input
              type='text'
              className={`auth-form-input ${errors.email && 'error'}`}
              placeholder='Enter an email address'
              defaultValue={state.email}
              {...regEmail}
            />
            {errors.email && (
              <p role='alert' className='inputErrorTextLabel'>
                {errors.email.message}
              </p>
            )}
          </div>
          <label className='auth-form-label'>New Password</label>
          <div className='auth-form-inputWrapper'>
            <input
              type='password'
              className={`auth-form-input ${errors.password && 'error'}`}
              placeholder='Enter a new password'
              {...regPassword}
            />
            {errors.password && (
              <p role='alert' className='inputErrorTextLabel'>
                {errors.password.message}
              </p>
            )}
          </div>
          <label className='auth-form-label'>Avatar Image URL</label>
          <div className='auth-form-inputWrapper'>
            <input
              type='text'
              className={`auth-form-input ${errors.image && 'error'}`}
              defaultValue={state.image || ''}
              placeholder='Enter a valid URL'
              {...regImage}
            />
            {errors.image && (
              <p role='alert' className='inputErrorTextLabel'>
                {errors.image.message}
              </p>
            )}
          </div>
          <input type='submit' className='auth-form-input auth-submitButton' value='Save' />
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
