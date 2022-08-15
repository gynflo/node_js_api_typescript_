Use of ORM prisma on a SQL database

Install devDependencies

```sh
npm i -D @types/node @types/express prisma typescript tsc-watch ts-node
```

Install dependencies

```sh
npm i express dotenv pg @prisma/client
```

Mount a PostgresSQL Docker image

```sh
docker run --name a-postgres-db  -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

List the process of a program if the port is already in use

```sh
ps -ef | grep postgres
```

Init Prisma client

```sh
npx prisma init
```
