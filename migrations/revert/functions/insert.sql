-- Revert argonaute:functions/insert from pg

BEGIN;

DROP FUNCTION new_argonaute(json);

COMMIT;
