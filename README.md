# Focus Feed

Focus Feed is a full-stack web application that curates news content for users, allows them to configure news preferences, and sends out newsletters on a regular schedule. It uses **React** on the frontend, **Firebase** for user authentication, **Firestore** for data storage, a **Node**/Express server for back-end tasks, and an **ML microservice** for specialized endpoints. The project also leverages **Resend** to deliver email newsletters, with scheduled tasks managed by **node-cron**. Email server is currently hosted on **Railway**.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)
3. [Installation & Setup](#installation--setup)  
4. [Environment Variables](#environment-variables)  
5. [Running Locally](#running-locally)  
6. [Scripts](#scripts)  
7. [Testing](#testing)  
8. [Cron & Newsletter](#cron--newsletter)  
9. [ML Server](#ml-server)  
10. [Deployment](#deployment)  
11. [License](#license)

---

## Features

- **User Authentication & Onboarding**: Users can sign up, sign in, and be guided through an onboarding process (built on Firebase).
- **Preferences**: Users can customize their preferred news sources, topics, etc.
- **React Frontend**: A responsive UI built with React (and optionally Tailwind).
- **Newsletter Service**: Regularly sends curated news articles to each user’s email using Resend.
- **Cron Scheduling**: Uses node-cron to automatically dispatch newsletters at set intervals (e.g., weekly or daily).
- **ML Microservice**: A separate Node/Express service (in `ml/sev`) handling specialized routes (e.g., for training or production ML endpoints).
- **Automated Testing**: Jest-based tests for server routes (and additional tests for the ML microservice).

---

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS (optional), etc.
- **Backend**: Node.js, Express, Firebase Admin SDK, Firestore, Resend, node-cron
- **ML Microservice**: Node.js/Express-based, with additional endpoints for training, filtering, and production states
- **Database**: Firestore (Firebase)
- **Email**: [Resend](https://resend.com/) for transactional emails
- **Hosting**: Example hosting on [Railway.app](https://railway.app/) or other Node-friendly platforms

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This installs both React dependencies and back-end dependencies (all in one `package.json`).

3. **Generate a Firebase Admin Service Account** (or use existing). Place it in `serviceAccountKey.json` (or store in environment variables).

4. **Set up `.env`**:
   ```
   RESEND_API_KEY=your_resend_api_key
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
   # or optionally, SERVICE_ACCOUNT_KEY_JSON=<the JSON string if storing directly>
   ```
   - If using direct JSON for the service account, you can parse it in `firebaseAdmin.js`.
   - Otherwise, keep a local `serviceAccountKey.json` (make sure it’s in .gitignore).

---

## Environment Variables

Typical variables:
- **`RESEND_API_KEY`**: Your Resend API key to send emails.
- **`GOOGLE_APPLICATION_CREDENTIALS`** or **`SERVICE_ACCOUNT_KEY_JSON`**: For Firebase Admin SDK.
- **`NODE_ENV`**: Usually `development` or `production`.
- **`PORT`**: If you want to run the server on a specific port.

---

## Running Locally

1. **Start the React dev server**:
   ```bash
   npm run dev
   ```
   This will run Vite-based development mode, typically on [http://localhost:5173](http://localhost:5173).

2. **(Optional) Start the ML server**:
   ```bash
   cd ml/sev
   npm install
   npm run dd1_TESTS   # to test
   node index.js
   ```
   By default, it runs on `https://localhost:7050`.

3. **Start the main Node server** (including cron job):
   ```bash
   npm run start
   ```
   - This runs `server.js`, which initializes a node-cron job for the newsletter.  
   - By default, it might not serve your React app. The React dev server is separate in dev mode.

---

## Scripts

| Script             | Description                                                       |
|--------------------|-------------------------------------------------------------------|
| **`npm run dev`**  | Starts the Vite development server for the React frontend.        |
| **`npm run build`**| Builds the React app for production into the `dist/` folder.      |
| **`npm run preview`** | Previews the built React app locally.                         |
| **`npm run start`**| Runs `server.js`, launching the Node process with cron tasks.     |
| **`npm run dd1_TESTS`**| Runs Jest tests (including the ML server tests).              |
| **`npm run cron`** | (Optional) Runs `node newsletter/cron.js` directly.              |

---

## Testing

- **Frontend**: Uses [React Testing Library](https://testing-library.com/) for UI tests.  
- **Backend**: Jest-based tests in `ml/sev/test` for the ML server endpoints.  
- **Running Tests**:  
  ```bash
  npm run dd1_TESTS
  ```

---

## Cron & Newsletter

1. **node-cron** is used to schedule newsletter sends, located in `src/lib/newsletter/cron.js`.
2. **Manual Sending**: You can send a newsletter to a specific user for testing by running:
   ```bash
   node src/lib/newsletter/sendNewsletter.js
   ```
   - By default, that file might reference a `testUID` inside the code. Adjust as needed for your own test user.

3. **Adjusting the Cron Schedule**:  
   - In `cron.js`, you’ll see something like:
     ```js
     cron.schedule("30 21 * * 4", async () => {
       // ...
     });
     ```
   - The string `"30 21 * * 4"` is a standard cron expression (minute hour day-of-month month day-of-week).
   - For example, `"0 9 */3 * *"` would run at **9:00 AM every 3 days**.  
   - For more info, see [node-cron docs](https://www.npmjs.com/package/node-cron) or a cron expression guide.

4. **Resend** is used to dispatch the actual email, with logic in `sendNewsletter.js`.  
   - The code fetches user sources from Firestore, obtains articles, and composes an HTML email via `FocusFeedNewsletter.js`.

---

## ML Server

- Located in `ml/sev/`.  
- Exposes routes like `/preProcess`, `/train`, `/prod`, etc., for machine learning tasks.  
- **`ml/sev/index.js`**: Main Express server with HTTPS.  
- **Testing**: `npm run dd1_TESTS` (or run `jest` from `ml/sev`).

---

## Deployment

- **Railway** (or any Node-friendly host) can run the `start` script:
  1. Set environment variables (RESEND_API_KEY, etc.) in Railway’s dashboard.
  2. Deploy. The `server.js` process will run automatically.
  3. The React app can be built via `npm run build`, then served with your chosen method (or a separate static host).
- **ML Server** can also be deployed on a separate instance if needed, or combined in a monorepo approach.

---

## License

This project is licensed under the [MIT License](./LICENSE). You’re free to modify, distribute, and use it for personal or commercial purposes.

---

**Enjoy building & customizing your own Focus Feed!** If you have questions or suggestions, feel free to open an issue or contribute.

