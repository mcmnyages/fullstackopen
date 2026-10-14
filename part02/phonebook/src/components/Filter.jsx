import { useState } from "react"

const Filter =({search, onSearchChange})=>{    
  
return(
    <div>
        Filter shown with
      <input 
      value={search}
      onChange={onSearchChange}
      />
    </div>
)

}

export default Filter