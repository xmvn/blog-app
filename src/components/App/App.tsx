/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'
import { setUser } from '../../store/slices/authSlice'
import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import FullArticle from '../FullArticle/FullArticle'
import LoginPage from '../Auth/LoginPage/LoginPage'
import RegisterPage from '../Auth/RegisterPage/RegisterPage'

import ProfilePage from './../Auth/ProfilePage/ProfilePage'

const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      const userFromLocalStorage = localStorage.getItem('user')

      if (userFromLocalStorage !== null) {
        const getUser = JSON.parse(userFromLocalStorage)
        dispatch(setUser(getUser))
      }
    }
  }, [token])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/articles/page/:page' element={<ArticleList />} />
        <Route path='/articles/:slug' element={<FullArticle />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
