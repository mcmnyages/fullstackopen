import { useState, useEffect } from "react"

const App =()=>{
  const [search, setSearch]=useState('')
  const handleSearch =(e)=>{
    setSearch( e.target.value)
  }


  return(
    <div>
        Find countries:
        <input onChange={handleSearch} value={search}/>
    </div>
  )

}

export default App