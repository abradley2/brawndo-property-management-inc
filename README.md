# Brawndo Property Management Inc.

"It's got what leasing managers crave!"

## Prerequisites

* Node@17
* pnpm
* Postgresql@15
* psql tools

## Running

You will need to create a database for the application to use.

First `createdb my_db_name`

Then run the following commands to build and start the application:

```
pnpm install && \
POSTGRES_DB=my_db_name pnpm run migrate:latest && \
pnpm run build && \
POSTGRES_DB=my_db_name node ./.output/server/index.mjs
```