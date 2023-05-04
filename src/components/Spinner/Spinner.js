import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './Spinner.css'

function Spinner({ loading }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />

  if (loading) {
    return <Spin className="movies__loader" indicator={antIcon} />
  }
  return null
}

export default Spinner
