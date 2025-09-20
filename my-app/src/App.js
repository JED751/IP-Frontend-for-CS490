import {useEffect, useState} from "react"; //allows for initialization and updating of variables
import {Routes, Route, Link} from "react-router-dom"; //allows for routing different pages
import FilmDetails from "./FilmDetails"; //film details page to be implemented next

function Home() { //changed from App to Home to represent home page

  //As a user I want to view top 5 rented films of all time
  const [films, setFilms] = useState([]); //list of films and function to update the films
  const [actors, setActors] = useState([]); //list of actors and function to update the actors

  useEffect(() => { //function to alter a component

    fetch("http://127.0.0.1:5000/api/films/top5") //fetching from flask to get the film data in MySQL since it is connected to it
      .then(object => object.json()) //object converted to json
      .then(setFilms).catch(() => setFilms([])); //set films is updated with the values of films

    fetch("http://127.0.0.1:5000/api/actors/top5") //fetching from flask to get the actor data in MySQL since it is connected to it
      .then(object => object.json()) //object converted to json
      .then(setActors).catch(() => setActors([])); //set actors is updated with the values of actors

    }, []);

  return (
    <main style={{fontFamily: "system-ui", padding: 20}}>

      <h1>Top 5 Rented Films of All Time</h1>
        <ul>
          {films.map(f => ( //maps each film, using SQL variables in these code portions
            <li key={f.film_id}>
              {f.title} has <b>{f.rentals_count}</b> rentals.
            </li>
          ))}
        </ul>

      <h2 style={{marginTop: 50}}>Top 5 Actors</h2>
        <ul>
          {actors.map(a => ( //maps each actor, using SQL variables in these code portions
            <li key={a.actor_id}>{a.name} is a part of <b>{a.films_count}</b> movies.</li>
          ))}
        </ul>
    </main>
  );
}

//export default App; //exporting the app, changed due to needing more than one page eventually

export default function App() { //default app function that allows us to run all of our pages
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/films/:id" element={<FilmDetails />} />
    </Routes>
  );
}