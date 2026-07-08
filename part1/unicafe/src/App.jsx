
const Button = (props) =>{
  return(
    <button>{props.text}</button>
  )
}

const Statistics =()=>{
  return(
    <div>
      <h1>Statistics</h1>
      <p>Good:6</p>
      <p>Neutral:2</p>
      <p>Bad:1</p>
    </div>
  )
}


const App =() => {
  return(
    <div>
      <h1>Give feedback</h1>
      <Button text={'good'}/>
      <Button text={'neutral'}/>
      <Button text={'bad'}/>
      <Statistics/>
    </div>
  )
}

export default App;