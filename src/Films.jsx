export default function Films({title,films,fallbackText,isLoading,loadingText,onSelectFilm}){
    return(
        <section className="films-category">
        <h2>{title}</h2>
        {isLoading && <p className="fallback-text">{loadingText}</p>}
        {isLoading && films.length === 0 && <p className="fallback-text">{fallbackText}</p>}
        {!isLoading && films.length >0 && (
            <ul className="films">
                {films.map((fil) => (
                    <li key={fil.id} className="film-item">
                        <button onClick={()=>onSelectFilm(fil)}>
                            <img src={`http://localhost:3000/${fil.image.src}`} alt={fil.image.alt} />
                            <h3>{fil.title}</h3>
                        </button>
                    </li>
        ))}
            </ul>
        )}
        </section>
    )
}