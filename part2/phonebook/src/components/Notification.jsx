const Notification = ({ type,message }) => {
  if (message === null) {
    return null
  }

  console.log('Displaying the type of the message', type)

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification