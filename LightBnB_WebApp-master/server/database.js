const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;
  
  return pool.query(queryString, [email])
    .then(res => res.rows[0])
    .catch(err => null);

};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;

  return pool.query(queryString, [id])
    .then(res => res.rows[0])
    .catch(err => null);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  console.log(user);
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  return pool.query(queryString, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch((err) => {
      throw err;
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2;
  `;
  return pool.query(queryString,[guest_id, limit])
    .then(res => res.rows)
    .catch((err) => {
      throw err;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
    `;
  if (options.city) {//tested and works
    let city = options.city;
    city = city.substring(1, city.length - 1);
    queryParams.push(`%${city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {//untested
    if (!queryParams.length) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryParams.push(Number(options.owner_id));
    queryString += `properties.owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    if (!queryParams.length) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    queryString += `properties.cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    if (!queryParams.length) {
      queryString += `WHERE `;
    } else {
      queryString += `AND `;
    }
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    queryString += `properties.cost_per_night <= $${queryParams.length} `;
  }
  
  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += ` 
  ORDER BY properties.cost_per_night 
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      throw err;
    });
};



exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;

