import { useState } from "react"



const Button = (props) =>{
  // console.log('Props in button',props)
  return(
    <button onClick={props.onClick} >{props.text}</button>
  )
}
const StatisticsLine =(props)=>{
  console.log('Props in StatsLine',props)
  return(
    <div>
      <p>
        {props.text} {props.item}
        {props.text==='Positive' && '%'}
      </p>
    </div>
  )
}

const Statistics =(props)=>{
  // console.log("Props in stats",props)
  const total=props.good + props.neutral + props.bad
  const positive =(props.good/total)*100
  const average = (props.good-props.bad)/total
  return(
    <div>
     {total >0 && 
     <div>
     <h1>Statistics</h1>
      <StatisticsLine text={'Good'} item={props.good}/>
      <StatisticsLine text={'Neutral'} item={props.neutral}/>
      <StatisticsLine text={'Bad'} item={props.bad}/>
      <StatisticsLine text={'All'} item={total}/>
      <StatisticsLine text={'Average'} item={average}/>
      <StatisticsLine text={'Positive'} item={positive}/>
    </div>}
    {total ===0 && <div>No feedback given</div>}
    </div>
  )
}


const App =() => {

const [good,setGood]=useState(0)
const [neutral,setNeutral]=useState(0)
const [bad,setBad]=useState(0)

const handleGoodCount=()=>{
  return setGood(good+1)
}

const handleNeutralCount=()=>{
  return setNeutral(neutral+1)
}

const handleBadCount=()=>{
  return setBad(bad+1)
}
  return(
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodCount } text={'good'} count={good}/>
      <Button onClick={handleNeutralCount} text={'neutral'} count={neutral}/>
      <Button onClick={handleBadCount} text={'bad'} count={bad} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;