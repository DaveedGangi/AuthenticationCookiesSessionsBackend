# Authentication Server 🔐

This project is a Node.js Express server designed to handle user authentication, including registration, login, and logout functionalities. It utilizes SQLite for storing user data and `express-session` with `connect-sqlite3` for robust session management. CORS is implemented to allow cross-origin requests, enabling seamless integration with frontend applications.

## 🚀 Key Features

- **User Registration:** Allows new users to create accounts by providing their email and password. Passwords are securely hashed using `bcrypt` before being stored in the database.
- **User Login:** Authenticates existing users by verifying their email and password against the stored credentials. Upon successful authentication, a session is created to maintain the user's logged-in state.
- **User Logout:** Terminates the user's session, effectively logging them out of the application.
- **Secure Password Hashing:** Employs `bcrypt` to hash passwords, ensuring that sensitive user data is protected.
- **Session Management:** Utilizes `express-session` and `connect-sqlite3` to manage user sessions, providing a secure and persistent authentication mechanism. Session data is stored in an SQLite database.
- **CORS Support:** Enables Cross-Origin Resource Sharing (CORS) with specific origin and credentials configurations, allowing frontend applications from different domains to interact with the server.
- **Environment Variable Configuration:** Uses `.env` file to manage configuration settings such as session secret key and port number, making it easy to configure the application for different environments.

## 🛠️ Tech Stack

- **Backend:**
    - Node.js
    - Express
- **Database:**
    - SQLite
- **Authentication:**
    - bcrypt
    - express-session
    - connect-sqlite3
- **Middleware:**
    - cors
    - express.json()
    - express.urlencoded()
- **Environment Configuration:**
    - dotenv
- **Other:**
    - JavaScript

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env` file in the root directory and add the following:

    ```
    secret_key=<your_secret_key>
    PORT=3000 # Or any other port you prefer
    ```

    Replace `<your_secret_key>` with a strong, randomly generated secret key.

### Running Locally

1.  Start the server:

    ```bash
    npm start
    # or
    yarn start
    ```

2.  The server will start running on the specified port (default: 3000).

## 💻 Usage

The server exposes the following API endpoints:

-   `POST /register`: Registers a new user.  Expects a JSON payload with `email` and `password`.
-   `POST /login`: Logs in an existing user. Expects a JSON payload with `email` and `password`.
-   `POST /logout`: Logs out the current user.

Example using `curl`:

**Register:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"password123"}' http://localhost:3000/register
```

**Login:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"password123"}' http://localhost:3000/login
```

**Logout:**

```bash
curl -X POST http://localhost:3000/logout
```

## 📂 Project Structure

```
├── .env                # Environment variables (secret key, port)
├── auth.db             # SQLite database for user credentials
├── sessions.sqlite     # SQLite database for session data
├── server.js           # Main server file
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency versions (npm)
└── README.md           # Project documentation
```



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.


## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [daveeddaveedd@gmail.com](mailto:daveeddaveedd@gmail.com).

## 💖 Thanks

Thank you for checking out this project! I hope it's helpful.

