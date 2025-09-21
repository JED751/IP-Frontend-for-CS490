import {useParams, Link} from "react-router-dom"; //for using URL parameters, for switching pages
import {useEffect, useState} from "react"; //allows for initialization and updating of variables

export default function FilmDetails() { //film details page
  const {id} = useParams(); //the ID from the current URL
  const [film, setFilm] = useState(null); //the actual film, initially NULL

  useEffect(() => {
    //As a user I want to be able to click on any of the top 5 films and view its details
    fetch(`http://127.0.0.1:5000/api/films/${id}`) //getting the URL with the film_id in it
        .then(object => {return object.json();}).then(setFilm) //getting the film information and turning it into JSON
  }, [id]); //hook will run again when id variable changes

  if (!film) return <p></p>; //need this or program will try to return initial value of film being NULL

  return (
    <main style={{fontFamily: "system-ui", padding: 20}}>

        <p><Link to="/">Back To Home</Link></p>
        <h1>{film.title}</h1>
        <p>
            <b>Film ID:</b> {film.id}
        </p>
        <p>
            <b>Rating:</b> {film.rating}
        </p>
        <p>
            <b>Duration:</b> {film.duration} min.
        </p>
        <p>
            <b>Year Released:</b> {film.release_year}
        </p>
        <p>
            <b>Category:</b> {film.categories}
        </p>
        <p>
            <b>Language:</b> {film.language}
        </p>
        <p>
            <b>Description:</b> {film.description} 
        </p>
        <p>
            <b>Rental Cost:</b> ${film.rental_rate}
        </p>
        <p>
            <b>Rental Duration:</b> {film.rental_duration} days
        </p>
        <p>
            <b>Replacement Cost:</b> ${film.replacement_cost}
        </p>
        <p>
            <b>Cast:</b>
            <ul>
                {film.actors.map(a => <li key={a.actor_id}>{a.name}</li>)}
            </ul>
        </p>
        <p>
            <b>Special Features:</b> {film.special_features}
        </p>
        <p>
            <b>Last Updated:</b> {film.last_update}
        </p>
    </main>
  );
}