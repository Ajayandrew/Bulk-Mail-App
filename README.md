# 📧 Bulk Mail App (MERN)

A Full Stack Bulk Email Application built using React, Node.js, Express, and MongoDB.  
This app allows you to send emails to multiple recipients using an Excel file and track email history.

---
## 🚀 Live Demo

🔗 Live Site: https://bulk-mail-app-seven.vercel.app/

## 📂 GitHub Repository

🔗 Repository: 

---

## 🚀 Features

- Upload `.xlsx` file with email addresses  
- Send bulk emails with:
  - Sender email  
  - Subject  
  - Message body  
- Email count preview  
- Email history (Sent / Failed)  
- Real-time sending status  
- Backend deployed on Render  

---

## 🛠 Tech Stack

- Frontend: React, Tailwind CSS, Axios  
- Backend: Node.js, Express, Nodemailer  
- Database: MongoDB Atlas  
- File Handling: XLSX  

---

## 📁 Project Structure

```
bulk-mail-app/
│
├── backend/
│   ├── models/Mail.js
│   ├── routes/mailRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/App.jsx
│   ├── src/main.jsx
│   └── src/index.css
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
EMAIL=your_email@gmail.com
PASSWORD=your_app_password
```

Start backend:

```bash
npm start
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

Backend (Render):  
https://bulk-mail-app-4.onrender.com

Update frontend API:

```js
const API = "(https://bulk-mail-app-4.onrender.com)";
```

---

## 📦 API Endpoints

### Send Emails

POST /api/mail/send

```json
{
  "subject": "Test",
  "body": "Hello",
  "sender": "your@email.com",
  "emailList": ["a@gmail.com", "b@gmail.com"]
}
```

---

### Get History

GET /api/mail/history

---

## 🎯 Usage

1. Enter Sender Email  
2. Enter Subject & Message  
3. Upload `.xlsx` file  
4. Click Send Emails  
5. View history  

---

## 🔐 Notes

- Use Gmail App Password (not normal password)  
- MongoDB Atlas should allow access (0.0.0.0/0 for testing)  
- Render free tier may take time to wake up  

---

## 🌟 Future Improvements

- Dashboard analytics  
- HTML email templates  
- Admin login system  
- Drag & drop upload  
- Full deployment  

---

## 👨‍💻 Author

Ajay Andrew  

