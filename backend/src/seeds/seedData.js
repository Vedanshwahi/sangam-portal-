/**
 * Seed data for Sangam — Academia–Industry Collaboration Portal
 * Extracted directly from initial platform models.
 */

const initialUsers = {
  student: {
    id: "usr-student",
    role: "student",
    name: "Ananya Sharma",
    email: "ananya.sharma@apex.edu",
    title: "B.Tech Computer Science (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    institutionOrCompany: "Apex Institute of Technology",
    password: "password123"
  },
  industry: {
    id: "usr-industry",
    role: "industry",
    name: "Priya Mehta",
    email: "priya.mehta@nexora.io",
    title: "Lead Campus Talent Partner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    institutionOrCompany: "Nexora Technologies",
    password: "password123"
  },
  college: {
    id: "usr-college",
    role: "college",
    name: "Dr. Arvind Swaminathan",
    email: "dean.placements@apex.edu",
    title: "Dean of Corporate Relations & TPO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    institutionOrCompany: "Apex Institute of Technology",
    password: "password123"
  },
  faculty: {
    id: "usr-faculty",
    role: "faculty",
    name: "Dr. Rajesh Nair",
    email: "r.nair@apex.edu",
    title: "Professor & Head of AI Research",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    institutionOrCompany: "Apex Institute of Technology",
    password: "password123"
  }
};

const initialStudentProfile = {
  id: "prof-ananya",
  userId: "usr-student",
  name: "Ananya Sharma",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  email: "ananya.sharma@apex.edu.in",
  rollNo: "22CS084",
  college: "Apex Institute of Technology",
  branch: "Computer Science & Engineering",
  academicYear: "3rd Year",
  currentSemester: 6,
  targetCareerRole: "Full Stack Cloud Engineer",
  weeklyLearningHours: 12,
  interests: JSON.stringify([
    "Cloud Architecture",
    "Distributed Systems",
    "Modern Frontend",
    "API Security",
    "AI Microservices"
  ]),
  currentSubjects: JSON.stringify([
    { id: "sub-1", code: "CS301", name: "Cloud Computing & Virtualization", credits: 4, alignedSkill: "Cloud & DevOps" },
    { id: "sub-2", code: "CS302", name: "Advanced Database Systems", credits: 3, alignedSkill: "Database Architecture" },
    { id: "sub-3", code: "CS303", name: "Computer Networks & Protocols", credits: 4, alignedSkill: "Distributed Systems" },
    { id: "sub-4", code: "CS304", name: "Software Engineering & Agile", credits: 3, alignedSkill: "CI/CD & Testing" }
  ]),
  overallReadiness: 76,
  previousReadiness: 68,
  lastAssessmentDate: "2026-08-28",
  targetReadinessBenchmark: 85
};

const initialSkillCompetencies = [
  {
    id: "sk-1",
    studentId: "prof-ananya",
    name: "Modern React & State Architecture",
    category: "frontend",
    currentProficiency: 88,
    requiredProficiency: 80,
    type: "strength",
    courseworkReinforced: 0,
    reinforcedCourse: null,
    learningHoursToBridge: 0
  },
  {
    id: "sk-2",
    studentId: "prof-ananya",
    name: "Data Structures & Algorithmic Design",
    category: "core_cs",
    currentProficiency: 82,
    requiredProficiency: 80,
    type: "strength",
    courseworkReinforced: 1,
    reinforcedCourse: "CS201 Data Structures",
    learningHoursToBridge: 0
  },
  {
    id: "sk-3",
    studentId: "prof-ananya",
    name: "Database Architecture & Query Tuning",
    category: "backend",
    currentProficiency: 76,
    requiredProficiency: 80,
    type: "emerging",
    courseworkReinforced: 1,
    reinforcedCourse: "CS302 Advanced Database Systems",
    learningHoursToBridge: 6
  },
  {
    id: "sk-4",
    studentId: "prof-ananya",
    name: "System Design & Distributed Scalability",
    category: "system_design",
    currentProficiency: 65,
    requiredProficiency: 82,
    type: "weakness",
    courseworkReinforced: 1,
    reinforcedCourse: "CS303 Computer Networks",
    learningHoursToBridge: 14
  },
  {
    id: "sk-5",
    studentId: "prof-ananya",
    name: "Docker, Kubernetes & CI/CD Pipelines",
    category: "cloud_devops",
    currentProficiency: 54,
    requiredProficiency: 78,
    type: "weakness",
    courseworkReinforced: 1,
    reinforcedCourse: "CS301 Cloud Computing",
    learningHoursToBridge: 18
  },
  {
    id: "sk-6",
    studentId: "prof-ananya",
    name: "Technical Articulation & Soft Skills",
    category: "soft_skills",
    currentProficiency: 70,
    requiredProficiency: 85,
    type: "emerging",
    courseworkReinforced: 0,
    reinforcedCourse: null,
    learningHoursToBridge: 8
  }
];

const initialRoadmapWeeks = [
  {
    id: "rw-1",
    studentId: "prof-ananya",
    weekNumber: 1,
    title: "Containerization Fundamentals & Multi-Stage Builds",
    topic: "Containerize fullstack apps with optimized Docker layers and non-root users",
    estimatedHours: 6,
    reinforcedByCoursework: "CS301 Cloud Computing (Lab Unit 2)",
    status: "completed",
    completed: 1,
    milestoneProject: "Production Dockerfile for Node.js + React microservice",
    readinessBoost: 3,
    resources: JSON.stringify([
      { id: "res-1", title: "Docker Multi-Stage Build Best Practices", type: "doc", duration: "25 min", source: "Docker Official Docs" },
      { id: "res-2", title: "Hands-on Lab: Containerizing a High-Traffic API", type: "lab", duration: "90 min", source: "Sangam Interactive Sandbox" }
    ])
  },
  {
    id: "rw-2",
    studentId: "prof-ananya",
    weekNumber: 2,
    title: "CI/CD Automation with GitHub Actions & AWS ECR",
    topic: "Automate linting, unit testing, docker build, vulnerability scan, and image pushing",
    estimatedHours: 7,
    reinforcedByCoursework: "CS304 Software Engineering (Agile DevOps)",
    status: "completed",
    completed: 1,
    milestoneProject: "Automated CI/CD workflow with caching and zero-downtime test pipeline",
    readinessBoost: 4,
    resources: JSON.stringify([
      { id: "res-3", title: "GitHub Actions Matrix Builds & Secrets Management", type: "video", duration: "40 min", source: "DevOps Catalyst" },
      { id: "res-4", title: "Interactive Lab: Writing Production CI/CD YAML", type: "lab", duration: "120 min", source: "Sangam Labs" }
    ])
  },
  {
    id: "rw-3",
    studentId: "prof-ananya",
    weekNumber: 3,
    title: "API Rate Limiting, Redis Caching & Invalidation",
    topic: "Implement token bucket rate limiters, distributed Redis caching, and cache eviction strategies",
    estimatedHours: 8,
    reinforcedByCoursework: "CS303 Computer Networks (HTTP/TCP Flow Control)",
    status: "in_progress",
    completed: 0,
    milestoneProject: "Resilient API gateway with Redis cluster and sliding window rate limiter",
    readinessBoost: 5,
    resources: JSON.stringify([
      { id: "res-5", title: "System Design Primer: Distributed Caching Architecture", type: "doc", duration: "35 min", source: "HighScalability" },
      { id: "res-6", title: "Code Walkthrough: Sliding Window Rate Limiting in Node & Redis", type: "video", duration: "45 min", source: "Sangam Tech Series" }
    ])
  },
  {
    id: "rw-4",
    studentId: "prof-ananya",
    weekNumber: 4,
    title: "Kubernetes Pod Scheduling, Services & Ingress",
    topic: "Deploy microservices to a local Minikube / K3s cluster with ConfigMaps and Ingress",
    estimatedHours: 8,
    reinforcedByCoursework: "CS301 Cloud Computing (Unit 4 Orchestration)",
    status: "locked",
    completed: 0,
    milestoneProject: "High-availability Kubernetes deployment manifest with Horizontal Pod Autoscaling",
    readinessBoost: 4,
    resources: JSON.stringify([
      { id: "res-7", title: "Kubernetes Architecture Illustrated", type: "doc", duration: "30 min", source: "K8s Foundation" },
      { id: "res-8", title: "Interactive KubeCluster Debugging Sandbox", type: "lab", duration: "110 min", source: "Sangam Cloud Simulator" }
    ])
  },
  {
    id: "rw-5",
    studentId: "prof-ananya",
    weekNumber: 5,
    title: "Distributed Tracing & Production Observability",
    topic: "Set up OpenTelemetry, Prometheus metrics, and Grafana dashboards for latency diagnosis",
    estimatedHours: 6,
    reinforcedByCoursework: null,
    status: "locked",
    completed: 0,
    milestoneProject: "Telemetry pipeline identifying p99 tail latency bottlenecks",
    readinessBoost: 4,
    resources: JSON.stringify([
      { id: "res-9", title: "OpenTelemetry in Modern Microservices", type: "doc", duration: "30 min", source: "CNCF Docs" }
    ])
  }
];

const initialDiagnosticQuestions = [
  {
    id: "q-1",
    type: "scenario",
    category: "System Design & Scalability",
    difficulty: "Intermediate",
    question: "A photo-sharing service experiences sudden 10x traffic spikes during product launches. The database writes are locking the user table and increasing p99 latency to 4.2 seconds. Which architectural pattern should be implemented first?",
    options: JSON.stringify([
      "Replace PostgreSQL with an unindexed flat file storage on AWS S3",
      "Introduce an asynchronous message broker (Kafka/RabbitMQ) with worker pools and write-back caching",
      "Increase the client-side HTTP polling frequency to 100ms to distribute requests",
      "Vertically upgrade the database RAM while keeping synchronous blocking write queries"
    ]),
    correctIndex: 1,
    explanation: "Decoupling heavy writes using an asynchronous queue (like Kafka or RabbitMQ) ensures immediate client acknowledgment while background workers process writes systematically, safeguarding the primary database from sudden connection exhaustion."
  },
  {
    id: "q-2",
    type: "code",
    category: "Cloud & Containerization",
    difficulty: "Intermediate",
    question: "Analyze the following Dockerfile snippet. Which line poses the most critical security and performance vulnerability for production deployments?",
    codeSnippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nUSER root\nEXPOSE 3000\nCMD ["npm", "start"]`,
    options: JSON.stringify([
      "Using alpine base image node:20-alpine instead of ubuntu",
      "Running as USER root and doing COPY . . before npm install (breaking layer cache and running as superuser)",
      "Exposing port 3000 instead of standard HTTPS port 443",
      "Invoking CMD [\"npm\", \"start\"] instead of direct node execution"
    ]),
    correctIndex: 1,
    explanation: "Running the container process as \"root\" creates significant security vulnerabilities if escaped. Furthermore, copying the entire directory before \"npm install\" invalidates Docker layer cache on every code change, drastically slowing build times."
  },
  {
    id: "q-3",
    type: "mcq",
    category: "Distributed Systems",
    difficulty: "Advanced",
    question: "In the context of the CAP theorem and distributed databases, what guarantees does a system provide when it prioritizes Consistency and Partition Tolerance (CP) during a network partition?",
    options: JSON.stringify([
      "Every non-failing node returns a response, even if the data is stale",
      "The system rejects writes or returns errors to avoid serving divergent or out-of-sync state across partitions",
      "Network partitions never occur because fiber-optic links are redundancy-locked",
      "Reads are always routed to the closest edge CDN regardless of replication consensus"
    ]),
    correctIndex: 1,
    explanation: "A CP system prioritizes atomic consistency over availability. When a partition occurs, it stops accepting writes or reading from segregated nodes until consensus is restored, preventing split-brain state."
  },
  {
    id: "q-4",
    type: "scenario",
    category: "Database Architecture",
    difficulty: "Intermediate",
    question: "Your SQL query `SELECT * FROM orders WHERE user_id = 4920 AND status = \"shipped\" ORDER BY created_at DESC;` is doing a sequential table scan across 12M rows. What composite index provides optimal performance?",
    options: JSON.stringify([
      "CREATE INDEX idx_orders ON orders (status);",
      "CREATE INDEX idx_orders ON orders (user_id, status, created_at DESC);",
      "CREATE INDEX idx_orders ON orders (created_at DESC);",
      "CREATE INDEX idx_orders ON orders (id, user_id);"
    ]),
    correctIndex: 1,
    explanation: "A composite index matching the equality filters first (user_id, status) followed by the ordering column (created_at DESC) allows the database engine to perform an index seek and return rows in pre-sorted order without costly memory sorting."
  }
];

const initialReassessmentQuestions = [
  {
    id: "rq-1",
    type: "mcq",
    category: "Docker Orchestration & Rate Limiting",
    difficulty: "Intermediate",
    question: "Which HTTP header should an API gateway return when a client exceeds its permitted token rate limit under RFC 6585?",
    options: JSON.stringify([
      "403 Forbidden with Retry-After",
      "429 Too Many Requests with Retry-After",
      "503 Service Unavailable with RateLimit-Reset",
      "400 Bad Request with RateLimit-Remaining: 0"
    ]),
    correctIndex: 1,
    explanation: "HTTP status code 429 (Too Many Requests) combined with the Retry-After header indicates the client has sent too many requests in a given amount of time and specifies when to retry."
  },
  {
    id: "rq-2",
    type: "scenario",
    category: "Docker Multi-Stage Optimization",
    difficulty: "Intermediate",
    question: "To minimize the final production container footprint for a Next.js application, which technique yields the highest size reduction?",
    options: JSON.stringify([
      "Keep devDependencies in the final container image for runtime patching",
      "Use multi-stage builds and copy only the standalone `.next/standalone` directory and static assets into a minimal node:alpine runner",
      "Compress the Docker container tarball with gzip before running it",
      "Run the application directly inside Docker without Node.js runtime installed"
    ]),
    correctIndex: 1,
    explanation: "Next.js standalone output isolates only the production dependencies and built files, reducing Docker image size from ~1.2 GB down to under ~95 MB."
  },
  {
    id: "rq-3",
    type: "code",
    category: "Redis Distributed Caching",
    difficulty: "Intermediate",
    question: "What is the primary danger of setting an identical expiration time (TTL) of 3600 seconds on millions of cached user session keys?",
    options: JSON.stringify([
      "Cache Stampede / Cache Avalanche when all keys expire simultaneously, overwhelming the database",
      "Redis runs out of CPU cycles by attempting to serialize memory addresses",
      "The operating system TCP stack drops outbound socket packets",
      "Clients will be forcibly logged out with HTTP 404"
    ]),
    correctIndex: 0,
    explanation: "A Cache Avalanche occurs when multiple cached items expire simultaneously, triggering a deluge of cache-miss queries directly against the backend database. Adding random jitter to TTL values mitigates this."
  }
];

const initialSoftSkillsAnalysis = {
  id: "soft-ananya",
  studentId: "prof-ananya",
  recordedAt: "2026-09-02T14:30:00Z",
  durationSeconds: 48,
  transcript: "In my recent distributed systems capstone project, we faced a major bottleneck where concurrent WebSocket connections were degrading Postgres throughput. I proposed decoupling the real-time event streaming using Redis Pub/Sub, while implementing worker threads to batch write updates every 500 milliseconds. This reduced CPU utilization by 42% and brought p95 latency under 80ms.",
  overallScore: 82,
  metrics: JSON.stringify({
    paceWpm: 136,
    paceStatus: "Optimal",
    pauseCount: 4,
    pauseStatus: "Natural",
    fillerWordsCount: 2,
    fillerWordsDetected: ["um", "like"],
    pitchModulationScore: 84,
    toneConfidenceScore: 86
  }),
  strengths: JSON.stringify([
    "Excellent pacing: 136 words/min falls cleanly in the optimal 130–150 professional presentation zone.",
    "Structured STAR delivery: Clearly framed Situation, Task, Action (Redis Pub/Sub), and quantitative Result (42% CPU reduction).",
    "Crisp technical terminology and assertive, confident vocal projection."
  ]),
  improvements: JSON.stringify([
    "Slight hesitation before articulating \"Postgres throughput\" — practice transition phrasing.",
    "Work on breathing pauses between the technical problem statement and the architectural solution."
  ]),
  aiActionableAdvice: "Your technical clarity is outstanding! To reach the top 5% executive presence tier, replace the 1-second filler \"um\" with an intentional 0.8-second silent pause. Silence conveys mastery and gives recruiters time to absorb your architectural metrics."
};

const initialOpportunities = [
  {
    id: "opp-1",
    title: "Full Stack Cloud Engineering Intern",
    company: "Nexora Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    type: "internship",
    workMode: "Hybrid",
    location: "Bengaluru, India (Hybrid)",
    stipendOrSalary: "₹45,000 / month",
    duration: "6 Months (PPO Potential)",
    deadline: "2026-09-25",
    matchScore: 94,
    requiredSkills: JSON.stringify([
      { name: "React & TypeScript", requiredProficiency: 80 },
      { name: "Node.js & Microservices", requiredProficiency: 75 },
      { name: "Docker & CI/CD", requiredProficiency: 70 },
      { name: "PostgreSQL Architecture", requiredProficiency: 75 }
    ]),
    matchedSkills: JSON.stringify(["React & TypeScript (88%)", "Node.js (80%)", "PostgreSQL Architecture (76%)"]),
    missingSkills: JSON.stringify(["Kubernetes Cluster Monitoring (54% vs 70%)"]),
    courseworkSynergies: JSON.stringify(["CS301 Cloud Computing syllabus aligns directly with Nexora Cloud platform stack"]),
    description: "Join Nexora Cloud Core team building enterprise multi-tenant analytics. You will build high-concurrency microservices, optimize Redis distributed cache clusters, and craft elegant React interfaces with tailwind and TypeScript.",
    applicantsCount: 38,
    openings: 4,
    createdAt: "2026-08-20"
  },
  {
    id: "opp-2",
    title: "Junior Platform Engineer",
    company: "Razorpay Partner Labs",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    type: "full_time",
    workMode: "On-site",
    location: "Bengaluru, India",
    stipendOrSalary: "₹14.5 - ₹18.0 LPA",
    duration: null,
    deadline: "2026-10-10",
    matchScore: 88,
    requiredSkills: JSON.stringify([
      { name: "Distributed Systems & Go/Node", requiredProficiency: 82 },
      { name: "Database Scalability", requiredProficiency: 80 },
      { name: "API Security & OAuth2", requiredProficiency: 75 }
    ]),
    matchedSkills: JSON.stringify(["Database Systems (76%)", "Data Structures (82%)", "System Design (65%)"]),
    missingSkills: JSON.stringify(["Advanced Golang Concurrency"]),
    courseworkSynergies: JSON.stringify(["CS303 Computer Networks and CS302 Database Systems"]),
    description: "Help build scalable fintech payment checkout workflows handling 8,000 TPS. Focus on fault tolerance, idempotency keys, and zero-loss message processing.",
    applicantsCount: 74,
    openings: 2,
    createdAt: "2026-08-25"
  },
  {
    id: "opp-3",
    title: "Industry R&D Capstone: Distributed Edge Telemetry",
    company: "TCS Research & Innovation",
    companyLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=80",
    type: "capstone_project",
    workMode: "Remote",
    location: "Remote / Virtual Lab",
    stipendOrSalary: "₹25,000 Project Grant + Hardware Kit",
    duration: "4 Months (Academic Credits Count)",
    deadline: "2026-09-30",
    matchScore: 85,
    requiredSkills: JSON.stringify([
      { name: "IoT Telemetry & MQTT", requiredProficiency: 70 },
      { name: "Cloud Architecture", requiredProficiency: 75 },
      { name: "Time-Series Databases", requiredProficiency: 70 }
    ]),
    matchedSkills: JSON.stringify(["Cloud Computing (76%)", "Computer Networks (82%)"]),
    missingSkills: JSON.stringify(["MQTT Protocol deep-dive"]),
    courseworkSynergies: JSON.stringify(["Counts towards final year 8th-semester capstone credit requirement"]),
    description: "Work alongside TCS Senior Principal Scientists to prototype edge telemetry ingestion systems. High-performing students receive pre-placement fast-track interviews.",
    applicantsCount: 22,
    openings: 5,
    createdAt: "2026-09-01"
  },
  {
    id: "opp-4",
    title: "Frontend Systems Architect Intern",
    company: "Zerodha Technology Guild",
    companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80",
    type: "internship",
    workMode: "Remote",
    location: "Remote (Anywhere in India)",
    stipendOrSalary: "₹50,000 / month",
    duration: "6 Months",
    deadline: "2026-10-15",
    matchScore: 91,
    requiredSkills: JSON.stringify([
      { name: "React & Virtual DOM Internals", requiredProficiency: 85 },
      { name: "WebSockets & High-Frequency Streaming", requiredProficiency: 80 },
      { name: "Web Performance & Canvas", requiredProficiency: 75 }
    ]),
    matchedSkills: JSON.stringify(["React & TypeScript (88%)", "Algorithms (82%)"]),
    missingSkills: JSON.stringify(["WebAssembly canvas rendering"]),
    courseworkSynergies: JSON.stringify(["CS303 Computer Networks WebSockets lab"]),
    description: "Build low-latency trading charts and reactive tickers. Zerodha values simplicity, clean code with zero bloat, and deep understanding of browser rendering pipelines.",
    applicantsCount: 65,
    openings: 2,
    createdAt: "2026-08-28"
  }
];

const initialApplications = [
  {
    id: "app-1",
    studentId: "prof-ananya",
    opportunityId: "opp-1",
    roleTitle: "Full Stack Cloud Engineering Intern",
    company: "Nexora Technologies",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    type: "internship",
    appliedDate: "2026-08-30",
    status: "interview",
    stageTimeline: JSON.stringify({
      applied: "2026-08-30",
      shortlisted: "2026-09-02",
      interview: "2026-09-08 (11:00 AM IST)"
    }),
    interviewerNote: "Strong score on System Design & React benchmark. Interview panel scheduled with Cloud Tech Lead.",
    feedback: "Portfolio showcase project (Distributed Cache) stood out positively."
  },
  {
    id: "app-2",
    studentId: "prof-ananya",
    opportunityId: "opp-2",
    roleTitle: "Junior Platform Engineer",
    company: "Razorpay Partner Labs",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    type: "full_time",
    appliedDate: "2026-09-01",
    status: "shortlisted",
    stageTimeline: JSON.stringify({
      applied: "2026-09-01",
      shortlisted: "2026-09-04"
    }),
    interviewerNote: "Candidate passed algorithmic screening threshold. Awaiting interview slot confirmation.",
    feedback: null
  },
  {
    id: "app-3",
    studentId: "prof-ananya",
    opportunityId: "opp-3",
    roleTitle: "Industry R&D Capstone: Distributed Edge Telemetry",
    company: "TCS Research & Innovation",
    companyLogo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=80",
    type: "capstone_project",
    appliedDate: "2026-09-03",
    status: "applied",
    stageTimeline: JSON.stringify({
      applied: "2026-09-03"
    }),
    interviewerNote: "Proposal under initial review by Principal Scientist committee.",
    feedback: null
  }
];

const initialRankedCandidates = [
  {
    id: "cand-1",
    name: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    branch: "Computer Science & Engineering",
    academicYear: "3rd Year (Batch 2027)",
    cgpa: 8.92,
    overallReadiness: 76,
    matchScore: 94,
    targetRole: "Full Stack Cloud Engineer",
    topSkills: JSON.stringify([
      { name: "React/TS", level: 88 },
      { name: "DSA", level: 82 },
      { name: "Cloud/Docker", level: 68 },
      { name: "PostgreSQL", level: 76 }
    ]),
    status: "interview",
    appliedFor: "Full Stack Cloud Engineering Intern",
    appliedDate: "2026-08-30",
    resumeSummary: "Built production-grade distributed rate-limiter in Redis & Node. Strong grasp of modern frontend and state management with 3rd-year coursework alignment."
  },
  {
    id: "cand-2",
    name: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "National Institute of Technology",
    branch: "Information Technology",
    academicYear: "4th Year (Batch 2026)",
    cgpa: 8.74,
    overallReadiness: 85,
    matchScore: 89,
    targetRole: "Backend Platform Engineer",
    topSkills: JSON.stringify([
      { name: "Go/Microservices", level: 86 },
      { name: "Kafka", level: 80 },
      { name: "PostgreSQL", level: 84 },
      { name: "Docker/K8s", level: 78 }
    ]),
    status: "shortlisted",
    appliedFor: "Full Stack Cloud Engineering Intern",
    appliedDate: "2026-08-31",
    resumeSummary: "Active open-source contributor to Kubernetes ecosystem. Deep expertise in distributed message queues and Go concurrency patterns."
  },
  {
    id: "cand-3",
    name: "Sneha Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Apex Institute of Technology",
    branch: "AI & Data Science",
    academicYear: "3rd Year (Batch 2027)",
    cgpa: 9.15,
    overallReadiness: 81,
    matchScore: 82,
    targetRole: "AI Microservices Engineer",
    topSkills: JSON.stringify([
      { name: "Python/FastAPI", level: 90 },
      { name: "Vector DBs/RAG", level: 84 },
      { name: "Docker", level: 72 },
      { name: "React", level: 70 }
    ]),
    status: "pending",
    appliedFor: "Full Stack Cloud Engineering Intern",
    appliedDate: "2026-09-02",
    resumeSummary: "Created university automated grading assistant utilizing LangChain and FAISS. High academic standing and strong linear algebra foundation."
  },
  {
    id: "cand-4",
    name: "Vikram Rao",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    college: "Vellore Tech Institute",
    branch: "Electronics & Communication",
    academicYear: "3rd Year (Batch 2027)",
    cgpa: 7.82,
    overallReadiness: 62,
    matchScore: 68,
    targetRole: "Full Stack Developer",
    topSkills: JSON.stringify([
      { name: "JavaScript", level: 72 },
      { name: "HTML/CSS", level: 80 },
      { name: "Node.js", level: 60 },
      { name: "Docker", level: 45 }
    ]),
    status: "rejected",
    appliedFor: "Full Stack Cloud Engineering Intern",
    appliedDate: "2026-08-29",
    resumeSummary: "Built several static frontend portfolio websites. Needs further skill bridging in containerization and SQL query optimization."
  }
];

const initialIndustryPostings = [
  {
    id: "post-1",
    title: "Full Stack Cloud Engineering Intern",
    type: "internship",
    department: "Cloud Platform Architecture",
    openings: 4,
    stipend: "₹45,000 / month",
    location: "Bengaluru (Hybrid)",
    status: "active",
    applicantsCount: 38,
    shortlistedCount: 6,
    requiredSkills: JSON.stringify(["React", "TypeScript", "Node.js", "Docker", "PostgreSQL"]),
    postedDate: "2026-08-20"
  },
  {
    id: "post-2",
    title: "DevOps & Site Reliability Engineer (New Grad)",
    type: "full_time",
    department: "Infrastructure & Reliability",
    openings: 2,
    stipend: "₹16 LPA",
    location: "Hyderabad / Hybrid",
    status: "active",
    applicantsCount: 52,
    shortlistedCount: 4,
    requiredSkills: JSON.stringify(["Kubernetes", "Terraform", "Prometheus", "AWS", "Linux Internals"]),
    postedDate: "2026-08-25"
  },
  {
    id: "post-3",
    title: "Distributed Systems Capstone Research Fellowship",
    type: "capstone_project",
    department: "Applied R&D Labs",
    openings: 3,
    stipend: "₹30,000 / month",
    location: "Remote",
    status: "active",
    applicantsCount: 19,
    shortlistedCount: 5,
    requiredSkills: JSON.stringify(["Distributed Consensus", "Raft/Paxos", "C++/Go", "Benchmarking"]),
    postedDate: "2026-09-01"
  }
];

const initialCollegeStudents = [
  { id: "cs-1", rollNo: "22CS084", name: "Ananya Sharma", email: "ananya.sharma@apex.edu.in", branch: "CSE", academicYear: "3rd Year", cgpa: 8.92, readinessScore: 76, tier: "Emerging (60-80%)", placementStatus: "In Interview" },
  { id: "cs-2", rollNo: "22CS012", name: "Aarav Patel", email: "aarav.p@apex.edu.in", branch: "CSE", academicYear: "4th Year", cgpa: 9.35, readinessScore: 89, tier: "Job-Ready (>80%)", placementStatus: "Placed" },
  { id: "cs-3", rollNo: "22IT045", name: "Meera Iyer", email: "meera.i@apex.edu.in", branch: "IT", academicYear: "4th Year", cgpa: 8.64, readinessScore: 83, tier: "Job-Ready (>80%)", placementStatus: "Placed" },
  { id: "cs-4", rollNo: "22AI021", name: "Sneha Patel", email: "sneha.p@apex.edu.in", branch: "AI & Data Science", academicYear: "3rd Year", cgpa: 9.15, readinessScore: 81, tier: "Job-Ready (>80%)", placementStatus: "In Interview" },
  { id: "cs-5", rollNo: "22CS102", name: "Kabir Das", email: "kabir.d@apex.edu.in", branch: "CSE", academicYear: "3rd Year", cgpa: 7.85, readinessScore: 68, tier: "Emerging (60-80%)", placementStatus: "Available" },
  { id: "cs-6", rollNo: "22EC033", name: "Tanvi Joshi", email: "tanvi.j@apex.edu.in", branch: "ECE", academicYear: "4th Year", cgpa: 8.12, readinessScore: 72, tier: "Emerging (60-80%)", placementStatus: "In Interview" },
  { id: "cs-7", rollNo: "22CS144", name: "Rishi Menon", email: "rishi.m@apex.edu.in", branch: "CSE", academicYear: "2nd Year", cgpa: 7.20, readinessScore: 54, tier: "Needs Support (<60%)", placementStatus: "Available" },
  { id: "cs-8", rollNo: "22ME015", name: "Aditya Kulkarni", email: "aditya.k@apex.edu.in", branch: "Mechanical", academicYear: "4th Year", cgpa: 7.45, readinessScore: 58, tier: "Needs Support (<60%)", placementStatus: "Available" },
  { id: "cs-9", rollNo: "22IT089", name: "Pooja Hegde", email: "pooja.h@apex.edu.in", branch: "IT", academicYear: "3rd Year", cgpa: 8.42, readinessScore: 78, tier: "Emerging (60-80%)", placementStatus: "Available" },
  { id: "cs-10", rollNo: "22AI056", name: "Devansh Roy", email: "devansh.r@apex.edu.in", branch: "AI & Data Science", academicYear: "4th Year", cgpa: 9.02, readinessScore: 87, tier: "Job-Ready (>80%)", placementStatus: "Placed" }
];

const initialCurriculumGaps = [
  {
    id: "gap-1",
    domain: "Containerization & K8s Orchestration",
    industryDemand: "92% of Tech Openings Require",
    currentSyllabusCoverage: "28% Theoretical Overview",
    deficit: 42,
    affectedBranch: "CSE & IT (Semester 6)",
    recommendation: "Augment CS301 Cloud Computing with 4 hands-on Minikube labs and Docker multi-stage build exercises."
  },
  {
    id: "gap-2",
    domain: "Production Observability & Telemetry",
    industryDemand: "78% of Cloud Roles Require",
    currentSyllabusCoverage: "15% Basic Logging",
    deficit: 38,
    affectedBranch: "CSE & Software Engineering",
    recommendation: "Integrate OpenTelemetry tracing and Grafana dashboard visualization into CS304 Agile DevOps unit."
  },
  {
    id: "gap-3",
    domain: "High-Concurrency Redis Caching & Queues",
    industryDemand: "84% of Backend Roles Require",
    currentSyllabusCoverage: "35% Basic SQL Relational Only",
    deficit: 28,
    affectedBranch: "All Computer Science Branches",
    recommendation: "Introduce in-memory Redis cluster caching and message brokers (RabbitMQ) in CS302 Database Systems."
  }
];

const initialFacultyOpportunities = [
  {
    id: "fop-1",
    title: "Industry Immersion FDP: Enterprise Cloud Architecture & GenAI",
    type: "fdp",
    sponsor: "Amazon Web Services (AWS) India Academics",
    stipendOrGrant: "₹1,50,000 Faculty Stipend + AWS Cloud Credits",
    duration: "2 Weeks (Intensive Hands-on Workshop)",
    deadline: "2026-09-28",
    domain: "Cloud Computing & Generative AI",
    description: "Faculty Development Program designed to equip professors with current cloud-native architecture paradigms, AWS Bedrock orchestration, and multi-tenant security.",
    deliverables: JSON.stringify([
      "Curriculum modernization blueprint",
      "Hands-on lab integration into semester syllabus",
      "AWS Certified Solutions Architect voucher"
    ]),
    status: "open"
  },
  {
    id: "fop-2",
    title: "Corporate Consultancy: Edge AI Optimization for EV Battery Telemetry",
    type: "consultancy",
    sponsor: "Ather Energy R&D",
    stipendOrGrant: "₹8,50,000 Research Grant",
    duration: "6 Months",
    deadline: "2026-10-15",
    domain: "Embedded Systems & Predictive Analytics",
    description: "Ather Energy is seeking domain faculty experts to consult on thermal runaway early-warning models running on resource-constrained microcontrollers.",
    deliverables: JSON.stringify([
      "Algorithmic whitepaper",
      "Quantized model benchmarks on ARM Cortex-M4",
      "Quarterly review milestones with Ather lead engineers"
    ]),
    status: "open"
  },
  {
    id: "fop-3",
    title: "Sponsored Research Fellowship: Privacy-Preserving Federated Learning",
    type: "research_grant",
    sponsor: "Google Research India",
    stipendOrGrant: "₹14,00,000 Institutional Grant",
    duration: "12 Months",
    deadline: "2026-11-01",
    domain: "Distributed Machine Learning & Cryptography",
    description: "Investigating differential privacy mechanisms in federated medical diagnostics without compromising central aggregation convergence rates.",
    deliverables: JSON.stringify([
      "Two joint IEEE/ACM conference publications",
      "Open source Python library release",
      "PhD and Master student stipend funding"
    ]),
    status: "open"
  }
];

const initialFacultyProposals = [
  {
    id: "prop-1",
    title: "Joint Workshop on Microservices Design & Kubernetes in Practice",
    type: "guest_lecture",
    industryPartner: "Nexora Technologies",
    submittedDate: "2026-08-25",
    status: "approved",
    department: "Department of Computer Science & Engineering",
    summary: "2-day immersive campus workshop featuring senior staff architects from Nexora conducting live architecture breakdowns and student code reviews.",
    budgetEstimate: "₹60,000 (Industry Sponsored)"
  },
  {
    id: "prop-2",
    title: "Industry-Academia Co-Op Lab for Autonomous Telematics",
    type: "industry_lab",
    industryPartner: "Tata Motors & Ather Energy",
    submittedDate: "2026-09-02",
    status: "under_review",
    department: "Interdisciplinary (CSE & Mechanical)",
    summary: "Establishing a state-of-the-art telemetry sandbox lab funded 50-50 by state research grant and automotive industry partners.",
    budgetEstimate: "₹22,00,000"
  }
];

const initialNotifications = {
  student: [
    { id: "n1", title: "Interview Scheduled: Nexora Technologies", description: "Your technical discussion for Cloud Engineering Intern is scheduled for Sept 8, 11:00 AM IST.", time: "15m ago", icon: "Building2", color: "text-violet-600 bg-violet-50", unread: 1 },
    { id: "n2", title: "Coursework Synergized", description: "Your CS301 Cloud Computing Lab grade boosted your Cloud & DevOps proficiency score!", time: "2h ago", icon: "Sparkles", color: "text-emerald-600 bg-emerald-50", unread: 1 },
    { id: "n3", title: "Soft Skills AI Analysis Completed", description: "Your architectural explanation scored 82/100 with optimal pacing (136 WPM).", time: "Yesterday", icon: "Award", color: "text-sky-600 bg-sky-50", unread: 0 }
  ],
  industry: [
    { id: "ni1", title: "New 94% Match Candidate Applied", description: "Ananya Sharma (Apex Institute of Technology, B.Tech CSE) applied for Full Stack Cloud Intern.", time: "10m ago", icon: "Sparkles", color: "text-sky-600 bg-sky-50", unread: 1 },
    { id: "ni2", title: "Workshop Proposal Received", description: "Dr. Rajesh Nair from Apex Institute proposed a 2-day hands-on Kubernetes seminar.", time: "3h ago", icon: "BookOpen", color: "text-violet-600 bg-violet-50", unread: 1 },
    { id: "ni3", title: "Posting Benchmark Exceeded", description: "Your Cloud Platform listing received 38 qualified applicants exceeding the average by 24%.", time: "1d ago", icon: "Building2", color: "text-emerald-600 bg-emerald-50", unread: 0 }
  ],
  college: [
    { id: "nc1", title: "Batch 2027 Readiness Jump (+4.2%)", description: "Average student readiness in Computer Science increased to 76% following the DevOps sprint.", time: "30m ago", icon: "Sparkles", color: "text-emerald-600 bg-emerald-50", unread: 1 },
    { id: "nc2", title: "New Campus Partner Onboarded", description: "Nexora Technologies officially signed as Tier-1 hiring & project partner.", time: "4h ago", icon: "Building2", color: "text-violet-600 bg-violet-50", unread: 1 },
    { id: "nc3", title: "Syllabus Gap Alert: Kubernetes", description: "42% deficit detected in Container Orchestration compared to current industry hiring mandates.", time: "2d ago", icon: "BookOpen", color: "text-amber-600 bg-amber-50", unread: 0 }
  ],
  faculty: [
    { id: "nf1", title: "FDP Selection Confirmed", description: "Your application for AWS Generative AI & Cloud Immersion FDP has been approved with ₹1.5L grant.", time: "1h ago", icon: "Award", color: "text-amber-600 bg-amber-50", unread: 1 },
    { id: "nf2", title: "Ather Energy Consultancy Request", description: "New corporate inquiry on edge battery telemetry modeling matching your research profile.", time: "5h ago", icon: "Building2", color: "text-sky-600 bg-sky-50", unread: 1 },
    { id: "nf3", title: "Student Capstone Synergy Approved", description: "3 final-year students accepted into TCS Research & Innovation edge telemetry project.", time: "1d ago", icon: "Sparkles", color: "text-emerald-600 bg-emerald-50", unread: 0 }
  ]
};

module.exports = {
  initialUsers,
  initialStudentProfile,
  initialSkillCompetencies,
  initialRoadmapWeeks,
  initialDiagnosticQuestions,
  initialReassessmentQuestions,
  initialSoftSkillsAnalysis,
  initialOpportunities,
  initialApplications,
  initialRankedCandidates,
  initialIndustryPostings,
  initialCollegeStudents,
  initialCurriculumGaps,
  initialFacultyOpportunities,
  initialFacultyProposals,
  initialNotifications
};
