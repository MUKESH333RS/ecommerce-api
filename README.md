1. Overview

# E-commerce API

## Overview

The E-commerce API is a RESTful backend built with Node.js and Express for an e-commerce platform. It supports multiple user roles (admin, staff, vendor, and buyer) with role-based access control. The API provides endpoints for user authentication (using JWT), and CRUD operations for products integrated with PostgreSQL as the database.

## Features

- **User Authentication:** Secure login endpoint that generates JWT tokens.
- **Role-Based Access Control:** Middleware to protect routes based on user roles (admin, staff, vendor, buyer).
- **Product Management:** CRUD operations for products (create, read, update, delete).
- **Database Integration:** Uses PostgreSQL to store user and product information.
- **Environment Configuration:** Utilizes dotenv for managing environment variables.

## Technologies Used

- **Node.js & Express:** Server-side JavaScript runtime and web framework.
- **PostgreSQL:** Relational database for storing persistent data.
- **pg:** Node.js PostgreSQL client.
- **bcryptjs:** Library for hashing and comparing passwords.
- **jsonwebtoken:** Library for generating and verifying JSON Web Tokens (JWT).
- **dotenv:** Module to load environment variables from a `.env` file.
- **Nodemon (optional):** Development tool for auto-restarting the server on code changes.

## Project Structure

ecommerce-api/
│-- src/
│   │-- config/          # Database connection & environment variables
│   │-- controllers/     # Business logic for routes
│   │-- middlewares/     # Authentication & Authorization middlewares
│   │-- models/          # Database models (Users, Products, etc.)
│   │-- routes/          # API route handlers
│   │-- utils/           # Helper functions (e.g., JWT, password hashing)
│   │-- app.js           # Main application setup
│-- uploads/             # Store product images
│-- .env                 # Environment variables
│-- package.json         # Dependencies
│-- README.md            # Project Documentation


## Prerequisites

- **Node.js:** [Download and install Node.js](https://nodejs.org/)
- **PostgreSQL:** Install and set up PostgreSQL on your system.
- **Git:** (Optional) For version control.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-api

2. Install Dependencies

npm install

3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables
DB_USER=ecom_user
DB_HOST=localhost
DB_NAME=ecommerce_db
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=5000

Set Up the Database

Create the Database: 
Use your PostgreSQL client (psql, pgAdmin, etc.) to create the database:

CREATE DATABASE ecommerce_db;

Create the users Table:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,   -- Roles: 'admin', 'staff', 'vendor', 'user'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Create the products Table:

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    price_old NUMERIC(10,2) NOT NULL,
    price_new NUMERIC(10,2) NOT NULL,
    vendor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Insert Test Data (Optional): 
For testing, you might want to create an admin user. First, generate a hashed password using the utility:

File: src/utils/hashPassword.js

// ecommerce-api/src/utils/hashPassword.js
const bcrypt = require('bcryptjs');
const plainPassword = 'adminpassword';  // Change as needed
bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hash);
    }
});

Run the script:

node src/utils/hashPassword.js

Use the generated hash in an SQL command:

INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@example.com', '<hashed_admin_password>', 'admin');

5. Run the Application

node src/app.js

API Endpoints
    - Authentication
        - POST /api/auth/login
            - Headers: Content-Type: application/json
            - Body:
                {
                    "email": "admin@example.com",
                    "password": "adminpassword"
                }

            - Response: JWT token if login is successful.

Protected Routes
    - GET /api/protected
        - Headers: Authorization: Bearer <your-jwt-token>
        - Response: Access Granted message with user details.

Role-Based Endpoints
    - GET /api/admin
        - Headers: Authorization: Bearer <admin-jwt-token>
        - Response: Welcome message for admin.
    - GET /api/vendor
        - Headers: Authorization: Bearer <vendor-jwt-token>
        - Response: Welcome message for vendor.
    - GET /api/staff
        - Headers: Authorization: Bearer <staff-jwt-token>
        - Response: Welcome message for staff.
    - GET /api/buyer
        - Headers: Authorization: Bearer <user-jwt-token>
        - Response: Welcome message for buyer.

Products (CRUD Operations)
    GET /api/products
        Response: List of products.
    POST /api/products
        Headers: Content-Type: application/json
        Body Example:
            {
                "name": "Awesome Product",
                "description": "A description of the product.",
                "category": "Electronics",
                "price_old": "100.00",
                "price_new": "80.00",
                "vendor_id": 1
            }
        Response: Product created successfully.
    GET /api/products/:id
        Response: The product with the given ID.
    PUT /api/products/:id
        Headers: Content-Type: application/json
        Body Example:
            {
                "price_new": "75.00"
            }
        Response: Product updated successfully.
    DELETE /api/products/:id
        Response: Product deleted successfully.

Additional Information
    Error Handling:
        The API uses appropriate HTTP status codes (e.g., 400, 401, 403, 404, 500) and returns JSON error messages.
    Security:
        Sensitive information (database credentials, JWT secret) is stored in a .env file and not committed to source control.
    Role-Based Access:
        Routes are protected using custom middleware (authMiddleware.js and authorizeRole.js) to ensure only users with the proper roles can access them.
    Testing:
        A Postman collection can be used to test all endpoints. Ensure that JWT tokens are passed in the Authorization header as:
            Authorization: Bearer <your-jwt-token>

Future Enhancements
    Database ORM:
        Consider integrating an ORM like Sequelize for easier database management.
    Input Validation:
        Use libraries like Joi or express-validator to validate request data.
    Logging:
        Implement logging with tools such as Winston or Morgan.
    Comprehensive Testing:
        Write unit and integration tests using Mocha, Chai, or Jest.
    API Documentation:
        Use Swagger or Postman to document your API endpoints.


Conclusion
    This E-commerce API project is a robust foundation for an e-commerce platform with role-based access control, user authentication, and full CRUD operations for products. It’s built with Node.js, Express, and PostgreSQL, and is designed to be extended with additional features as needed.


