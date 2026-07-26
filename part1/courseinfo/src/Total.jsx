const Total= ({parts})=>{
// console.log('Reveal props in Total',parts)
const total = parts.reduce((sum,part)=> sum + part.exercises,0)

    return(
        <div>
           <b><p>Total of {total} excersies</p></b>
        </div>    
       
    )}

export default Total;