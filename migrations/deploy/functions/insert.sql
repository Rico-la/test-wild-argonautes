-- Deploy argonaute:functions/insert to pg

BEGIN;

CREATE FUNCTION new_argonaute(json) RETURNS int AS $$
    INSERT INTO argonaute (name)
    VALUES (
        $1->>'name'
    )
    RETURNING id;
$$ LANGUAGE sql ;

COMMIT;
