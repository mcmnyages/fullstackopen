import { useEffect,useState } from "react";

const App =()=>{
  const [ time, setTime] = useState(new Date())
  useEffect(()=>{
    const timerID = setInterval(()=>{
      setTime(new Date())
    }, 1000)
    console.log('Timer id', timerID)
    return ()=>{
      clearInterval(timerID)
    }
  },[])
  return(
    <div>
      <h1>Time {time.toLocaleTimeString()}</h1>
    </div>
  )
}

export default App