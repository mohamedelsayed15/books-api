CREATE SCHEMA bms;

CREATE TABLE bms.book (
	book_id serial not null,
	book_title varchar(300) not null,
	book_description varchar(1000) not null,
	book_isbn bigint not null,
	book_author varchar(50) not null,
	book_publisher varchar(50) not null,
	book_pages integer null,
	store_code varchar(5) not null,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial4 NOT NULL,
	store_name varchar(100) NOT NULL,
	store_address varchar(100) NOT NULL,
	store_code varchar NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);