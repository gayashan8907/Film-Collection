import Famous from "./famous"
import { useState,useCallback,useRef } from "react"
import { updatedUserFilms } from "./http"
import Films from "./Films"
import Modal from "./Modal"
import DeleteConfirmation from "./DeleteConformation"

export default function App(){
  const selectedFilm = useRef();
  const [userFilms,setUserFilms]=useState([])
  const [error,setError] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemoveFilm(film) {
    setModalIsOpen(true);
    selectedFilm.current = film;
    
    
  }

  function handleStopRemoveFilm() {
    setModalIsOpen(false);
  }

 async function handleSelectFilm(selectedFilm){
    setUserFilms((prevPickedFilms)=>{
      if(!prevPickedFilms){
        prevPickedFilms =[]
      }
      if(prevPickedFilms.some((film)=>film.id ===selectedFilm.id)){
        return prevPickedFilms
      }
      return [selectedFilm, ...prevPickedFilms]
    })
    try {
      await updatedUserFilms(selectedFilm, ...userFilms)
    } catch (error) {
      setError( "couldn't update films,please try again later" )
    }
    
  }

  const handleRemoveFilms = useCallback(async function handleRemoveFilm() {
    setUserFilms((prevPickedFilms) =>
      prevPickedFilms.filter((film) => film.id !== selectedFilm.current.id)
    );
    await updatedUserFilms(userFilms.filter((film) => film.id !== selectedFilm.current.id))
    setModalIsOpen(false);
  }, [userFilms]);


  return <div>

    
      <Modal open={modalIsOpen} onClose={handleStopRemoveFilm}>
        <DeleteConfirmation
          onCancel={handleStopRemoveFilm}
          onConfirm={handleRemoveFilms}
        />
      </Modal>


    <header>
        <img src='https://college.unc.edu/2020/05/take-a-film-adventure/film1/' alt="film" />
        <h1>25 must-watch films </h1>
        <p>
          Create your personal collection of Films you would like to watch or
          you have watched.
        </p>
      </header>
      <main>
       
        <Films 
          title = "I'd like to watch"
          fallBackText = "Select the places ou would like to watch below"
          films= {userFilms}
          onSelectFilm = {handleStartRemoveFilm}
          
        />
         <Famous onSelectFilm = {handleSelectFilm}/> 
      </main>
  </div>
}