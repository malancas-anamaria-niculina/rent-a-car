CREATE DATABASE test;

CREATE TABLE test_table
(
    id serial PRIMARY KEY,
    title  VARCHAR (50)  NOT NULL,
    description  VARCHAR (100)  NOT NULL
);

Insert into test_table(title,description) values( 'Title 1','Description 1');
Insert into test_table(title,description) values( 'Title 2','Description 2');
Insert into test_table(title,description) values( 'Title 3','Description 3');
Insert into test_table(title,description) values( 'Title 4','Description 4');