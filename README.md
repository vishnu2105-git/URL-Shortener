#Project SetUp
---

### 🔹 Step 1: Setup Environment Variables

#### 📁 `backend/.env`
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_secure_jwt_secret
```

#### 📁 `frontend/.env`
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_BZENV=development  # or production
VITE_DEV_PROXY=http://localhost:3000
```

---

### 🔹 Step 2: Install Dependencies and Start

Quick Start
Start frontend and backend together from root:
```bash
npm run dev
```

# OR

If you prefer running frontend and backend separately, follow the setup steps below.
#### ➤ Frontend

```bash
cd frontend
npm install
npm run build
npm start
```

#### ➤ Backend

```bash
cd ../backend
npm install
npm start
```
---

## 🛠️ Tech Stack

- **Frontend**: Vite, React, Mantine, Google OAuth2
- **Backend**: Node.js, Express, MongoDB, JWT
- **Tooling**: ESLint, Prettier, dotenv

---

## 🙌 Contributing

Feel free to fork and create PRs to improve the boilerplate!

---

