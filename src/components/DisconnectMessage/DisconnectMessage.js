import { Offline } from 'react-detect-offline'
import { Button } from 'antd'

import img from './disconnect_logo.png'
import './DisconnectMessage.css'

function DisconnectMessage() {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <Offline polling={{ enabled: false }}>
      <div className="disconnect">
        <img className="disconnect__img" src={img} alt="no internet connection" />
        <span className="disconnect__message">Интернет соединение потеряно!</span>
        <span className="disconnect__description">Проверьте подключение и повторите еще раз</span>
        <Button type="primary" size="large" onClick={reloadPage}>
          Обновить страницу
        </Button>
      </div>
    </Offline>
  )
}

export default DisconnectMessage
