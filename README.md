# Social Network API

## Description

This Social Network API allows you to create, read, update, and delete users and thoughts. It also supports adding and removing friends as well as reactions to thoughts. The API is built using Express, MongoDB, and Mongoose, and is implemented in TypeScript.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## API Endpoints

### Users

- **GET** `/api/users` – Get all users.
- **GET** `/api/users/:userId` – Get a single user by ID.
- **POST** `/api/users` – Create a new user.
- **PUT** `/api/users/:userId` – Update an existing user.
- **DELETE** `/api/users/:userId` – Delete a user (and associated thoughts).
- **POST** `/api/users/:userId/friends/:friendId` – Add a friend.
- **DELETE** `/api/users/:userId/friends/:friendId` – Remove a friend.

### Thoughts

- **GET** `/api/thoughts` – Get all thoughts.
- **GET** `/api/thoughts/:thoughtId` – Get a single thought by ID.
- **POST** `/api/thoughts` – Create a new thought (requires `userId` in the body).
- **PUT** `/api/thoughts/:thoughtId` – Update an existing thought.
- **DELETE** `/api/thoughts/:thoughtId` – Delete a thought.
- **POST** `/api/thoughts/:thoughtId/reactions` – Add a reaction to a thought.
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` – Remove a reaction from a thought.

## Walkthrough Video

API non functional at this point

## License

ISC License
