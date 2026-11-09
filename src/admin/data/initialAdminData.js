// Initial Seed Data for Aroham Admin Dashboard (persisted in localStorage)

export const INITIAL_MENTORS = [
  {
    id: 'AM-2601',
    name: 'Nuha Kadija',
    university: 'Khalifa University',
    major: 'Aerospace Engineering',
    location: 'Abu Dhabi, UAE',
    stream: 'Engineering',
    status: 'Available for 1-on-1 Guidance',
    badgeColor: 'bg-amber-100 text-aroham-gold border-amber-200',
    description: 'Focuses on STEM admissions in the GCC, engineering design fundamentals, and undergraduate research application strategies.',
    email: 'nuha.k@alumnae.aroham.org',
    phone: '+971 50 123 4567',
    activeMentees: 2
  },
  {
    id: 'AM-2602',
    name: 'Ayishathul Fibha Fabhina',
    university: 'University of Stirling',
    major: 'Business Management & Marketing',
    location: 'Scotland, United Kingdom',
    stream: 'Business',
    status: 'Active Mentor',
    badgeColor: 'bg-emerald-100 text-aroham-forest border-emerald-200',
    description: 'Specialises in UK international student transitions, brand management modules, and graduate internship readiness.',
    email: 'fibha.f@alumnae.aroham.org',
    phone: '+44 7700 900123',
    activeMentees: 2
  },
  {
    id: 'AM-2603',
    name: 'Fathima Afiya',
    university: 'University of Sharjah',
    major: 'Biomedical Sciences',
    location: 'Sharjah, UAE',
    stream: 'Medicine & Biomedical',
    status: 'Weekend Sessions',
    badgeColor: 'bg-orange-100 text-aroham-terracotta border-orange-200',
    description: 'Guides high school seniors aspiring for medical, lab sciences, and allied health professions curriculum requirements.',
    email: 'afiya.f@alumnae.aroham.org',
    phone: '+971 55 987 6543',
    activeMentees: 3
  },
  {
    id: 'AM-2604',
    name: 'Fida Haneef',
    university: 'University of Leicester',
    major: 'Psychology & Mental Health',
    location: 'Leicester, United Kingdom',
    stream: 'Humanities',
    status: 'Available for UCAS Guidance',
    badgeColor: 'bg-amber-100 text-aroham-gold border-amber-200',
    description: 'Expert advice on UCAS personal statements, psychological empirical research pathways, and UK campus life acclimatization.',
    email: 'fida.h@alumnae.aroham.org',
    phone: '+44 7700 900567',
    activeMentees: 2
  },
  {
    id: 'AM-2605',
    name: 'Hiba Mariyam',
    university: 'Delhi University',
    major: 'English Literature & Research',
    location: 'New Delhi, India',
    stream: 'Humanities',
    status: 'Available',
    badgeColor: 'bg-emerald-100 text-aroham-forest border-emerald-200',
    description: 'Mentors students on critical theory analysis, academic writing, entrance examinations, and central university admissions.',
    email: 'hiba.m@alumnae.aroham.org',
    phone: '+91 98765 43210',
    activeMentees: 2
  },
  {
    id: 'AM-2606',
    name: 'Raniya Thasneem',
    university: 'Calicut University',
    major: 'Computer Applications & AI',
    location: 'Kerala, India',
    stream: 'Computer Science & AI',
    status: 'Active Mentor',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Passionate about bridging women into tech disciplines, coding foundational bootcamps, and artificial intelligence avenues.',
    email: 'raniya.t@alumnae.aroham.org',
    phone: '+91 94470 12345',
    activeMentees: 1
  }
];

export const INITIAL_MENTEES = [
  {
    id: 'STU-101',
    name: 'Amina Zainab',
    schoolOrCollege: 'Bolster Girls Campus (Class 12)',
    targetMajor: 'Biomedical Engineering',
    assignedMentorId: 'AM-2601',
    assignedMentorName: 'Nuha Kadija',
    status: 'Active Match',
    matchedDate: '04 May 2026',
    targetCountry: 'UAE / GCC'
  },
  {
    id: 'STU-102',
    name: 'Safa Fathima',
    schoolOrCollege: 'Farook Higher Secondary',
    targetMajor: 'International Business & Finance',
    assignedMentorId: 'AM-2602',
    assignedMentorName: 'Ayishathul Fibha Fabhina',
    status: 'Active Match',
    matchedDate: '04 May 2026',
    targetCountry: 'UK / Scotland'
  },
  {
    id: 'STU-103',
    name: 'Nadha Maryam',
    schoolOrCollege: 'Bolster Girls Campus (Class 12)',
    targetMajor: 'MBBS / Medical Sciences',
    assignedMentorId: 'AM-2603',
    assignedMentorName: 'Fathima Afiya',
    status: 'Active Match',
    matchedDate: '04 May 2026',
    targetCountry: 'UAE'
  },
  {
    id: 'STU-104',
    name: 'Liyana Sherin',
    schoolOrCollege: 'MES Campus',
    targetMajor: 'Psychology & Behavioral Health',
    assignedMentorId: 'AM-2604',
    assignedMentorName: 'Fida Haneef',
    status: 'Active Match',
    matchedDate: '04 May 2026',
    targetCountry: 'UK'
  },
  {
    id: 'STU-105',
    name: 'Rinsha Parveen',
    schoolOrCollege: 'Bolster Girls Campus (Alumna)',
    targetMajor: 'AI & Data Science',
    assignedMentorId: 'AM-2606',
    assignedMentorName: 'Raniya Thasneem',
    status: 'Active Match',
    matchedDate: '04 May 2026',
    targetCountry: 'India'
  },
  {
    id: 'STU-106',
    name: 'Shahana K.P',
    schoolOrCollege: 'GHSS Malappuram',
    targetMajor: 'Law & Public Policy',
    assignedMentorId: null,
    assignedMentorName: 'Unassigned',
    status: 'Pending Match',
    matchedDate: 'In Review',
    targetCountry: 'India / UK'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'EVT-01',
    title: 'GCC Higher Education Guidance Session',
    date: '18 Apr 2026',
    time: '18:30 IST',
    platform: 'Zoom Platform',
    type: 'Webinar',
    status: 'Completed',
    attendees: 50,
    details: 'Symposium exploring admissions, merit scholarships, and visa protocols for universities across UAE, Qatar, and Saudi Arabia.'
  },
  {
    id: 'EVT-02',
    title: 'Aroham UniMates – Flagship Launch',
    date: '04 May 2026',
    time: '16:00 IST',
    platform: 'Official Platform Launch',
    type: 'Milestone',
    status: 'Completed',
    attendees: 63,
    details: '17 students successfully matched with 10 senior mentors in inaugural founding cohort.'
  },
  {
    id: 'EVT-03',
    title: 'UK Higher Education Guidance Session',
    date: '10 May 2026',
    time: '19:00 IST',
    platform: 'Zoom Platform',
    type: 'Workshop',
    status: 'Completed',
    attendees: 20,
    details: 'UCAS application process, scholarships, campus life, and career prospects guided by Fida Haneef.'
  },
  {
    id: 'EVT-04',
    title: 'EduWay 2026 - Future Skills & Career Summit',
    date: '23 May 2026',
    time: '10:00 IST',
    platform: 'Rose Lounge, Malappuram',
    type: 'On-Ground Summit',
    status: 'Completed',
    attendees: 120,
    details: 'Aroham team served as Career Mentors with on-ground 1-to-1 counseling desks.'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-501',
    name: 'Fathimathul Shamla',
    email: 'shamla.k@gmail.com',
    role: 'Alumna Mentor',
    phone: '+91 98460 77889',
    campusBatch: 'Batch of 2021',
    message: 'Graduated in Architecture from NIT Calicut. Eager to guide students preparing for NATA and architecture entrance.',
    date: '07 Nov 2026',
    status: 'New'
  },
  {
    id: 'APP-502',
    name: 'Zahra Mohammed',
    email: 'zahra.m@outlook.com',
    role: 'Student Aspirant',
    phone: '+971 52 334 5566',
    campusBatch: 'N/A',
    message: 'Looking for advice on admission scholarships for medicine in Ireland or Georgia.',
    date: '06 Nov 2026',
    status: 'In Review'
  },
  {
    id: 'APP-503',
    name: 'Kerala Career Guidance Council',
    email: 'director@kcgc.org',
    role: 'Institutional Partner',
    phone: '+91 483 2734000',
    campusBatch: 'N/A',
    message: 'Proposal to collaborate on regional higher education conclave for girls in Malabar.',
    date: '05 Nov 2026',
    status: 'Approved'
  }
];

