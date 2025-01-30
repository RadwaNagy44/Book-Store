# Store Management API

A lightweight **Node.js** and **Express.js** RESTful API for managing store items and user authentication. This project supports CRUD operations, authentication, and role-based access control (RBAC).

---

## Features

- **CRUD Operations**: Manage store items (Create, Read, Update, Delete).
- **User Authentication**: Register, login, and JWT-based authentication.
- **Role-Based Access Control (RBAC)**: Restrict access to certain endpoints based on user roles.
- **Validation**: Input validation using `express-validator`.
- **Error Handling**: Centralized error management with meaningful responses.
- **Modular Design**: Well-structured controllers, routes, and middlewares.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Store-Management-API.git
   cd Store-Management-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URL=mongodb+srv://your-db-user:your-db-password@your-cluster.mongodb.net/Book_store
   PORT=5000
   JWT_SECRET_KEY=your-secret-key
   ```

4. Start the application:
   ```bash
   npm start
   ```

By default, the server runs on [http://localhost:5000](http://localhost:5000).

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Store Endpoints

#### 1. **Get All Store Items**
   - **URL**: `/store`
   - **Method**: `GET`
   - **Response**: List of all store items

#### 2. **Get a Single Store Item**
   - **URL**: `/store/:itemId`
   - **Method**: `GET`
   - **Response**: Store item details

#### 3. **Add a Store Item**
   - **URL**: `/store`
   - **Method**: `POST`
   - **Authentication**: Required (`ADMIN` or `MANAGER` role)
   - **Body**: JSON object with `name` and `price`
   - **Response**: Created store item

#### 4. **Update a Store Item**
   - **URL**: `/store/:itemId`
   - **Method**: `PATCH`
   - **Authentication**: Required (`MANAGER` role)
   - **Response**: Updated store item

#### 5. **Delete a Store Item**
   - **URL**: `/store/:itemId`
   - **Method**: `DELETE`
   - **Authentication**: Required (`ADMIN` or `MANAGER` role)
   - **Response**: Confirmation message

### User Authentication Endpoints

#### 1. **Register a New User**
   - **URL**: `/user/register`
   - **Method**: `POST`
   - **Body**: JSON object with `firstName`, `lastName`, `email`, `password`, `role`
   - **Response**: Created user with JWT token

#### 2. **Login**
   - **URL**: `/user/login`
   - **Method**: `POST`
   - **Body**: JSON object with `email` and `password`
   - **Response**: JWT token

#### 3. **Get All Users**
   - **URL**: `/user`
   - **Method**: `GET`
   - **Authentication**: Required
   - **Response**: List of all users (excluding passwords)

---

## Project Structure

```
Store-Management-API/
│
├── README.md                # Project documentation
├── app.js                   # Application entry point
├── controllers/             # Business logic
│   ├── storeControl.js      # Controller for store CRUD operations
│   ├── userControl.js       # Controller for user authentication
├── middleWares/             # Middleware logic
│   ├── asyncWrapper.js      # Async error handling
│   ├── verifyToken.js       # JWT verification
│   ├── allowedTo.js         # Role-based access control
│   ├── validationSchema.js  # Input validation schema
├── models/                  # Mongoose models
│   ├── storeModel.js        # Store model
│   ├── userModel.js         # User model
├── routes/                  # Route definitions
│   ├── storeRoutes.js       # Routes for store CRUD operations
│   ├── userRoutes.js        # Routes for user authentication
├── utils/                   # Utility functions
│   ├── httpStatusText.js    # Standard HTTP status messages
│   ├── generateJWT.js       # JWT token generation
│   ├── appError.js          # Custom error handling class
│   ├── userRoles.js         # User roles definition
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── package-lock.json        # Dependency lock file
```

---

## How to Contribute

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any questions or feedback, feel free to reach out:

- **GitHub**: [RadwaNagy44](https://github.com/RadwaNagy44)
- **Email**: radwanagy561@gmail.com


