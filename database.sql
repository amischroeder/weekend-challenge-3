CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(200) NOT NULL,
	status BOOLEAN NOT NULL
);

INSERT INTO tasks (task, status)
VALUES ('Do laundry', 'no');

SELECT * FROM tasks;

