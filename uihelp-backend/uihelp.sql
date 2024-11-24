CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR NOT NULL
);

CREATE TYPE report_type AS ENUM (
	'Flood', 
	'Fire', 
	'Tree Fall',
	'Car Accident',
	'Wild Animals',
    'Earthquake'
	'Others'
);

CREATE TYPE danger_degree AS ENUM (
	'Highly Dangerous', 
	'Mildly Dangerous', 
	'Safe'
);

CREATE TYPE report_status AS ENUM (
	'not_started', 
	'in_progress', 
	'completed'
);

CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    detail VARCHAR,
    types report_type NOT NULL,
    danger danger_degree NOT NULL,
    status report_status NOT NULL DEFAULT 'not_started',
    picture VARCHAR, 
    location POINT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR NOT NULL
);

GRANT ALL PRIVILEGES ON TABLE users TO group7;
GRANT ALL PRIVILEGES ON TABLE admin TO group7;
GRANT ALL PRIVILEGES ON TABLE report TO group7;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO group7;
GRANT USAGE, SELECT ON SEQUENCE admin_id_seq TO group7;
GRANT USAGE, SELECT ON SEQUENCE report_id_seq TO group7;