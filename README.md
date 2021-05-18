# my-blog-api
NodeJS REST API for Blog Posts and Comments Using [Express 4](http://expressjs.com/) and [Node.js 14](http://nodejs.org/).


### TODO: Add more information about the app here

## Running Locally

Make sure you have node installed.

```sh
git clone git@github.com:darwin04/my-blog-api.git
cd my-blog-api
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Running Production Version
You can hit the production application by using the following:
https://my-blog-api-darwin.herokuapp.com

Health Check - `/api/health`


## Authentication
App requires `Authorization` header for basic auth. You will need User and Password in order to hit any endpoint in the app.

For Local development create `.env` file at root of project and add the following:
```sh
AUTH_USER_NAME=***replace with value***
AUTH_PASSWORD=***replace with value***
```