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
