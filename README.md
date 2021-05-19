# my-blog-api
NodeJS REST API for Blog Posts and Comments Using [Express 4](http://expressjs.com/) and [Node.js 14](http://nodejs.org/).

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

#### Environment Variables
variable: `env`<br>
value: `localhost` OR  `production`

## Endpoints and Payload
#### Base Url
local - `localhost:3000`<br>
prod - `https://my-blog-api-darwin.herokuapp.com`

HealhCheck - `/api/health`

#### Blog Post Endpoints
GET - `/api/post` &nbsp; - Get All Posts <br>
GET - `/api/post/{{postId}}` <br>
GET - `/api/post/thread/{{postId}}`&nbsp; - Get post and associated comments <br>
POST - `/api/post`<br>
```json
{
    "title": "My Blog Example",
    "author": "Darwin",
    "content": "This is my blog post"
}
```
PUT - `/api/post/{{postId}}`<br>
```json
{
    "title": "My Blog Update Example",
    "author": "Darwin",
    "content": "This is my updated blog post"
}
```
DELETE - `/api/post/{{postId}}`

#### Comment Endpoints
GET - `/api/comment` &nbsp; - Get All Posts <br>
GET - `/api/comment/{{commentId}}` <br>
POST - `/api/comment` <br>
```json
{
    "title": "My Comment Example",
    "author": "Darwin",
    "content": "This is my first comment",
    "postId": "{{postId}}"
}
```
POST - `/api/comment` - For Comment Replies <br>
```json
{
    "title": "My Comment Reply Example",
    "author": "Darwin",
    "content": "This is my first reply",
    "postId": "{{postId}}",
    "parentCommentId": "{{commentId}}"
}
```
PUT - `/api/comment/{{commentId}}` <br>
```json
{
    "title": "My Comment Update Example",
    "author": "Darwin",
    "content": "This is my updated comment"
}
```
DELETE - `/api/comment/{{commentId}}` <br>

## Postman
Project includes a postman collection for faster testing

Collection is equipped with prerequest scripts that should properly set most dynamic fields necessary for basic testing of API.

Collection in `test/postman/` <br>
Two environment files include also in `test/postman/`

## TODO
- [] Adding Testing Suite
- [] Converting Project to TypeScript
- [] Rethinking Persistance Layer, likely adding a database connection