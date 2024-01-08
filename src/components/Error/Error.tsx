import { useSelector } from 'react-redux'

import { IArticlesState } from '../../types/Types'

export const Error = () => {
  const state = useSelector((state: { articlesReducer: IArticlesState }) => state.articlesReducer)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <h2>{state.error}</h2>
    </div>
  )
}
