# MEVN-ASSIGNMENT

![demo screenshot](https://github.com/FekihTaoufik/mevn-assignment/blob/master/images/demo.png?raw=true)

This is a MongoDB, Express, VueJs and Nodejs application made for an evaluation assignment.

## Demo

This project has been deployed on github pages (client) and heroku (server).

[Visit the demo on github pages](https://fekihtaoufik.github.io/mevn-assignment/)

I'm using [Vuetify](https://vuetifyjs.com/) for a nice and smooth UI & UX.

## Features

- [x] Authentication

  - [x] SignIn

  - [x] SignOut

- [x] Roles

  - [x] Admin (access to channels and users)

  - [x] User (access to comments)

- [x] Comments (all users + non authenticated)

  - [x] List

  - [x] Show associated channel

  - [x] Submit (create)

  - [x] Join or create channel (on submit)

- [x] User management (admin only)

  - [x] List

  - [x] Create

  - [x] Delete

  - [x] Update

- [x] Channel management (admin only)

  - [x] List

  - [x] Delete

  - [x] Delete associated comments

## Getting started

### Requirements

- Nodejs

- MongoDB

### Client

**Set up your environment variables**

Copy the file `.env.example` and rename it to `.env`.

**Install dependencies**

```

cd ./client

npm install

```

**Start the app**

```

npm run serve

```

### Server

**Set up your environment variables**

Copy the file `.env.example` and rename it to `.env`.

You need to set these variables to be able to start the server

- MONGODB_URL : Mongo database url

- JWT_SECRET : Any random string

**Install dependencies**

```

cd ./server

npm install

```

**Start the app**

```

npm start

```

## Testing

### Client

To run the tests

```

npm run test:unit

```

Tests coverage

![Client coverage](https://github.com/FekihTaoufik/mevn-assignment/blob/master/images/client-coverage.png?raw=true)

### Server

To run the tests

```

npm run test

```

Tests coverage

![Client coverage](https://github.com/FekihTaoufik/mevn-assignment/blob/master/images/server-coverage.png?raw=true)
