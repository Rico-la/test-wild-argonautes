-- Revert argonaute:init from pg

BEGIN;

DROP TABLE argonaute;

COMMIT;
