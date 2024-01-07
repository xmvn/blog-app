/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import './../Auth.scss'
import { IAuthState, ILogin } from '../../../types/Types'
import { emailRegExp, passwordRegExp } from '../../../common/regex'
import { loginUser } from '../../../services/apiService'
import { AppDispatch } from '../../../store'

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer) || {}
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILogin>({
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    console.log(data)
    const userLogin = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    await dispatch(loginUser(userLogin))
  }

  useEffect(() => {
    if (!state.token) {
      navigate('/sign-in')
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

  return (
    <div className='auth'>
      <div className='auth-container'>
        <h3 className='auth-title'>Sign In</h3>
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='auth-form-inputWrapper'>
            <label className='auth-form-label'>Email address</label>
            <input
              type='email'
              className={`auth-form-input ${errors.email && 'error'}`}
              placeholder='Email address'
              autoFocus
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

          <input
            type='submit'
            className={`auth-form-input auth-submitButton ${errors.password || errors.email ? 'unactive' : ''}`}
            value='Login'
          />

          <h3 className='alreadyHaveAccount'>
            Already have an account?
            <Link to='/sign-up' className='alreadyHaveAccount__link'>
              Sign Up.
            </Link>
          </h3>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
