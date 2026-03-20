# Lead Manager App

A simple full-stack Lead Management application built with:

- Frontend: Next.js (App Router), Tailwind CSS, shadcn/ui
- Backend: Node.js, Express
- Database: PostgreSQL with Prisma ORM

---

## 🚀 Features

- Create new leads
- View all leads
- Status tracking:
  - New
  - Engaged
  - Proposal Sent
  - Closed-Won
  - Closed-Lost

- Clean, responsive UI
- REST API backend

---

## 🧱 Project Structure

- backend → Express API
- frontend → Next.js UI

---

## ⚙️ Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Example:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/lead_manager"
```

### 3. Prisma setup

```bash
npx prisma migrate dev
npx prisma generate
```

(Optional seed)

```bash
npx prisma db seed
```

### 4. Run backend

```bash
npm run dev
```

Backend runs at:

[http://localhost:3000](http://localhost:3000)

---

## 🎨 Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run frontend

```bash
npm run dev
```

Frontend runs at:

[http://localhost:3001](http://localhost:3001)

---

## 🔌 API Endpoints

### Get all leads

GET /leads

### Create a lead

POST /leads

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "New"
}
```

---

## 🧪 Lead Status Values

- New
- Engaged
- Proposal Sent
- Closed-Won
- Closed-Lost

---

## 🗄️ Database Schema

Lead model fields:

- id (string, auto-generated)
- name (string)
- email (unique string)
- status (string enum)
- createdAt (timestamp)

---

## 🧰 Tech Stack

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- Node.js + Express
- Prisma ORM
- PostgreSQL

---

## ▶️ How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Notes

- Ensure PostgreSQL is running locally
- Backend must be running before frontend API calls work
- Environment variables must be properly configured
- Prisma migrations must be applied before using the database

---

## 📬 API Testing

You can test the API using Postman:

- POST /leads
- GET /leads
