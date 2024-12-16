import { useState,useEffect } from "react";
import Films from './Films.jsx'

export default function Famous({onSelectFilm}){
    const [isFetching,setIsFetching] = useState(false)
    const [famous,setFamous] = useState([])
    const [error,setError] = useState()

    useEffect(()=>{
       
        async function fetchFilms() {
            setIsFetching(true)
            try{
                const response = await fetch ('http://localhost:3000/films')
                const resData = await response.json()

                if(!response.ok){
                throw new Error ('Failed to fetch places')
            }
            setFamous(resData.films)
        }catch(error)
            {
                setError( "couldn't fetch films,please try again later" )
            }
            
            
            
            setIsFetching(false)
        }
        
        fetchFilms()
    },[])

    if(error){
        return <h1>{error}</h1>
    }
    return(
        <Films 
            title="Top 25 films"
            films={famous}
            fallbackText="No films available."
            loadingText = "Fetching films data"
            isLoading = {isFetching}
            onSelectFilm= {onSelectFilm}
            
        />

    )

}