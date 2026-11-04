# Aroham Foundation — Backend API & Admin Server

Official Node.js & Express RESTful API server powering student mentorship matching, mentor directory CRUD, contact inquiries, and real-time executive notifications.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
# Production mode
npm start

# Or Development mode (auto-restarts on changes)
npm run dev
```

The server will initialize on **Port 5000**:
- **API Endpoints**: `http://localhost:5000/api`
- **Executive Admin Dashboard (Separate Link)**: `http://localhost:5000/admin`
- **Public Website**: `http://localhost:5000/`

---

## 📡 API Endpoints

### 1. UniMates Student Mentorship Requests
- `GET /api/unimates` — Retrieve all student applications (supports `?status=pending|matched|completed` & `?search=...`).
- `POST /api/unimates/request` — Triggered when a student clicks **Request UniMate** on the website. Automatically registers the request and creates a real-time alert for the Admin Dashboard.
- `PATCH /api/unimates/:id` — Assign a mentor, update progress status, and add private admin notes.
- `DELETE /api/unimates/:id` — Remove a student record.

### 2. Mentors Profile Management
- `GET /api/mentors` — Fetch directory of active mentors (supports `?category=medicine|sciences|engineering|design|humanities`).
- `POST /api/mentors` — Add a new mentor profile with domain tags and bio.
- `PUT /api/mentors/:id` — Update mentor details, role, or active status.
- `DELETE /api/mentors/:id` — Remove a mentor from the network.

### 3. Real-Time Admin Notifications
- `GET /api/notifications` — Fetch all notifications and unread alert count.
- `POST /api/notifications/mark-read` — Mark notifications as read.
- `DELETE /api/notifications/:id` — Delete a notification.

### 4. Overview Stats & Diagnostics
- `GET /api/stats` — Executive summary: total mentors, active student requests, pending matches, and unread alerts.
- `GET /api/health` — API health check and server uptime.

### 5. Community & Inquiries
- `POST /api/contact` — Receives institutional partnership and general inquiry submissions.
- `POST /api/volunteers` — Receives alumni volunteer registrations.

---

## 🔒 Data Storage
All data is stored with zero-setup file-based persistence inside `backend/data/`:
- `mentors.json`
- `unimates.json`
- `notifications.json`
- `volunteers.json`
- `contacts.json`

Can be easily backed up, committed to git, or migrated to PostgreSQL/MongoDB if scaling.

