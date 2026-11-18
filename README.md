# QuizMaster

QuizMaster is a learning quiz site with HTML/CSS/JavaScript pages and a Node.js + Express backend. MongoDB stores accounts and quiz results. Passwords are hashed with bcrypt.

## Run locally

1. Install a current Node.js LTS release and create a MongoDB Atlas database named `QuizMaster`.
2. In MongoDB Atlas, create a database user and allow your development IP address. Keep the connection string private.
3. From the project root, install packages:

   ```sh
   npm install
   ```

4. Copy `.env.example` to `.env`. Fill in `MONGODB_URI`, `SESSION_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` (at least 12 characters).
5. Start the web server:

   ```sh
   npm start
   ```

6. Open `http://localhost:8000`.

The `.env` file must stay private and must never be placed in `client/`. The server creates or updates the configured admin account when it starts. Only that account can open `/admin.html` and the admin API. Public sign-up always creates a regular user account.

## Data and privacy

- `Users` stores names, email addresses, optional phone numbers, bcrypt password hashes, roles, and account dates.
- `QuizResults` stores each user's category, score, completion time, and timeout status.
- Sessions are stored in MongoDB. Browser cookies are HTTP-only and SameSite Lax.
- A signed-in user can access only their own profile and history. Admin routes return user records without password hashes.

Email verification and password-reset delivery need an email provider and are not configured in this project. Use HTTPS, a strong unique session secret, and production database access controls before deploying beyond local development.

The separate Python practice quiz remains available with `python python/quiz.py`.
