import {useEffect, useState} from "react"; //allows for initialization and updating of variables

export default function Customers() { //customers page

    const [data, setData] = useState({items: [], page: 1, pageSize: 20, total: 0, totalPages: 0}); //data returned
  
    function fetchCustomers(page) { //functiong for obtaining customers, initial value is 1 for page 1
    
        //As a user I want to view a list of all customers (Pref. using pagination)
        fetch(`http://127.0.0.1:5000/api/customers?page=${page}&pageSize=20`) //calling backend to return customers
        .then(object => object.json()).then(setData); //getting the customer information and turning it into JSON, updating data
    }

    useEffect(() => {
        fetchCustomers(1); //loading first page of customers initially
    }, []);

    //pagination booleans
    const canPrev = data.page > 1; //previous page
    const canNext = data.page < data.totalPages; //next page

    return (
        <main style={{fontFamily: "system-ui", padding: 20}}>
        <h1>Customers</h1>

        <table border="1" cellPadding="5" style={{borderCollapse: "collapse", width: "100%", maxWidth: 2000}}>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Store ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Active</th>
                    <th>Location</th>
                    <th>Total rentals</th>
                    <th>Current rentals</th>
                    <th>Last rental</th>
                </tr>
            </thead>
            <tbody>
                {data.items.map(c => (
                    <tr key={c.customer_id}>
                        <td>{c.customer_id}</td>
                        <td>{c.store_id}</td>
                        <td>{c.first_name}</td> 
                        <td>{c.last_name}</td>
                        <td>{c.email}</td>
                        <td>{c.active ? "Yes" : "No"}</td>
                        <td>{c.city}, {c.country}</td>
                        <td>{c.total_rentals}</td>
                        <td>{c.current_rentals}</td>
                        <td>{c.last_rental_date ? new Date(c.last_rental_date).toUTCString() : "None"}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <p>
            {`Showing page number ${data.page} of ${data.totalPages} with ${data.total} total results`} {/* page results information */}
        </p>
        <div>
            <button disabled={!canPrev} onClick={() => fetchCustomers(data.page - 1)}>Prev</button>{" "} {/* previous page button */}
            <button disabled={!canNext} onClick={() => fetchCustomers(data.page + 1)}>Next</button> {/* next page button */}
        </div>
        </main>
    );
}
