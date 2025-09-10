USE SAKILA;
/* 1. Display film id, title, and film category name */
SELECT f.film_id, f.title, c.name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id;

/* 2. Display film count by category name. ex. Action 64, Animation 66, etc... */
SELECT c.name, COUNT(*)
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
GROUP BY c.name;

/* 3. Display the number of films an actor is part of in order where actors that have done
most films first. */
SELECT actor_id, first_name, last_name, ((LENGTH(film_info) - LENGTH(REPLACE(film_info, ',', ''))) + 
(LENGTH(film_info) - LENGTH(REPLACE(film_info, ';', ''))) + 1) AS movies
FROM actor_info
ORDER BY movies desc;

/* 4. Find how many copies of a certain film a store has */
SELECT store_id, film_id, COUNT(inventory_id) AS DVD
FROM inventory
GROUP BY store_id, film_id
LIMIT 2000;

/* 5. Display list of all dvds that are rented out. */
SELECT *
FROM rental
WHERE return_date IS NULL;

/* 6. Display film id, title, category and rental count of the top 5 rented films */
SELECT f.film_id, f.title, c.name AS category, COUNT(*) AS rented
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title, c.name
ORDER BY rented DESC
LIMIT 5;

/* 7. Display film id, title, rental count of the top 5 rented movies of the actor who has done
the most films. */
SELECT fa.film_id, f.title, COUNT(*) AS inventory_id
FROM film_actor AS fa
JOIN inventory AS i ON fa.film_id = i.film_id 
JOIN rental AS r ON i.inventory_id = r.inventory_id
JOIN film AS f ON fa.film_id = f.film_id
WHERE actor_id = (SELECT a.actor_id
FROM actor AS a
JOIN film_actor as fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id
ORDER BY COUNT(*) DESC
LIMIT 1)
GROUP BY fa.actor_id, fa.film_id
ORDER BY inventory_id DESC
LIMIT 5;

/* 8. How many dvds has a customer rented? Display their first name, last name along with
rental count. */
SELECT c.first_name, c.last_name, COUNT(*) AS count
FROM customer AS c
JOIN rental AS r ON c.customer_id = r.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY count DESC;