# Aroham Foundation — Official Alumni Website

A modern, minimal, human-crafted alumni portal built for **Aroham Foundation** (Bolster Girls Campus Alumni), based directly on the **Inaugural Annual Report · 2025–2026** presented by President **Fathimath Mufeedha**.

---

## 🎨 Design Philosophy & Brand Identity

- **Typography**: Complete font family **TG Pilgrima Office** (Tegamitype Foundry) with clean geometric modern editorial styling, backed by local and self-hosted OTF font assets.
- **Color Theme**: Extracted with exact fidelity from the official Aroham logo artwork:
  - **Deep Teal / Pine**: (`#154840`) — As featured in the main ribbon and the *Aroham* typography.
  - **Warm Amber Gold**: (`#DF9C2C`) — From the right ascending wing and *FOUNDATION* subtext.
  - **Burnt Terracotta Flame**: (`#C84826`) — From the center rising inner petal ribbon.
  - **Canvas & Surfaces**: Warm Linen (`#F9F9F7`) and Pure White (`#FFFFFF`).
- **Logo Assets**:
  - `logo.svg` / `assets/images/aroham-logo-nav.png`: High-definition, transparent brand lockup with exact emblem and Poppins typography.
  - `favicon.svg` / `assets/images/aroham-emblem-transparent.png`: Transparent emblem mark used in browser tab and hero badges.
  - `assets/images/aroham-logo-transparent.png`: Full transparent portrait lockup.
- **Aesthetic**: **Editorial, minimal, and grounded**. Intentionally crafted without AI-clichés (no generic purple neon gradients, floating glass blobs, or meaningless robotic buzzwords).

---

## 📂 Core Content & Architecture

### 1. Guided Mentors & Academic Advisors (`#advisors`)
- Positioned directly after "About & Roots".
- **Academic Mentors**:
  - **Dr. Shahul Nurani** — Guided Mentor & Academic Advisor [`dr-shahul-nurani.svg`]
  - **Dr. K. C. Mujeeb** — Guided Mentor & Strategic Advisor [`dr-kc-mujeeb.svg`]
  - **Mr. Jalal Rahman** — Guided Mentor & Institutional Guide [`mr-jalal-rahman.svg`]

### 2. Leadership & Executive Committee (`#committee`)
- Positioned directly after "Advisory & Mentorship Support" with unified 9-member official portrait cards (proportioned 1:1.08 framing, zero degrees shown):
  - **Fathimath Mufeedha** — President [`assets/images/office-bearers/fathimath-mufeedha.png`]
  - **Afifa M.A.** — General Secretary [`assets/images/office-bearers/afifa-ma.png`]
  - **Nishfa Mariya V** — Finance Secretary [`assets/images/office-bearers/nishfa-mariya.png`]
  - **Diya Fathima M.N.** — Trustee [`assets/images/office-bearers/diya-fathima.png`]
  - **Khadeeja Misba P.M.** — Trustee [`assets/images/office-bearers/khadeeja-misba.png`]
  - **Fathima Hija T.** — Trustee [`assets/images/office-bearers/fathima-hija.png`]
  - **Fathima Minha P.M.** — Trustee [`assets/images/office-bearers/fathima-minha.png`]
  - **Shana** — Trustee [`assets/images/office-bearers/shana.png`]
  - **Aysha Huda A.P.** — Trustee [`assets/images/office-bearers/aysha-huda.png`]

> 💡 **Customizing Photos**: You can simply replace any `.svg` in `assets/images/office-bearers/` with your actual `.jpg` or `.png` photographs (or update the file extension in `index.html`). The CSS automatically crops, centers, and maintains perfect geometrical alignment with `object-fit: cover` and fixed aspect ratios.

### 3. Excellence Alumni & EduWay Mentors (Interactive Directory)
Features real-time search and filter tabs across disciplines (only the 9 official mentors with names & degrees, without university affiliations):
- **Medicine & Healthcare**: Fathimath Mufeedha (MBBS), Farsana (Pharm.D)
- **Pure & Applied Sciences**: Fathima Hija T (B.Sc. Physics), Afifa M.A (B.Sc. (Hons.) Biotechnology), Labeeba (B.Sc. Physics)
- **Engineering & Tech**: Maryam Beevi C.S (B.Tech)
- **Architecture & Design**: Niya Fathima (B.Arch), Naqa Fathima (Bachelor of Design)
- **Humanities & Languages**: Hana Fathima (B.A. (Hons.) Spanish)

### 4. Flagship Programmes & Initiatives
- **Aroham UniMates**: 1-to-1 personalized mentorship matching students with registered university mentors (17 mentees, 10 mentors).
- **EduWay 2026 (Rose Lounge, Malappuram)**: Career summit delegation of 9 mentors guiding Classes 10–12.
- **GCC Higher Education Guidance**: 63 registrations, 50–55 active attendees, international student speakers.
- **UK Higher Education Session**: UCAS admissions, funding, and British university life.
- **Bolster Girls Campus Alumni Meet 2026**: First-year milestone and annual report release.

### 5. Interactive Features
- **Hero Campus Video Player**: Features the official Bolster Girls Campus video (`assets/videos/bolster-campus.mp4`) prominently showcased in the right hero grid space with high-definition clarity, rounded frame, top campus badge, and floating playback controls (Play/Pause, Sound/Mute toggle, and Fullscreen mode).
- **Alumni Detail Modal**: Click on any card to view detailed bio, academic focus areas, and direct mentorship booking.
- **UniMates Mentorship Request Modal**: Interactive application form for students of Classes 10–12 and entrance repeaters.
- **Volunteer Network Registration Modal**: Join the 123+ Bolster alumni volunteer team.
- **Full Annual Report Modal**: Read the report highlights and print directly.
- **Responsive Navigation with Tap Pull Animation**: All-caps navigation (`ABOUT`, `EXECUTIVE COMMITTEE`, `ADVISORS & TRAINERS`, etc.) with fluid tap animation, expanding brand indicator, smooth section pull scrolling, and a pull-down animated drawer on mobile.

---

## 🚀 How to Run / View

Simply double-click or open `index.html` in any web browser (Chrome, Edge, Safari, Firefox).

You can also run any local static file server:
```bash
# Using Node:
npx serve .
# or simply open index.html directly in your browser
```

