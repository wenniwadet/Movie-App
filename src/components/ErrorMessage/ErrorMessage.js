import { Alert } from 'antd'

import './ErrorMessage.css'

function ErrorMessage() {
  return (
    <Alert
      className="error-message"
      message="Произошла ошибка"
      description="Извините, что-то пошло не так, обновите страницу"
      type="error"
      showIcon
    />
  )
}

export default ErrorMessage
