DROP TABLE IF EXISTS daycheck;
DROP TABLE IF EXISTS goal;
DROP TABLE IF EXISTS person;

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name text,
  fb_id bigint
);

ALTER TABLE person OWNER TO test_user;

CREATE TABLE goal (
  id SERIAL PRIMARY KEY,
  title text,
  description text,
  start_date date,
  end_date date,
  achiever_id integer,
  accountability_id integer,
  constraint fk_goal_person
       foreign key (achiever_id)
       REFERENCES person (id),
  constraint fk_goal_achiever
            foreign key (accountability_id)
            REFERENCES person (id)

);

ALTER TABLE goal OWNER TO test_user;

CREATE TABLE daycheck (
  id SERIAL PRIMARY KEY,
  day date,
  goal_id integer,
  constraint fk_daycheck_goal
       foreign key (goal_id)
       REFERENCES goal (id)
);

ALTER TABLE daycheck OWNER TO test_user;
