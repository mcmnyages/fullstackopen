import CountryDetail from "./CountryDetail";

const Country =({countries, onShowClick})=>{
    if (countries.length === 1) {
        return <CountryDetail country={countries[0]} />
    }
    
    return(
        <div>
            {
                countries.map(country=>(
                    <li key={country.cca3}>
                        {country.name.common}
                        <button onClick={()=>onShowClick(country)} >Show</button>
                    </li>
                    
                ))
            }
        </div>
    )
}

export default Country;