## Api angular-news-api
API in NodeJs for project [angular-news](https://github.com/RisKiki/angular-news). \

## Clone

Run `git clone https://github.com/RisKiki/angular-news-api.git` to get the project. \
Run `npm install` to install node_modules. \
Run `npm start` to start the server.


Then go on http://localhost:3000/ to check if it's all work.

## Routes 
For all détails of request body, go see the documentation.

| Method | Routes | Description |
|--------|--------|-------------|
| POST | articles/create | Create a new article |
| GET | articles/byId | Get article with an id |
| GET | articles/all | Get all articles |
| POST | users/create | Create a new user |
| POST | users/login | Log-in for business |

## Code HTTP 
| Code | Français | Anglais |
|------|----------|---------|
| 200 | Requête exécutée avec succès. | Success.
| 400 | Mauvaise requête. | Invalid request format.
| 401 | Requête non autorisée. | Invalid API Key.
| 402 | Echec de la requête. | We had a problem with our API.
| 403 | Requête interdite. | You do not have access to the requested resource.
| 404 | Non trouvée.  | API not found.
| 500 | Erreur interne du serveur. | We had a problem with our server.

## License
[MIT](https://choosealicense.com/licenses/mit/)