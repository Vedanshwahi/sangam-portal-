# 🚀 Sangam — Academia–Industry Collaboration Portal

[![Node.js](https://img.shields.io/badge/Node.js-v24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-63%20Passed-22C55E?logo=jest&logoColor=white)](#automated-testing)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Sangam** is a full-stack, enterprise-grade collaboration platform bridging the gap between university academic curricula and real-world tech industry hiring requirements. It provides role-gated experiences for **Students**, **Industry Talent Partners**, **College Deans / TPOs**, and **Academic Faculty**.

---

## 📑 Table of Contents
1. [Core Features by Stakeholder](#-core-features-by-stakeholder)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [Quickstart (Local Development)](#-quickstart-local-development)
4. [Automated Testing](#-automated-testing)
5. [Docker & Container Deployment](#-docker--container-deployment)
6. [Cloud Deployment Guides](#-cloud-deployment-guides)
   - [Render](#deploying-to-render)
   - [Railway](#deploying-to-railway)
   - [Fly.io](#deploying-to-flyio)
   - [Ubuntu VPS (Nginx + Systemd)](#deploying-to-an-ubuntu-vps)
7. [REST API Documentation](#-rest-api-documentation)
8. [Batch Student CSV Format](#-batch-student-csv-format)

---

## 🎯 Core Features by Stakeholder

### 1. 🎓 Student Persona (`Ananya Sharma` — B.Tech CSE, 3rd Year)
- **Target Role Calibration**: Configure target job titles (e.g. *Full Stack Cloud Engineer*), study hours, and academic subjects.
- **Skill Profile & 6-Axis Radar Chart**: Interactive SVG radar comparing verified student capability against industry benchmarks across Frontend, Core CS, Backend, System Design, Cloud/DevOps, and Soft Skills.
- **Interactive Career Quest Map**: Week-by-week sprint milestones (Docker, CI/CD, Redis Rate Limiting, Kubernetes, Observability). Toggling milestones dynamically updates XP points and recalculates readiness.
- **Targeted Weak-Skill Reassessment**: Take an adaptive micro-test on Docker & Rate Limiting to verify skills, triggering a live **+9% readiness boost** and canvas confetti.
- **Voice Practice Studio**: Record verbal responses to architectural prompts; calculates WPM pacing, detects filler words (`"um"`, `"like"`), and returns actionable AI coaching.
- **1-Click Opportunity Applications**: Apply directly to partner roles with real-time status tracking (`Applied`, `Shortlisted`, `Interview`, `Selected`).
- **Shareable Public Portfolio**: Clean public candidate profile (`sangam.edu/portfolio/22cs084`) with verified badges, credentials, and project GitHub links.

### 2. 🏢 Industry Recruiter Persona (`Priya Mehta` — Nexora Technologies)
- **AI-Ranked Candidate Pipeline**: Students automatically ranked by compatibility scores matching job requirements and verified coursework.
- **Applicant Dossiers**: Inspect student CGPAs, diagnostic radar scores, and project summaries.
- **Lifecycle Status Management**: Transition applicants between `Pending`, `Shortlisted`, `Interview`, and `Rejected` with persistent backend updates.
- **Postings Manager**: Create and publish internships, full-time roles, or sponsored capstones with required competencies.

### 3. 🏛️ College Dean / TPO Persona (`Dr. Arvind Swaminathan` — Apex Institute of Technology)
- **Institutional Readiness Suite**: Cohort-level readiness metrics across 480+ engineering students.
- **Readiness Band Distribution**: Visualizes percentage of students in *Job-Ready (>80%)*, *Emerging (60-80%)*, and *Needs Support (<60%)* tiers.
- **Curriculum vs. Industry Gap Diagnostics**: Identifies syllabus deficits (e.g. Docker -42%, Telemetry -38%) compared to active tech hiring mandates.
- **Batch Student CSV Import**: Drag-and-drop roster import with instant parsing, validation preview, and persistent database ingestion.

### 4. 🔬 Faculty R&D Persona (`Dr. Rajesh Nair` — Dean of R&D)
- **Sponsored FDP & Grant Feed**: Apply to corporate Faculty Development Programs (AWS, Google, Intel) and consultancy projects.
- **Proposal Submission**: Propose joint campus workshops, hackathons, and research labs to industry partners.
- **Collaboration Tracker**: Lifecycle monitoring of submitted proposals from review to approval.

---

## 🛠️ Tech Stack & Architecture

```
sangam-portal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # SQLite connection, WAL mode & schema setup
│   │   ├── controllers/              # Business logic for all 4 roles
│   │   ├── routes/                   # Modular Express API routing
│   │   ├── seeds/
│   │   │   └── seedData.js           # Comprehensive pre-seeded database data
│   │   └── server.js                 # Express web server & static file provider
│   └── data/
│       └── sangam.db                 # Persistent SQLite database file
├── public/
│   └── index.html                    # Unified React 19 + Tailwind v4 client UI
├── test/
│   └── api.test.js                   # 63 automated integration test assertions
├── Dockerfile                        # Multi-stage alpine container setup
├── docker-compose.yml                # 1-command Docker orchestration
├── .env.example                      # Environment configuration template
└── README.md
```

- **Backend**: Node.js v24 + Express.js (REST API, request logging, CORS, SPA fallback)
- **Database**: SQLite via `better-sqlite3` with Write-Ahead Logging (`WAL`) mode enabled for high concurrency and zero external database installation overhead.
- **Frontend**: React 19, Tailwind CSS v4, Plus Jakarta Sans, SVG Lucide Icons, Canvas Confetti.
- **Security**: Non-root container user, parameterized SQL queries, CORS origin constraints.

---

## ⚡ Quickstart (Local Development)

### Prerequisites
- Node.js v18+ (tested on Node.js v20 and v24)
- npm v9+

### 1. Clone & Enter Directory
```bash
cd "C:\Users\VEDANSH WAHI\.gemini\antigravity\scratch\sangam-portal"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```
*For automatic hot-reloading during development:*
```bash
npm run dev
```

### 4. Access the Platform
Open your browser at: **[http://localhost:3000](http://localhost:3000)**

- **1-Click Demo Logins** are available on the login screen for each role:
  - 🎓 **Student**: `ananya.sharma@apex.edu`
  - 🏢 **Industry**: `priya.mehta@nexora.io`
  - 🏛️ **College TPO**: `dean.placements@apex.edu`
  - 🔬 **Faculty**: `r.nair@apex.edu`

---

## 🧪 Automated Testing

Sangam includes an end-to-end integration test suite using native Node.js:

```bash
npm test
```

### Test Suite Coverage (63 Assertions, 13 Test Groups):
1. `GET /api/health` — Server health, uptime, and SQLite connectivity.
2. `GET /api/bootstrap` — Complete multi-role initial state payload.
3. `POST /api/auth/login` — Authentication and role verification for all 4 roles.
4. `GET & PUT /api/student/profile` — Profile retrieval and calibration.
5. `GET /api/student/skills` — 6 core competency axes.
6. `POST /api/student/roadmap/:id/toggle` — Dynamic milestone calculation.
7. `POST /api/student/reassessment/complete` — Weak-skill test boost (+9%).
8. `POST /api/student/soft-skills/analyze` — Cadence, fillers, and audio analysis.
9. `GET /api/student/portfolio/:rollNo` — Public candidate portfolio.
10. `GET & POST /api/opportunities/*` — Role filtering and 1-click apply.
11. `GET & PATCH /api/industry/*` — Candidate pipeline and status transitions.
12. `GET & POST /api/college/*` — Institutional analytics and CSV import.
13. `GET & POST /api/faculty/*` — FDP grants and proposal lodging.

---

## 🐳 Docker & Container Deployment

### Using Docker Compose (Recommended)
```bash
docker compose up -d --build
```
This builds the multi-stage Alpine image, mounts a named volume for SQLite persistence, exposes port `3000`, and sets up automatic container health checks.

### View Container Logs
```bash
docker compose logs -f
```

### Stop Container
```bash
docker compose down
```

### Manual Docker Build & Run
```bash
docker build -t sangam-portal:latest .
docker run -d -p 3000:3000 -v sangam-data:/app/backend/data --name sangam sangam-portal:latest
```

---

## ☁️ Cloud Deployment Guides

### Deploying to Render
1. Create a new **Web Service** on [Render](https://render.com/).
2. Select **Docker** environment (Render will automatically detect the `Dockerfile`).
3. Attach a **Persistent Disk**:
   - Mount Path: `/app/backend/data`
   - Size: `1 GB`
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
5. Click **Deploy**.

---

### Deploying to Railway
1. Install the Railway CLI or connect your GitHub repository on [Railway](https://railway.app/).
2. Railway detects the `Dockerfile` automatically.
3. Add a **Volume** under service settings:
   - Mount Path: `/app/backend/data`
4. Set Environment Variables:
   - `PORT`: `3000`
5. Deploy service.

---

### Deploying to Fly.io
1. Install Fly CLI and run:
   ```bash
   fly launch
   ```
2. Add a persistent volume for SQLite:
   ```bash
   fly volumes create sangam_data --size 1
   ```
3. Update `fly.toml`:
   ```toml
   [mounts]
     source = "sangam_data"
     destination = "/app/backend/data"
   ```
4. Deploy:
   ```bash
   fly deploy
   ```

---

### Deploying to an Ubuntu VPS
```bash
# 1. Install Node.js 24 & Git
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx build-essential

# 2. Clone repo and install
cd /var/www
git clone <your-repo-url> sangam-portal
cd sangam-portal
npm install --omit=dev

# 3. Create Systemd Service (/etc/systemd/system/sangam.service)
sudo bash -c 'cat > /etc/systemd/system/sangam.service << EOF
[Unit]
Description=Sangam Collaboration Portal
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/sangam-portal
ExecStart=/usr/bin/node backend/src/server.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=DB_PATH=/var/www/sangam-portal/backend/data/sangam.db

[Install]
WantedBy=multi-user.target
EOF'

# 4. Start & enable service
sudo systemctl daemon-reload
sudo systemctl enable --now sangam

# 5. Configure Nginx Reverse Proxy
sudo bash -c 'cat > /etc/nginx/sites-available/sangam << EOF
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'

sudo ln -s /etc/nginx/sites-available/sangam /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, uptime & DB status |
| `GET` | `/api/bootstrap` | Full multi-role seed & state bootstrap |
| `POST` | `/api/auth/login` | Authenticate with role key |
| `POST` | `/api/auth/logout` | Terminate session |
| `GET` | `/api/student/profile` | Retrieve student profile & semester subjects |
| `PUT` | `/api/student/profile` | Update target role, study hours, interests |
| `GET` | `/api/student/skills` | 6 core competency axes & benchmarks |
| `GET` | `/api/student/roadmap` | 5 sprint milestones & deliverables |
| `POST` | `/api/student/roadmap/:id/toggle` | Toggle milestone & recalculate readiness |
| `POST` | `/api/student/reassessment/complete` | Complete weak-skill test (+9% score jump) |
| `POST` | `/api/student/soft-skills/analyze` | Process verbal cadence, WPM & fillers |
| `GET` | `/api/student/portfolio/:rollNo` | Public verified candidate showcase |
| `GET` | `/api/opportunities` | Filter openings by type & work mode |
| `POST` | `/api/opportunities/apply` | 1-Click job application submission |
| `GET` | `/api/industry/candidates` | AI-ranked candidate pipeline |
| `PATCH` | `/api/industry/candidates/:id/status` | Move candidate to `shortlisted`, `interview`, `rejected` |
| `GET` | `/api/industry/postings` | Active campus hiring listings |
| `POST` | `/api/industry/postings` | Publish new job/internship opportunity |
| `GET` | `/api/college/overview` | Institutional KPIs & readiness distribution |
| `POST` | `/api/college/students/import` | Batch student CSV parsing & ingestion |
| `GET` | `/api/college/sample-csv` | Download sample CSV template |
| `GET` | `/api/faculty/overview` | R&D grant portfolio & sponsored projects |
| `POST` | `/api/faculty/opportunities/:id/apply` | Apply for corporate FDP or grant |
| `POST` | `/api/faculty/proposals` | Submit new industry workshop proposal |

---

## 📊 Batch Student CSV Format

When uploading a roster in the College Admin portal, use the following CSV schema:

```csv
RollNo,Name,Email,Branch,AcademicYear,CGPA,ReadinessScore,PlacementStatus
22CS201,Kavya Nair,kavya.n@apex.edu.in,CSE,3rd Year,8.85,78,Available
22CS202,Aditya Verma,aditya.v@apex.edu.in,CSE,4th Year,9.10,86,In Interview
22IT105,Priyanka Sharma,priyanka.s@apex.edu.in,IT,3rd Year,8.20,74,Available
22AI088,Varun Mehta,varun.m@apex.edu.in,AI & Data Science,4th Year,8.95,84,Placed
22EC064,Divya Rao,divya.r@apex.edu.in,ECE,3rd Year,7.90,62,Available
```

The system automatically parses headers, validates columns, maps each student into readiness tiers (*Job-Ready*, *Emerging*, or *Needs Support*), and updates the college dashboard in real time.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
