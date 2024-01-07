/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import './../Auth.scss'
import { emailRegExp, passwordRegExp } from '../../../common/regex'
import { IAuthState, IReg } from '../../../types/Types'
import { createNewUser } from '../../../services/apiService'
import { AppDispatch } from '../../../store'

const RegisterPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer)

  const [isChecked, setIsChecked] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IReg>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IReg> = async (data) => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }

    await dispatch(createNewUser(newUser))
  }

  useEffect(() => {
    if (!state.token) {
      navigate('/sign-up')
    } else {
      navigate('/')
    }
  }, [state.token])

  const regEmail = register('email', {
    required: 'Email обязателен к заполнению.',
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
    required: 'Необходимо указать имя пользователя',
    minLength: {
      value: 3,
      message: 'Имя юзера должно содержать минимум 3 символа.',
    },
    maxLength: {
      value: 20,
      message: 'Имя юзера должно содержать максимум 20 символов.',
    },
  })
  const regRepeatPassword = register('repeatPassword', {
    required: 'Пароль обязателен к заполнению.',
    validate: (value) => value === watch('password') || 'Значения паролей должны совпадать.',
  })

  return (
    <>
      <div className='auth'>
        <div className={'auth-container'}>
          <h2 className='auth-title'>Create new account</h2>
          <h3 style={{ color: 'red', textAlign: 'center' }}>{state.authError && state.authError}</h3>
          <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='auth-form-inputWrapper'>
              <label className='auth-form-label'>Username</label>
              <input
                type='text'
                className={`auth-form-input ${errors.username && 'error'}`}
                placeholder='some-username'
                autoFocus
                {...regUserName}
              />
              {errors.username && (
                <p role='alert' className='inputErrorTextLabel'>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className='auth-form-inputWrapper'>
              <label className='auth-form-label'>Email address</label>
              <input
                type='email'
                className={`auth-form-input ${errors.email && 'error'}`}
                placeholder='Email address'
                {...regEmail}
              />
              {errors.email && (
                <p role='alert' className='inputErrorTextLabel'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='auth-form-inputWrapper'>
              <label className='auth-form-label'>Password</label>
              <input
                type='password'
                //@ts-expect-error
                name='password'
                className={`auth-form-input ${errors.password && 'error'}`}
                placeholder='Password'
                {...regPassword}
              />
              {errors.password && (
                <p role='alert' className='inputErrorTextLabel'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='auth-form-inputWrapper'>
              <label className='auth-form-label'>Repeat Password</label>
              <input
                type='password'
                className={`auth-form-input ${errors.repeatPassword && 'error'}}`}
                placeholder='Repeat Password'
                {...regRepeatPassword}
              />
              {errors.repeatPassword && (
                <p role='alert' className='inputErrorTextLabel'>
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>

            <span className={'brakeLine'} />

            <label className={'agreeStatement'}>
              <input type='checkbox' id='agree' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              <label className='auth-form-label' htmlFor='agree'>
                I agree to the processing of my personal information
              </label>
            </label>

            <input
              type='submit'
              className={`auth-form-input auth-submitButton ${
                errors.username || errors.password || errors.email || errors.repeatPassword || !isChecked
                  ? 'unactive'
                  : ''
              }`}
              value='Create'
              disabled={!isChecked}
            />

            <h3 className={'alreadyHaveAccount'}>
              Already have an account?
              <Link to='/sign-in' className={'alreadyHaveAccount__link'}>
                Sign In.
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
