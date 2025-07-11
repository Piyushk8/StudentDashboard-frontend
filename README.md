
# 📊 Student Progress Management System

A full-stack **MERN** (MongoDB, Express, React, Node.js) application built with **TypeScript** and **React Query** that enables institutions to efficiently track, analyze, and manage students’ coding progress, contest participation, and engagement. Designed with RESTful architecture and historical tracking for accountability and insights.

---

## 📸 Preview
https://github.com/user-attachments/assets/1036df8b-d1c4-4942-bc5f-c712d0886114

## 🚀 Features

### ✅ Student Dashboard
- View and manage all registered students
- Track each student’s Codeforces profile, activity, and ranking

### 📈 Analytics
- Contest history and participation stats
- Solved problems categorized by rating and tags
- Weekly/monthly performance trend

### ⏳ History Tracking
- Stores past performance snapshots
- Compare progress over time
- Highlight inactive students

### 🔔 Inactivity Alerts
- Automatic email reminders to students who haven’t participated in contests recently

### 📂 CSV Export
- Export student data and performance summaries for offline records

---

## 🧰 Tech Stack

### Frontend
- **React.js** with **TypeScript**
- **React Query** for API state management
- **Tailwind CSS** (optional, if used)
- **React Router** for navigation

### Backend
- **Node.js + Express.js**
- **MongoDB** with Mongoose ORM
- **Axios** or Fetch for frontend API calls

---

## 📁 Folder Structure (Frontend)

```

src/
├── api/              # API query/mutation hooks (React Query)
├── components/       # Reusable UI components
├── pages/            # Page-level components
├── types/            # TypeScript interfaces
├── utils/            # Helper functions
└── App.tsx           # Main app router

````

---

## 🛠️ Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or cloud)
- Codeforces handles of students to sync

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/student-progress-system.git
cd student-progress-system

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
````

### Environment Variables

#### Backend (`backend/.env`)

```env
MONGO_URI=<your-mongodb-uri>
PORT=3000
FRONTEND_URL=http://localhost:5173
CODEFORCES_API=https://codeforces.com/api/
EMAIL_USER=<your-email>
EMAIL_PASS=<app-password>
```

#### Frontend (`frontend/.env`)

```env
VITE_SERVER=http://localhost:3000
```

---

## 🚦 Running the App

```bash
# Start backend
cd backend
npm run dev

## Database
docker compose up

# Start frontend
cd ../frontend
npm run dev
```

---

## 🔁 Sync Logic

* The app fetches latest submissions via Codeforces API.
* Historical submissions are saved with timestamp.
* Weekly CRON job identifies inactive users and triggers email reminders.

---


