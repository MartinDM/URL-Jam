# URL Jam

<img width="550" alt="image" src="https://github.com/MartinDM/url-jam/assets/7467069/ee9977b2-4c0c-48de-a856-6fc7eb343552">

URL Jam is a simple URL shortener application built with Next.js server actions, MongoDB, and Prisma. It allows users to shorten long URLs into more manageable and shareable links.

## Features

- Shorten long URLs into concise links.
- Link history in LocalStorage with deletion
- Easy setup with MongoDB and Prisma integration.

## Future features

- Track clicks
- Customise short link

## Technologies Used

- **Next.js** x **TypeScript**
- **MongoDB:** A NoSQL database used for storing URL data on Atlas
- **Prisma:** A modern database toolkit for TypeScript and Node.js, used for database ORM (Object-Relational Mapping).

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB
- Prisma CLI

## Installation

1. Clone the repository:

```
git clone https://github.com/martinDM/url-jam.git
```

2. Navigate to the project directory and download dependencies

```
cd url-jam
yarn install
```

4. Set up the environment variables by creating a `.env` file and adding the following:

```
DATABASE_URL="mongodb://[CONNECTION STRING FOR ATLAS OR LOCAL MONGO INSTANCE]"
```

5. Generate Prisma client:

```
npx prisma generate
```

## Usage

1. Start the development server:

```
yarn dev
```

2. Access the application in your browser at `http://localhost:3000`.

3. Enter a long URL in the input field and click "Jam" to generate a shortened URL.

4. Share the shortened URL with others.

## Contributors

- Martin di Martino-Marriott

## License

This project is licensed under the [MIT License](LICENSE).
