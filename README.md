# Express/Node Service with Postgres

### Installs

With `package.json` and dependencies

> run `npm i`


### Build Project

> run `docker-compose build`

### Start Project

> run `docker-compose up`

### App service

> `localhost:5001` you can change the port in `docker-compose.yml` file `<host-port>:5001`

### Postgres sevice

> `localhost:5432` you can change the port in `docker-compose.yml` file `<host-port>:5432`

### Ducument API
`url-host[:port]`/api-docs/  default is `localhost:5001/api-docs`

### Tests
you need to use `docker-compose up` and then `docker stop birras_app` to be able to use the databases in the tests
> run npm test

### SQL

```sql

-- public.guests definition

-- Drop table

-- DROP TABLE public.guests;

CREATE TABLE public.guests (
	meetup_id int4 NOT NULL,
	user_id int4 NOT NULL,
	checkin bool NULL,
	CONSTRAINT guests_pkey PRIMARY KEY (meetup_id, user_id)
);


-- public.meetups definition

-- Drop table

-- DROP TABLE public.meetups;

CREATE TABLE public.meetups (
	meetup_id int4 NOT NULL,
	"date" varchar(255) NULL,
	"time" varchar(255) NULL,
	"name" varchar(255) NULL,
	description varchar(255) NULL,
	city varchar(255) NULL,
	CONSTRAINT meetups_pkey PRIMARY KEY (meetup_id)
);


-- public.permissions definition

-- Drop table

-- DROP TABLE public.permissions;

CREATE TABLE public.permissions (
	id serial NOT NULL,
	title varchar(255) NOT NULL,
	"module" varchar(255) NOT NULL,
	"action" varchar(255) NOT NULL,
	CONSTRAINT permissions_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_id int4 NOT NULL,
	"name" varchar(255) NULL,
	username varchar(255) NULL,
	"password" varchar(255) NULL,
	email varchar(255) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	parent int4 NULL,
	is_active bool NOT NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id),
	CONSTRAINT roles_parent_fkey FOREIGN KEY (parent) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE SET NULL
);


-- public.user_roles definition

-- Drop table

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles (
	user_id int4 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT user_roles_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_roles_user_id_role_id_key UNIQUE (user_id, role_id),
	CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- public.permission_role definition

-- Drop table

-- DROP TABLE public.permission_role;

CREATE TABLE public.permission_role (
	permission_id int4 NOT NULL,
	role_id int4 NULL,
	CONSTRAINT permission_role_pkey PRIMARY KEY (permission_id),
	CONSTRAINT permission_role_un UNIQUE (permission_id, role_id),
	CONSTRAINT permission_role_fk FOREIGN KEY (permission_id) REFERENCES permissions(id),
	CONSTRAINT permission_role_fk_1 FOREIGN KEY (role_id) REFERENCES roles(id)
);


-- ROLES

INSERT INTO public.roles (id, "name", parent, is_active, created_at, updated_at) VALUES(1, 'ADMIN', NULL, true, '2020-09-09 14:14:12.867', NULL);
INSERT INTO public.roles (id, "name", parent, is_active, created_at, updated_at) VALUES(2, 'USUARIO', 1, true, '2020-09-09 14:14:57.504', NULL);

-- PERMISSION

INSERT INTO public.permissions (id, title, "module", "action") VALUES(1, 'GET ALL USERS', 'USERS', 'GET_ALL');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(2, 'GET ONE USER', 'USERS', 'GET_ONE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(3, 'CREATE ONE USER', 'USERS', 'CREATE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(4, 'UPDETE ONE USER', 'USERS', 'UPDATE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(5, 'DELETE ONE USER', 'USERS', 'DELETE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(6, 'GET ALL MEETUPS', 'MEETUPS', 'GET_ALL');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(7, 'GET ONE MEETTUPS', 'MEETUPS', 'GET_ONE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(11, 'CREATE A NEW MEETUP', 'MEETUPS', 'CREATE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(9, 'UPDATE A MEETUP', 'MEETUPS', 'UPDATE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(10, 'DELETE A MEETUP', 'MEETUPS', 'DELETE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(8, 'GET ADMIN INFO OF ONE MEETUP', 'MEETUPS', 'GET_ADMIN_INFO');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(13, 'GET USER INFO OF ONE MEETUP', 'MEETUPS', 'GET_INFO');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(12, 'GET ALL GUESTS', 'GUESTS', 'GET_ALL');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(14, 'CREATE GUEST', 'GUESTS', 'CREATE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(15, 'DELETE GUEST', 'GUESTS', 'DELETE');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(16, 'CHECK IN GUEST', 'GUESTS', 'CHECK_IN');
INSERT INTO public.permissions (id, title, "module", "action") VALUES(17, 'INSCRIPTION IN GUEST', 'GUESTS', 'INSCRIPTION');

-- USER_ROLES

INSERT INTO public.user_roles (user_id, role_id) VALUES(1, 1);
INSERT INTO public.user_roles (user_id, role_id) VALUES(2, 2);


-- PERMISSION_ROLE

INSERT INTO public.permission_role (permission_id, role_id) VALUES(7, 2);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(1, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(2, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(3, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(4, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(5, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(6, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(8, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(9, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(10, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(11, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(13, 2);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(17, 2);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(12, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(14, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(15, 1);
INSERT INTO public.permission_role (permission_id, role_id) VALUES(16, 2);

-- USERS

INSERT INTO public.users (user_id, "name", username, "password", email) VALUES(2, 'leonel', 'mecalux2', '$2a$10$5zjlGdL2YiGvbjdW9W1MUO0UQhcPzBQM48a7nsmpl.nvZnVfjK0N.', 'leonel@leonel.com');
INSERT INTO public.users (user_id, "name", username, "password", email) VALUES(1, 'Pablo', 'mecalux', '$2a$10$imjS0iYIdsd9JnKwIpgAFOqks1GP2exq6xUmci6wRjhKIA1oYd.VS', 'ivan@ivan.com');
INSERT INTO public.users (user_id, "name", username, "password", email) VALUES(3, 'rafael', 'mecalux3', '$2a$10$oJhEeKPzQ/k4DZOoiR9R.uMtptbQr7/ndYrgfyOHbKhZd6mRQ9CN2', 'rafael@raf.com');
INSERT INTO public.users (user_id, "name", username, "password", email) VALUES(4, 'meca', 'mecalux4', '$2a$10$/nDQwbmfxgYwgcUuz/A4AuDIXeDm/BeumkLbwCuOHAHMDuHA26Szu', 'meca@meca.com.ar');



-- 2020-09-15 00:08:30
```


