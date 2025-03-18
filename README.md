copilot was used to help debug and write the readme

# Social Network API

## Description

This Social Network API allows you to create, read, update, and delete users and thoughts as well as deleting thoughts associated with a user once the user is deleted. It also supports adding and removing friends as well as reactions to thoughts. The API is built using Express, MongoDB, and Mongoose, and is implemented in TypeScript.

## Installation

1. Clone the repository.
2. Make an .env file in the root directory with the following information; MONGODB_URI=mongodb://localhost/socialNetworkDB
   PORT=3001
3. Run `npm install` to install dependencies.
4. Run `npm run build` to build out necessary folders.
5. Run `npm run start` to start server and test endpoints

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

https://drive.google.com/file/d/1gvj7lMhios26xzb9ESQi9qiHt0QB9NjJ/view?usp=sharing
