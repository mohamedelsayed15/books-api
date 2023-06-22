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
	store_code varchar NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

-- app_audit
CREATE TABLE bms.app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
)

CREATE TABLE bms.app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type varchar(10) NOT NULL,
	active int2 NULL DEFAULT 1,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id)
)