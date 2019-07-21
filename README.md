# Game of blocks app

App with koa knex objection passport jwt and ethereum smart contract


![Image of game of blocks](https://d33wubrfki0l68.cloudfront.net/static/media/c33c7956c25bc6c88aa0a5f55ac82dd8f22c39a3/throne-home.3a2323f2.png)

```
# Clone the repo
git clone https://github.com/kwiss/hasura-node-starter

# Change directory
cd hasura-node-knex

# Install NPM dependencies
yarn

# Create your own .env file with given .env.sample

# you sample keys or generate the RSA keys
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem

# start docker with postgres and hasura

docker-compose up

# Apply migrations
# (Note) this step creates tables "users", "roles" and "user_roles" in the database
yarn workspace @hnk/api db:migrate:latest

# Then simply start your app
yarn dev

```