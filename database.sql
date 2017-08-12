CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(200) NOT NULL
);

INSERT INTO tasks (task)
VALUES ('Do laundry');

SELECT * FROM tasks;