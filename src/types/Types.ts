export interface IArticle {
  author: {
    username: string
    image: string | null
    following: boolean
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}
export interface IArticlesState {
  isLoading: boolean
  articles: IArticle[]
  totalPages: number
  currentPage: number
  fullArticle: IFullArticle | null
  error: string | null
}

export interface IFullArticle {
  body: string
  slug: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string | null
    image: string
    following: boolean
  }
}
export interface IArticleResponse {
  article: IArticle
}

export interface ILogin {
  email: string
  password: string
}
export interface ISubmitLogin {
  user: ILogin
}

export interface IReg {
  username: string
  email: string
  password: string
  repeatPassword?: string
}
export interface ISubmitReg {
  user: IReg
}

export interface IAuthState {
  token: string
  email: string
  username: string
  image: string | undefined
  authError: string | null
}
export interface IUserInfo {
  username: string
  email: string
  password: string
  image: string | undefined
}
