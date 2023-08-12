# Smoothie Recipes API [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/oteuzay/smoothie-recipes-api/blob/main/LICENSE)

Enjoy a variety of delicious smoothie recipes with this API.

## Stack

| Category             | Dependency                                                                                   |
|----------------------|----------------------------------------------------------------------------------------------|
| Web Framework        | [Express Framework](https://expressjs.com/)                                                 |
| ODM                  | [Mongoose](https://mongoosejs.com/)                                                         |
| Caching and Data Storage | [Redis](https://redis.com/)                                                             |
| Validator            | [Express Validator](https://express-validator.github.io/docs)                                |
| Authentication       | [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)                                  |
| Logging              | [Morgan](https://github.com/expressjs/morgan)                                               |
| Documentation        | [Swagger](https://swagger.io/)                                                             |
| Errors               | [http-errors](https://github.com/jshttp/http-errors)                                         |
| Security             | [Bcrypt](https://www.npmjs.com/package/bcrypt) - [Helmet](https://helmetjs.github.io/)         |
| Others               | [Cors](https://www.npmjs.com/package/cors) - [Compression](https://www.npmjs.com/package/compression) - [Dotenv](https://github.com/motdotla/dotenv) |

## Installation

You can get the project up and running by following the steps below.

Make sure to fill in your actual configuration details in the .env file before running the application.

```sh
  git clone https://github.com/oteuzay/smoothie-recipes-api.git
```

```sh
  cd smoothie-recipes-api
```

```sh
  cp .env.example .env
```

```sh
  npm install
```

```sh
  npm run dev
```

## Documentation

When you set NODE_ENV to Development in your environment variables, you gain access to the Swagger documentation.

The Swagger documentation can be found at the following endpoint:

`/api-docs`

## Issues

Feel free to create an issue in our repository for any problems, questions, or feedback you have.

## Contributing

We welcome contributions, new features, improvements, and feedback.

Please fork the repository, make your changes, and submit a pull request for consideration.
