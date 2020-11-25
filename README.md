## Api angular-news-api
API in NodeJs for project [angular-news](https://github.com/RisKiki/angular-news)

## Routes 
For all détails of request body, go see the documentation.

| Method | Routes | Description |
|--------|--------|-------------|
| POST | articles/create | Create a new article |
| GET | articles/byId | Get article with an id |
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