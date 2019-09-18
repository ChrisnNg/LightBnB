INSERT INTO users (name, email, password) 
VALUES ('Chris', 'cristopherng@hotmail.com', '$2a$10$FB'),
('Melissa', 'Melissa.xyz@hotmail.com', 'BOAVhpuLvpOREQVmvmezD4ED'),
('Bob', 'bob@gmail.com', '.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'GrandVilla', 'description', 'https://bit.ly/2kQuk4w', 'https://bit.ly/2lXDBYZ', 600, 3, 3, 6, 'Micazu', 'Uknown street', 'Los Montesinos', 'Costa Blanca', 'V1X 1W4'),
(2, 'Pryramid', 'description', 'https://bit.ly/2kQuk4w', 'https://bit.ly/2lXDBYZ', 300, 2, 2, 4, 'Micazu', 'Desert Valley', 'Los DesertLand', 'Costa Deserta', 'V1V 1V4'),
(3, 'Castle Blanca', 'description', 'https://bit.ly/2kQuk4w', 'https://bit.ly/2lXDBYZ', 450, 8, 4, 8, 'Scotland', 'Castle Street', 'Scotty', 'ScotMcScot', 'V1A 7V7');


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 3, '2018-09-11', '2018-09-26'),
(2, 4, '2019-01-04', '2019-02-01'),
(3, 5, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 3, 1, 5, 'The View is heavenly!'),
(2, 4, 2, 4, 'Fantastic! but too hot!'),
(3, 5, 3, 2, 'warning!! this castle is haunted!!');
