import {Link} from "react-router-dom"; //for switching pages
import {useEffect, useState} from "react"; //allows for initialization and updating of variables

export default function Films() { //films page
    
    const [mode, setMode] = useState("title"); //"Search by" mode
    const [query, setQuery] = useState(""); //user input
    const [data, setData] = useState({items: [], page: 1, pageSize: 20, total: 0, totalPages: 0}); //data returned
    
    function fetchFilms(page) { //functiong for obtaining films on user search, initial value is 1 for page 1

        const params = new URLSearchParams(); //function to get parameters from current URL
        if (query.trim()) params.set(mode, query.trim()); //updating current search term

        params.set("page", page); //page variable from JSON
        params.set("pageSize", 20); //20 results per page

        //As a user I want to be able to search a film by name of film, name of an actor, or genre of the film
        fetch(`http://127.0.0.1:5000/api/films/search?${params.toString()}`) //calling backend to search for film
        .then(object => object.json()).then(setData); //getting the film information and turning it into JSON, updating data
    }

    function onSubmit(e) { //function for user clicking Search button
        e.preventDefault(); //no page reload allowed
        fetchFilms(1); //calling above function to fetch films from user's search
    }

    useEffect(() => {
        fetchFilms(1); //loading first page of films initially
    }, []);

    //pagination booleans
    const canPrev = data.page > 1; //previous page
    const canNext = data.page < data.totalPages; //next page

    return (
        <main style={{fontFamily: "system-ui", padding: 20}}>
        <h1>Films</h1>
        
        <form onSubmit={onSubmit} style={{display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10}}> {/* form that executes only on a submission */}
            <label>
                Search by {" "}
                <select value={mode} onChange={e => setMode(e.target.value)}> {/* want to be able to search by: */}
                    <option value="title">Title</option> {/* name of film */}
                    <option value="actor">Actor</option> {/* name of an actor */}
                    <option value="genre">Genre</option> {/* genre of the film */}
                </select>
            </label>

            {/* text box for user input */}
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={
                    mode === "title" ? "ex. BUCKET BROTHERHOOD" :
                    mode === "actor" ? "ex. GINA DEGENERES" :
                    "ex. Travel"
                }
                style={{minWidth: 350}}/>
            <button type="submit">Search</button>
        </form>

        {/* old way of showing films as a user list, decided table was more appropriate
        <ul>
            {data.items.map(f => (
                <li key={f.film_id}>
                    {f.film_id}{" "}
                    <Link to={`/films/${f.film_id}`}> link for clicking a film and seeing its details, brings us to FilmDetails.js
                        {f.title}
                    </Link>{" "}
                    {": "} {f.release_year} -- {f.rating} -- {f.length} min -- {f.categories} As a user I want to be able to view details of the film
                </li>
            ))}
        </ul>
         */}

        <table border="1" cellPadding="5" style={{borderCollapse: "collapse", width: "100%", maxWidth: 1000}}>
            <thead>
                <tr>
                    <th>Film ID</th>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>Rating</th>
                    <th>Length</th>
                    <th>Categories</th>
                </tr>
            </thead> 
            <tbody>
                {data.items.map(f => (
                <tr key={f.film_id}>
                    <td>{f.film_id}</td>
                    <td>
                    <Link to={`/films/${f.film_id}`}> {/* link for clicking a film and seeing its details, brings us to FilmDetails.js */}
                        {f.title}
                    </Link>{" "}
                    </td>
                    <td>{f.release_year}</td> {/* As a user I want to be able to view details of the film */}
                    <td>{f.rating}</td>
                    <td>{f.length} min</td>
                    <td>{f.categories}</td>
                </tr>))}
            </tbody>
        </table>

        <p>
            {`Showing page number ${data.page} of ${data.totalPages} with ${data.total} total results`} {/* page results information */}
        </p>
        <div>
            <button disabled={!canPrev} onClick={() => fetchFilms(data.page - 1)}>Prev</button>{" "} {/* previous page button */}
            <button disabled={!canNext} onClick={() => fetchFilms(data.page + 1)}>Next</button> {/* next page button */}
        </div>
        </main>
    );
}
