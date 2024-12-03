CREATE TYPE report_type AS ENUM (
    'Kebakaran', 
    'Banjir', 
    'Binatang Buas', 
    'Laka Lantas', 
    'Pohon Tumbang', 
    'Kendaraan Rusak', 
    'Pencurian', 
    'Darurat Kesehatan'
);

CREATE TYPE danger_degree AS ENUM (
	'Highly Dangerous', 
	'Mildly Dangerous', 
	'Safe'
);

CREATE TYPE report_status AS ENUM (
	'Pending', 
	'In Progress', 
	'Handled'
);

CREATE TABLE report (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    detail TEXT NOT NULL,
    types report_type,
    status report_status NOT NULL DEFAULT 'Pending',
    picture TEXT, 
    location TEXT, 
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

GRANT ALL PRIVILEGES ON TABLE admin TO group7;
GRANT ALL PRIVILEGES ON TABLE report TO group7;
GRANT USAGE, SELECT ON SEQUENCE admin_id_seq TO group7;
GRANT USAGE, SELECT ON SEQUENCE report_id_seq TO group7;
