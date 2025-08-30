# User Management App

The **User Management App** is a simple React-based CRUD application that allows you to manage users. It integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch and simulate user data operations.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project demonstrates CRUD (Create, Read, Update, Delete) functionality using React. It fetches a list of users from the JSONPlaceholder API and allows you to:

- View users in a table
- Add a new user (simulated via POST)
- Edit user details (simulated via PUT)
- Delete a user (simulated via DELETE)

Although JSONPlaceholder does not persist changes, the app provides a realistic simulation of API integration.

## Features

### Core Features
- **Fetch Users:** Load and display a list of users.
- **Create User:** Add new users using a form.
- **Update User:** Edit user information.
- **Delete User:** Remove a user from the list.

### Additional Features
- **Responsive UI:** Works on desktops and mobile devices.
- **Reusable Components:** Modular code structure with reusable components.
- **API Integration:** Uses `fetch` to interact with JSONPlaceholder.

## Tech Stack

- **Frontend:** React, JavaScript, Tailwind CSS
- **API:** JSONPlaceholder (for simulated backend data)
- **Deployment:** Vercel  

## Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhiGithub302/user_management_app
2. Navigate to the project directory:
   ```bash
   cd user-management-app
3. Install dependencies:
   ```bash
   npm install
   

## Usage
   To start the development server:
   ```bash
   npm run dev
   The app will run at http://localhost:5173/
## API Documentation

This project uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

### Endpoints

| Method | Endpoint       | Description                           |
|--------|---------------|---------------------------------------|
| GET    | `/users`      | Fetch all users                       |
| POST   | `/users`      | Create a new user (returns simulated response) |
| PUT    | `/users/:id`  | Update a user (simulated)             |
| DELETE | `/users/:id`  | Delete a user (simulated)             |

### Example Requests

#### Fetch Users
```bash
GET https://jsonplaceholder.typicode.com/users

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

