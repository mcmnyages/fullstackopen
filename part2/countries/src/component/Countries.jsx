const Country =({countries})=>{
    
    return(
        <div>
            {
                countries.map(country=>(
                    <li key={country.cca3}>{country.name.common}</li>
                ))
            }
        </div>
    )
}

export default Country;