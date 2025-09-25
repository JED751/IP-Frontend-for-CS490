import {useParams, Link} from "react-router-dom"; //for using URL parameters, for switching pages
import {useEffect, useState} from "react"; //allows for initialization and updating of variables

export default function ActorDetails() { //actor details page
  const {id} = useParams(); //the actor ID from the current URL
  const [actor, setActor] = useState(null); //the actual actor, initially NULL

  useEffect(() => {

    //As a user I want to be able to view the actor’s details and view their top 5 rented films
    fetch(`http://127.0.0.1:5000/api/actors/${id}`)
        .then(object => {return object.json();}).then(setActor) //getting the actor's information and turning it into JSON
  }, [id]); //hook will run again when id variable changes

  if (!actor) return <p></p>; //need this or program will try to return initial value of actor being NULL

  return (
    <main style={{fontFamily: "system-ui", padding: 20}}>
        {/*<p>
            <Link to="/">Back To Home</Link> -- useless now since we have nav bar on every page with a Home button
        </p>*/}
        <h1>{actor.name}</h1>
        <p>
            This actor has starred in {actor.films_count} films.
        </p>
        <h2>Top 5 Rented Films with {actor.name}</h2>
        <ul>
            {actor.top_films.map(f => (
            <li key={f.film_id}>
                <Link to={`/films/${f.film_id}`}> {/* link for clicking a film and seeing its details, brings us to FilmDetails.js */}
                    {f.title}
                </Link>{" "}
                has <b>{f.rentals_count}</b> rentals.
            </li>
            ))}
        </ul>
    </main>
  );
}
