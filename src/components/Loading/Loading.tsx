import { Spin } from 'antd'

import './Loading.scss'

export const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <Spin size={'large'} />
    </div>
  )
}
