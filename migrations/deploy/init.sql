-- Deploy argonaute:init to pg

BEGIN;

CREATE TABLE argonaute (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE
);

COMMIT;
