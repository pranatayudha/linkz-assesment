FROM postgres:alpine

ENV POSTGRES_USERNAME=postgres \
    POSTGRES_PASSWORD=p455w0rd \
    POSTGRES_DATABASE=linkz_assesment_db

COPY ./init.sql /docker-entrypoint-initdb.d/
