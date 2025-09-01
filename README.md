
# 📓 Notes App with Google Signup & OTP Verification

A full-stack **Notes App** built with **React (TypeScript)** and **Node.js + Express + MongoDB**.  
Users can **sign up with email + OTP** or **sign in with Google**, and manage their personal notes.  

---

## ✨ Features
- 🔐 **User Authentication**
  - Email + OTP verification
  - Google Sign-In using Passport.js
- 📝 **Notes Management**
  - Create, view, and delete personal notes
- 🎨 **Modern UI**
  - Styled with CSS modules for a clean, responsive design
- 🗄 **Database**
  - MongoDB for storing users and notes

---

## 🛠 Tech Stack
- **Frontend:** React + TypeScript + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose ORM)
- **Auth:** Passport.js (Google OAuth2) + OTP system
- **Other:** Axios, dotenv, nodemailer

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
````

### 2️⃣ Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file inside the **server** folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK=http://localhost:5000/api/auth/google/callback

# Email (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Run the App

In two separate terminals:

```bash
# Run server
cd server
npm run dev

# Run client
cd client
npm start
```

App will be available at:
👉 Client: `http://localhost:3000`
👉 Server: `http://localhost:5000`

---

## 📂 Project Structure

```
notes-app/
│── client/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│
│── server/        # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
│
└── README.md
```

---

## 🤝 Contributing

Pull requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request


