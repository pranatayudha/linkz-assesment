CREATE TABLE IF NOT EXISTS public.users (
    id bigserial NOT NULL,
    uid uuid NULL,
    username varchar NOT NULL,
    "password" text NOT NULL,
    "latestLogin" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
    "delFlag" bool NOT NULL DEFAULT false,
    "createdAt" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);