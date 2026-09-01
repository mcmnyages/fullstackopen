 import { useState } from "react"

 const App =()=>{
  const [count, setCount]=useState(0)

  return(
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)}>plus</button>
      <button onClick={()=>setCount(count-1)}>minus</button>
      <button onClick={()=>setCount(0)}>zero</button>
    </div>
  )

 }
 export default App