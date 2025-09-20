import {useEffect, useState} from "react";

function App() {

  const [films, setFilms] = useState([]); //list of films and function to update the films

  useEffect(() => { //function to alter a component


    fetch("http://127.0.0.1:5000/api/home") //fetching from flask to get the film data in MySQL since it is connected to it
      .then(object => object.json()) //object converted to json
      .then(setFilms) //set films is updated with the values of films
    }, []);

  return (
    <main style={{fontFamily: "system-ui", padding: 24}}>

      <h2>Top 5 Rented Films of All Time</h2>
      <ul>
        {films.map(f => ( //maps each film
          <li key={f.film_id}>
            {f.title} has <b>{f.rentals_count}</b> rentals
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App; //exporting the app