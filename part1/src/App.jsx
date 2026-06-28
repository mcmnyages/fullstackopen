const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
        <Hello name='Silas' age='20'/>
      </p>
    </div>
  )
}

const Hello = (props) => {
  return(
    <di>
      <p>My Name is: {props.name}</p>
      <p>And I am {props.age}, years old</p>

    </di>
  )
}

export default App