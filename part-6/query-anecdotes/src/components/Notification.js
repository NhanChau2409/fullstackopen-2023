import { useNotiValue } from "../utils/notificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const noti = useNotiValue()

  return (
    <div  style={ noti ? style : null}>
      {noti}
    </div>
  )
}

export default Notification
