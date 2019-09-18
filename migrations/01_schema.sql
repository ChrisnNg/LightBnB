DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS rates;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS guest_reviews;
DROP TABLE IF EXISTS property_reviews;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32),
  email VARCHAR(64),
  password VARCHAR(64)
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  title VARCHAR(32),
  description TEXT,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  cost_per_night SMALLINT,
  street VARCHAR(255),
  parking_spaces SMALLINT,
  number_of_bathrooms SMALLINT,
  number_of_bedrooms SMALLINT,
  country VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  post_code VARCHAR(32),
  active BOOLEAN
);

CREATE TABLE rates (
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  cost_per_night SMALLINT,
  property_id INTEGER REFERENCES properties(id)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  property_id INTEGER REFERENCES properties(id),
  guest_id INTEGER REFERENCES users(id)
);

CREATE TABLE guest_reviews (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER REFERENCES users(id),
  owner_id INTEGER REFERENCES users(id),
  reservation_id INTEGER REFERENCES reservations(id),
  rating SMALLINT,
  message TEXT
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER REFERENCES users(id),
  reservation_id INTEGER REFERENCES reservations(id),
  property_id INTEGER REFERENCES properties(id),
  rating SMALLINT,
  message TEXT
);
