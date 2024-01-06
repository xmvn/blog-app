/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import avatar from '../../assets/default_avatar.png'
import { AppDispatch } from '../../store'
import { setLogOut } from '../../store/slices/authSlice'
import { IAuthState } from '../../types/Types'
import './Header.scss'

const Header = () => {
  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer)
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(setLogOut())
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='header'>
      <div className='header-home-button'>
        <a href={'/'}>
          <h3>Realword blog</h3>
        </a>
      </div>
      {state.token ? (
        <div className='header-auth-menu'>
          <Link to='/new-article'>
            <div className='header-auth-menu-signup header-button-small'>Create article</div>
          </Link>
          <Link to='/profile'>
            <div className='header-auth-menu-user'>
              <span className='header-auth-menu-user-name'>{state.username || 'John Doe'}</span>
              <img src={`${state.image || avatar} `} alt='avatar' className='header-auth-menu-user-avatar' />
            </div>
          </Link>
          <div className='header-auth-menu-logout header-button-big' onClick={() => logOut()}>
            Log Out
          </div>
        </div>
      ) : (
        <div className='header-auth-menu'>
          <Link to='/sign-in/'>
            <div className='header-auth-menu-signin header-button-big'>Sign in</div>
          </Link>
          <Link to='/sign-up/'>
            <div className='header-auth-menu-signup header-button-big'>Sign up</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
