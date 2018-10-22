--
-- USERS TABLE
--
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(20) UNIQUE NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password_hash" VARCHAR(128),
    "creation_date" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

--
-- SESSION TABLE
-- 
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
