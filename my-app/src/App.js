//todo:
/*
Landing Page (4):
•    As a user I want to view top 5 rented films of all times - done
•    As a user I want to be able to click on any of the top 5 films and view its details - done
•    As a user I want to be able to view top 5 actors that are part of films I have in the store - done
•    As a user I want to be able to view the actor’s details and view their top 5 rented films - done
Films Page (3):
•    As a user I want to be able to search a film by name of film, name of an actor, or genre of the film - done
•    As a user I want to be able to view details of the film - done
•    As a user I want to be able to rent a film out to a customer
Customer Page (7):
•    As a user I want to view a list of all customers (Pref. using pagination) - done
•    As a user I want the ability to filter/search customers by their customer id, first name or last name.
•    As a user I want to be able to add a new customer
•    As a user I want to be able to edit a customer’s details
•    As a user I want to be able to delete a customer if they no longer wish to patron at store
•    As a user I want to be able to view customer details and see their past and present rental history
•    As a user I want to be able to indicate that a customer has returned a rented movie
*/
//misc:
//style with CSS (at end)

import {useEffect, useState} from "react"; //allows for initialization and updating of variables
import {Routes, Route, Link} from "react-router-dom"; //allows for routing different pages with links
import FilmDetails from "./FilmDetails"; //film details page
import ActorDetails from "./ActorDetails"; //actor details page
import Films from "./Films"; //films page
import Customers from "./Customers"; //customers page

function Home() { //changed from App to Home to represent home page

  const [films, setFilms] = useState([]); //list of films and function to update the films
  const [actors, setActors] = useState([]); //list of actors and function to update the actors

  useEffect(() => { //function to alter a component

    //As a user I want to view top 5 rented films of all time
    fetch("http://127.0.0.1:5000/api/films/top5") //fetching from flask to get the film data in MySQL since it is connected to it
      .then(object => object.json()) //object converted to json
      .then(setFilms).catch(() => setFilms([])); //set films is updated with the values of films

    //As a user I want to be able to view top 5 actors that are part of films I have in the store
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
              <Link to={`/films/${f.film_id}`}> {/* link for clicking a film and seeing its details, brings us to FilmDetails.js */}
                {f.title} 
              </Link>{" "}
              has <b>{f.rentals_count}</b> rentals.
            </li>
          ))}
        </ul>

      <h2 style={{marginTop: 50}}>Top 5 Actors</h2>
        <ul>
          {actors.map(a => ( //maps each actor, using SQL variables in these code portions
            <li key={a.actor_id}>
              <Link to={`/actors/${a.actor_id}`}> {/* link for clicking an actor and seeing their details, brings us to ActorDetails.js */}
                {a.name}
              </Link>{" "}
              is a part of <b>{a.films_count}</b> movies.
            </li>
          ))}
        </ul>
    </main>
  );
}

//export default App; //exporting the app, changed due to needing more than one page eventually

export default function App() { //default app function that allows us to run all of our pages
  return (
    <>
      {/* navigation bar for all pages */}
      <header>
        <nav style={{display: "flex", gap: 16, fontFamily: "system-ui", padding: 20}}>
          <Link to="/">Home</Link>
          <Link to="/films">Films</Link>
          <Link to="/customers">Customers</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />}/> {/* home page */}
        <Route path="/films/:id" element={<FilmDetails />}/> {/* film details page */}
        <Route path="/actors/:id" element={<ActorDetails />}/> {/* actor details page */}
        <Route path="/films" element={<Films />}/> {/* films page */}
        <Route path="/customers" element={<Customers />}/> {/* customers page */}
      </Routes>
    </>
  );
}