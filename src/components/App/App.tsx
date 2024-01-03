/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import ArticleList from '../ArticleList/ArticleList'
import FullArticle from '../FullArticle/FullArticle'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/articles/page/:page' element={<ArticleList />} />
        <Route path='/articles/:slug' element={<FullArticle />} />
      </Routes>
    </Router>
  )
}

export default App
