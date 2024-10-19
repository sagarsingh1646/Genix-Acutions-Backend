
# Genix Auctions

## Description
This is a backend of Genix Auctions project.

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version >= 12.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MongoDB (or a remote MongoDB URI)

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/sagarsingh1646/Genix-Acutions-Backend.git
```

Navigate to the project directory:

```bash
cd your-repo-name
```

### 2. Install Dependencies
To install all the necessary dependencies, run:

```bash
npm install
```

or, if you're using Yarn:

```bash
yarn install
```

### 3. Setup Environment Variables
A `.env.sample` file is provided for reference. Create a `.env` file in the root of the project and add your environment-specific variables.

Copy the contents of `.env.sample` into `.env`:

```bash
cp .env.sample .env
```

Open the `.env` file and set the required environment variables:

```
MONGO_URI=your-mongo-db-link
JWT_SECRET=your-secret-key
PORT=3002
```

### 4. Start MongoDB (if running locally)
If you are using a local MongoDB instance, ensure that MongoDB is running. You can start it using:

```bash
mongod
```

If you're using a remote MongoDB URI, make sure it is accessible.

### 5. Run the Project
To start the server in development mode, run:

```bash
npm run dev
```

or, if you're using Yarn:

```bash
yarn dev
```

The server will be running on `http://localhost:3002` by default, or on the `PORT` specified in the `.env` file.

### 6. Test the API
You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

For example, to test the user details endpoint:
```bash
GET http://localhost:3002/api/v1/users/me
```

Make sure to include the `Authorization: Bearer <authToken>` header for authenticated requests.

## Available Scripts

- `npm run dev`: Starts the server in development mode.
- `npm start`: Starts the server in production mode.
- `npm run lint`: Runs the linter to check for code style issues.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
