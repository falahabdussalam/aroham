/**
 * AROHAM FOUNDATION · BACKEND API & ADMIN ENGINE
 * RESTful Server for UniMates Mentorship, Mentors Directory,
 * Student Request Tracking, and Real-Time Admin Notifications.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper: Read JSON Data File
function readData(filename, fallback = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return fallback;
  }
}

// Helper: Write JSON Data File
function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
}

// Helper: Trigger an Admin Notification
function createAdminNotification({ type, title, message, targetId = null }) {
  const notifs = readData('notifications.json', []);
  const newNotif = {
    id: 'notif-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    type: type || 'info',
    title: title || 'New Notification',
    message: message || '',
    targetId: targetId,
    unread: true,
    createdAt: new Date().toISOString()
  };
  notifs.unshift(newNotif);
  // Keep the latest 100 notifications
  if (notifs.length > 100) notifs.length = 100;
  writeData('notifications.json', notifs);
  return newNotif;
}

// ---------------- API Routes ----------------

// 1. Health & System Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    service: 'Aroham Foundation Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Executive Dashboard Overview Stats
app.get('/api/stats', (req, res) => {
  const mentors = readData('mentors.json', []);
  const unimates = readData('unimates.json', []);
  const notifications = readData('notifications.json', []);
  const volunteers = readData('volunteers.json', []);
  const contacts = readData('contacts.json', []);

  const totalMentors = mentors.length;
  const activeMentors = mentors.filter(m => m.status === 'active').length;
  const totalRequests = unimates.length;
  const pendingRequests = unimates.filter(u => u.status === 'pending').length;
  const matchedRequests = unimates.filter(u => u.status === 'matched').length;
  const completedRequests = unimates.filter(u => u.status === 'completed').length;
  const unreadNotifications = notifications.filter(n => n.unread).length;
  const totalVolunteers = volunteers.length;
  const totalContacts = contacts.length;

  res.json({
    totalMentors,
    activeMentors,
    totalRequests,
    pendingRequests,
    matchedRequests,
    completedRequests,
    unreadNotifications,
    totalVolunteers,
    totalContacts
  });
});

// 3. Mentors CRUD API
app.get('/api/mentors', (req, res) => {
  let mentors = readData('mentors.json', []);
  const { category, search } = req.query;

  if (category && category !== 'all') {
    mentors = mentors.filter(m => m.category === category);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    mentors = mentors.filter(m =>
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.degree && m.degree.toLowerCase().includes(q)) ||
      (m.categoryLabel && m.categoryLabel.toLowerCase().includes(q)) ||
      (m.focusAreas && m.focusAreas.some(f => f.toLowerCase().includes(q)))
    );
  }

  res.json({ success: true, count: mentors.length, mentors });
});

app.post('/api/mentors', (req, res) => {
  const { name, degree, category, summitRole, bio, focusAreas, status } = req.body;

  if (!name || !degree || !category) {
    return res.status(400).json({ success: false, error: 'Name, degree, and category are required' });
  }

  const mentors = readData('mentors.json', []);

  // Map category to categoryLabel and badgeClass
  const categoryMap = {
    medicine: { label: 'Medicine & Healthcare', badge: 'badge-med' },
    sciences: { label: 'Pure & Applied Sciences', badge: 'badge-sci' },
    engineering: { label: 'Engineering & Tech', badge: 'badge-eng' },
    design: { label: 'Architecture & Design', badge: 'badge-design' },
    humanities: { label: 'Humanities & Languages', badge: 'badge-lang' }
  };

  const catMeta = categoryMap[category] || { label: category, badge: 'badge-pine' };

  // Parse focus areas (either array or comma-separated string)
  let parsedFocusAreas = [];
  if (Array.isArray(focusAreas)) {
    parsedFocusAreas = focusAreas;
  } else if (typeof focusAreas === 'string') {
    parsedFocusAreas = focusAreas.split(',').map(s => s.trim()).filter(Boolean);
  }

  const idSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('mentor-' + Date.now());

  const newMentor = {
    id: idSlug,
    name,
    degree,
    category,
    categoryLabel: catMeta.label,
    badgeClass: catMeta.badge,
    summitRole: summitRole || 'EduWay Career Mentor',
    focusAreas: parsedFocusAreas.length ? parsedFocusAreas : ['Higher Education Guidance'],
    bio: bio || 'Dedicated alumnus of Bolster Girls Campus empowering the next generation of students.',
    status: status || 'active',
    createdAt: new Date().toISOString()
  };

  mentors.unshift(newMentor);
  writeData('mentors.json', mentors);

  // Trigger notification
  createAdminNotification({
    type: 'mentor_added',
    title: 'New Mentor Added',
    message: `${newMentor.name} (${newMentor.degree}) was added to the mentorship network.`,
    targetId: newMentor.id
  });

  res.status(201).json({ success: true, message: 'Mentor added successfully', mentor: newMentor });
});

app.put('/api/mentors/:id', (req, res) => {
  const { id } = req.params;
  const mentors = readData('mentors.json', []);
  const index = mentors.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Mentor not found' });
  }

  const current = mentors[index];
  const { name, degree, category, summitRole, bio, focusAreas, status } = req.body;

  let parsedFocusAreas = current.focusAreas;
  if (Array.isArray(focusAreas)) {
    parsedFocusAreas = focusAreas;
  } else if (typeof focusAreas === 'string') {
    parsedFocusAreas = focusAreas.split(',').map(s => s.trim()).filter(Boolean);
  }

  const categoryMap = {
    medicine: { label: 'Medicine & Healthcare', badge: 'badge-med' },
    sciences: { label: 'Pure & Applied Sciences', badge: 'badge-sci' },
    engineering: { label: 'Engineering & Tech', badge: 'badge-eng' },
    design: { label: 'Architecture & Design', badge: 'badge-design' },
    humanities: { label: 'Humanities & Languages', badge: 'badge-lang' }
  };

  const newCategory = category || current.category;
  const catMeta = categoryMap[newCategory] || { label: newCategory, badge: current.badgeClass };

  mentors[index] = {
    ...current,
    name: name || current.name,
    degree: degree || current.degree,
    category: newCategory,
    categoryLabel: catMeta.label,
    badgeClass: catMeta.badge,
    summitRole: summitRole !== undefined ? summitRole : current.summitRole,
    bio: bio !== undefined ? bio : current.bio,
    focusAreas: parsedFocusAreas,
    status: status || current.status,
    updatedAt: new Date().toISOString()
  };

  writeData('mentors.json', mentors);
  res.json({ success: true, message: 'Mentor profile updated', mentor: mentors[index] });
});

app.delete('/api/mentors/:id', (req, res) => {
  const { id } = req.params;
  let mentors = readData('mentors.json', []);
  const existing = mentors.find(m => m.id === id);

  if (!existing) {
    return res.status(404).json({ success: false, error: 'Mentor not found' });
  }

  mentors = mentors.filter(m => m.id !== id);
  writeData('mentors.json', mentors);

  res.json({ success: true, message: `Mentor ${existing.name} removed successfully` });
});

// 4. UniMates Student Requests API (Triggered when user clicks "Request UniMate")
app.get('/api/unimates', (req, res) => {
  let requests = readData('unimates.json', []);
  const { status, search } = req.query;

  if (status && status !== 'all') {
    requests = requests.filter(r => r.status === status);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    requests = requests.filter(r =>
      (r.studentName && r.studentName.toLowerCase().includes(q)) ||
      (r.studentContact && r.studentContact.toLowerCase().includes(q)) ||
      (r.mentorPreference && r.mentorPreference.toLowerCase().includes(q)) ||
      (r.studentClass && r.studentClass.toLowerCase().includes(q))
    );
  }

  // Sort by newest first
  requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ success: true, count: requests.length, requests });
});

// POST UniMate Request: THIS IS CALLED WHEN STUDENT CLICKS / SUBMITS REQUEST UNIMATE
app.post('/api/unimates/request', (req, res) => {
  const { studentName, studentClass, mentorPreference, studentContact, studentQueries } = req.body;

  if (!studentName || !studentContact) {
    return res.status(400).json({ success: false, error: 'Student name and contact number are required.' });
  }

  const requests = readData('unimates.json', []);

  const newRequest = {
    id: 'req-' + Date.now(),
    studentName: studentName.trim(),
    studentClass: studentClass || 'Class 12',
    mentorPreference: mentorPreference ? mentorPreference.trim() : 'General Academic Guidance',
    studentContact: studentContact.trim(),
    studentQueries: studentQueries ? studentQueries.trim() : 'Seeking higher education direction and entrance strategy.',
    status: 'pending',
    assignedMentorId: null,
    assignedMentorName: null,
    adminNotes: '',
    createdAt: new Date().toISOString()
  };

  requests.unshift(newRequest);
  writeData('unimates.json', requests);

  // INSTANT ADMIN NOTIFICATION TRIGGER
  createAdminNotification({
    type: 'unimate_request',
    title: 'New UniMate Mentorship Request!',
    message: `${newRequest.studentName} (${newRequest.studentClass}) requested mentorship in "${newRequest.mentorPreference}". Contact: ${newRequest.studentContact}`,
    targetId: newRequest.id
  });

  console.log(`[ALERT] New UniMate Mentorship Request from ${newRequest.studentName} (${newRequest.studentContact})`);

  res.status(201).json({
    success: true,
    message: 'Your UniMate mentorship request has been received by Aroham Foundation. Our coordinators will reach out shortly!',
    request: newRequest
  });
});

// Update UniMate Request (Assign mentor, change status, add notes)
app.patch('/api/unimates/:id', (req, res) => {
  const { id } = req.params;
  const requests = readData('unimates.json', []);
  const index = requests.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Request not found' });
  }

  const current = requests[index];
  const { status, assignedMentorId, assignedMentorName, adminNotes } = req.body;

  const previousMentor = current.assignedMentorName;
  const updated = {
    ...current,
    status: status !== undefined ? status : current.status,
    assignedMentorId: assignedMentorId !== undefined ? assignedMentorId : current.assignedMentorId,
    assignedMentorName: assignedMentorName !== undefined ? assignedMentorName : current.assignedMentorName,
    adminNotes: adminNotes !== undefined ? adminNotes : current.adminNotes,
    updatedAt: new Date().toISOString()
  };

  requests[index] = updated;
  writeData('unimates.json', requests);

  // If a mentor was newly assigned, log a notification
  if (assignedMentorName && assignedMentorName !== previousMentor) {
    createAdminNotification({
      type: 'unimate_matched',
      title: 'Mentor Assigned to Student',
      message: `${updated.studentName} has been paired with ${assignedMentorName}.`,
      targetId: updated.id
    });
  }

  res.json({ success: true, message: 'Student request updated successfully', request: updated });
});

app.delete('/api/unimates/:id', (req, res) => {
  const { id } = req.params;
  let requests = readData('unimates.json', []);
  const found = requests.find(r => r.id === id);

  if (!found) {
    return res.status(404).json({ success: false, error: 'Request not found' });
  }

  requests = requests.filter(r => r.id !== id);
  writeData('unimates.json', requests);

  res.json({ success: true, message: `Request from ${found.studentName} deleted` });
});

// 5. Notifications API
app.get('/api/notifications', (req, res) => {
  const notifications = readData('notifications.json', []);
  const unreadCount = notifications.filter(n => n.unread).length;
  res.json({
    success: true,
    unreadCount,
    notifications
  });
});

app.post('/api/notifications/mark-read', (req, res) => {
  const { id } = req.body;
  const notifications = readData('notifications.json', []);

  if (id) {
    const item = notifications.find(n => n.id === id);
    if (item) item.unread = false;
  } else {
    // Mark all as read
    notifications.forEach(n => { n.unread = false; });
  }

  writeData('notifications.json', notifications);
  res.json({ success: true, unreadCount: notifications.filter(n => n.unread).length });
});

app.delete('/api/notifications/:id', (req, res) => {
  const { id } = req.params;
  let notifications = readData('notifications.json', []);
  notifications = notifications.filter(n => n.id !== id);
  writeData('notifications.json', notifications);
  res.json({ success: true, message: 'Notification removed' });
});

// 6. Volunteers API
app.get('/api/volunteers', (req, res) => {
  const volunteers = readData('volunteers.json', []);
  res.json({ success: true, count: volunteers.length, volunteers });
});

app.post('/api/volunteers', (req, res) => {
  const { name, batchYear, currentProfession, contact, interest } = req.body;
  if (!name || !contact) {
    return res.status(400).json({ success: false, error: 'Name and contact are required.' });
  }

  const volunteers = readData('volunteers.json', []);
  const newVol = {
    id: 'vol-' + Date.now(),
    name: name.trim(),
    batchYear: batchYear || 'Alumna',
    currentProfession: currentProfession || 'Professional / Student',
    contact: contact.trim(),
    interest: interest || 'General Volunteer Support',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  volunteers.unshift(newVol);
  writeData('volunteers.json', volunteers);

  createAdminNotification({
    type: 'volunteer_signup',
    title: 'New Alumna Volunteer Registered',
    message: `${newVol.name} (${newVol.batchYear}) joined the volunteer network. Contact: ${newVol.contact}`,
    targetId: newVol.id
  });

  res.status(201).json({ success: true, message: 'Thank you for joining the Aroham Volunteer Network!', volunteer: newVol });
});

// 7. Contact Inquiries API
app.get('/api/contacts', (req, res) => {
  const contacts = readData('contacts.json', []);
  res.json({ success: true, count: contacts.length, contacts });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, purpose, message } = req.body;
  if (!name || (!email && !phone)) {
    return res.status(400).json({ success: false, error: 'Name and contact (email or phone) are required.' });
  }

  const contacts = readData('contacts.json', []);
  const newContact = {
    id: 'msg-' + Date.now(),
    name: name.trim(),
    email: email ? email.trim() : '',
    phone: phone ? phone.trim() : '',
    purpose: purpose || 'General Inquiry',
    message: message ? message.trim() : '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newContact);
  writeData('contacts.json', contacts);

  createAdminNotification({
    type: 'contact_message',
    title: 'New Contact Inquiry Received',
    message: `${newContact.name} sent a message regarding "${newContact.purpose}".`,
    targetId: newContact.id
  });

  res.status(201).json({ success: true, message: 'Your message has been received by Aroham Foundation.', contact: newContact });
});

// ---------------- Static Admin File Serving ----------------
// Serves the standalone admin panel at /admin
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// Optionally serve the public site as well
app.use(express.static(path.join(__dirname, '..')));

// Fallback for admin SPA routing
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  AROHAM FOUNDATION · BACKEND & ADMIN SERVER READY  `);
  console.log(`  API Base:       http://localhost:${PORT}/api      `);
  console.log(`  Admin Link:     http://localhost:${PORT}/admin    `);
  console.log(`  Public Website: http://localhost:${PORT}/         `);
  console.log(`====================================================`);
});

module.exports = app;

