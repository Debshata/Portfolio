// Structured content for the entire site. Components read from here — no hardcoded copy in JSX.

export interface Profile {
  name: string;
  eyebrow: string;
  headline: string;
  statement: string;
  supporting: string;
  location: string;
  degrees: string[];
  currentFocus: string;
  portrait: string;
}

export const profile: Profile = {
  name: "Debshata Choudhury",
  eyebrow: "Quantum Computing · Data Science · AI/ML",
  headline: "Debshata Choudhury",
  statement:
    "Building intelligent systems where data, machine learning and quantum computation intersect.",
  supporting:
    "Dual-degree student, data and machine-learning practitioner, IBM Qiskit Advocate, research contributor and hackathon champion.",
  location: "New Delhi, India",
  degrees: ["B.Tech Computer Science", "B.S. Data Science"],
  currentFocus: "Quantum machine learning and scalable data systems",
  portrait: "/images/debshata-profile.png"
};

export interface Links {
  email: string;
  linkedin: string;
  github: string;
  kaggle: string;
  leetcode: string;
  resume: string;
  qiskitProfile: string;
  researchRepo: string;
  researchPresentation: string;
}

export const links: Links = {
  email: "debshatachoudhury@gmail.com",
  linkedin: "https://www.linkedin.com/in/debshata-choudhury-b2593a271/",
  github: "https://github.com/Debshata",
  kaggle: "https://www.kaggle.com/debshatachoudhury",
  leetcode: "https://leetcode.com/u/debshata18/",
  resume: "/documents/debshata-choudhury-resume.pdf",
  qiskitProfile: "ADD_QISKIT_PROFILE_URL",
  researchRepo: "ADD_PROJECT_URL",
  researchPresentation: "ADD_PROJECT_URL"
};

export interface Interest {
  id: "quantum" | "data-science" | "ai-ml" | "data-engineering";
  title: string;
  short: string;
  description: string;
  keywords: string[];
  diagram: "circuit" | "pipeline" | "network" | "analytics";
}

export const interests: Interest[] = [
  {
    id: "quantum",
    title: "Quantum Computing",
    short: "Quantum Computing",
    description:
      "Quantum algorithms, variational methods, quantum machine learning, Qiskit, quantum circuit experimentation and research on practical quantum models.",
    keywords: ["Qiskit", "Variational algorithms", "Quantum circuits", "Quantum machine learning", "Quantum generative models"],
    diagram: "circuit"
  },
  {
    id: "data-science",
    title: "Data Science",
    short: "Data Science",
    description:
      "Statistical analysis, data preparation, predictive modelling, feature engineering, experimentation and decision-oriented visualisation.",
    keywords: ["Python", "R", "SQL", "Statistics", "Forecasting", "Visual analytics"],
    diagram: "analytics"
  },
  {
    id: "ai-ml",
    title: "Artificial Intelligence and Machine Learning",
    short: "AI & ML",
    description:
      "Regression, classification, ensemble learning, time-series modelling, neural methods and intelligent application development.",
    keywords: ["PyTorch", "Scikit-learn", "XGBoost", "LightGBM", "Classification", "Time-series validation"],
    diagram: "network"
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    short: "Data Engineering",
    description:
      "Scalable ETL pipelines, medallion architecture, distributed data processing, orchestration and data-quality validation.",
    keywords: ["PySpark", "Apache Spark", "Hadoop", "Hive", "Delta Lake", "Prefect"],
    diagram: "pipeline"
  }
];

export interface ProjectImage {
  src: string;
}

export interface Hackathon {
  id: string;
  code: string;
  category: string;
  challenge: string;
  solution: string;
  result: string;
  project: string;
  title: string;
  achievement: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetricLabel?: string;
  secondaryMetricValue?: string;
  technologies: string[];
  /** Short prototype write-up shown under the record summary. */
  writeup: string[];
  images: ProjectImage[];
  githubUrl: string;
  /** "About Event" — the write-up / announcement for the hackathon itself. */
  eventUrl: string;
}

export const hackathons: Hackathon[] = [
  {
    id: "water-risk",
    code: "PROJECT-01",
    category: "Applied ML · Climate risk",
    challenge: "Water-disaster risk had to be predicted from sparse, uneven environmental signals where a false negative costs the most.",
    solution: "Engineered 28 features and trained an XGBoost classifier with cross-validated optimisation to keep performance stable across folds.",
    result: "81.29% accuracy — first place at the Xylem Innovation Challenge.",
    project: "DropConnect",
    title: "AI Water Disaster Risk Intelligence",
    achievement: "Winner — Xylem Innovation Challenge",
    description:
      "Risk-intelligence model for water disaster planning, built on 28 engineered features with cross-validated optimisation to keep predictions stable across folds.",
    metricLabel: "Model accuracy",
    metricValue: "81.29%",
    secondaryMetricLabel: "Engineered features",
    secondaryMetricValue: "28",
    technologies: ["Python", "XGBoost", "Feature engineering", "Cross-validated optimisation"],
    writeup: [
      "A smart digital platform connecting students, NGOs and corporates to drive verified water-resilience and climate-action initiatives.",
      "It uses AI-based volunteer matching, geo-tagged events, QR/GPS verification and gamified incentives to increase participation.",
      "Corporate dashboards quantify CSR/ESG impact and support transparent BRSR-aligned reporting."
    ],
    images: [
      { src: "/images/projects/dropconnect/dropconnect-01.png" },
      { src: "/images/projects/dropconnect/dropconnect-02.png" },
      { src: "/images/projects/dropconnect/dropconnect-03.png" },
      { src: "/images/projects/dropconnect/dropconnect-04.png" },
      { src: "/images/projects/dropconnect/dropconnect-05.png" },
      { src: "/images/projects/dropconnect/dropconnect-06.png" },
      { src: "/images/projects/dropconnect/dropconnect-07.jpg" },
      { src: "/images/projects/dropconnect/dropconnect-08.jpg" }
    ],
    githubUrl: "https://github.com/Niranjan1Praveen/DropConnect/tree/master",
    eventUrl: "https://www.linkedin.com/posts/debshata-choudhury-b2593a271_xyleminnovationchallenge-dropconnect-hackathonwin-activity-7353954288097792001-Yno0"
  },
  {
    id: "exoplanet",
    code: "PROJECT-02",
    category: "Applied ML · Astronomy",
    challenge: "Exoplanet candidate signals are heavily imbalanced and noisy, so a single model overfits the majority class.",
    solution: "Built 112 engineered features and combined LightGBM with XGBoost through soft voting to stabilise the decision boundary.",
    result: "86.78% classification accuracy — 2nd Runner-Up at NASA Space Apps.",
    project: "Exoplanetarium",
    title: "ML Exoplanet Discovery",
    achievement: "2nd Runner-Up — NASA Space Apps",
    description:
      "Exoplanet classification pipeline using a LightGBM and XGBoost soft-voting ensemble over 112 engineered features drawn from scientific survey data.",
    metricLabel: "Classification accuracy",
    metricValue: "86.78%",
    secondaryMetricLabel: "Engineered features",
    secondaryMetricValue: "112",
    technologies: ["LightGBM", "XGBoost", "Soft voting ensemble", "Feature engineering"],
    writeup: [
      "An AI-powered platform for discovering, classifying and interactively exploring exoplanets using NASA-related datasets.",
      "It combines machine learning, astrophysics and visualization to classify planetary candidates and explore atmospheric, orbital and discovery characteristics.",
      "The prototype makes exoplanet research accessible to students, researchers and astronomy enthusiasts through a unified interactive interface."
    ],
    images: [
      { src: "/images/projects/exoplanetarium/exoplanetarium-01.png" },
      { src: "/images/projects/exoplanetarium/exoplanetarium-02.png" },
      { src: "/images/projects/exoplanetarium/exoplanetarium-03.png" },
      { src: "/images/projects/exoplanetarium/exoplanetarium-04.png" },
      { src: "/images/projects/exoplanetarium/exoplanetarium-05.jpg" },
      { src: "/images/projects/exoplanetarium/exoplanetarium-06.jpg" }
    ],
    githubUrl: "https://github.com/Niranjan1Praveen/Exoplanetarium-NasaSpaceAppsChallenge/tree/main",
    eventUrl: "https://www.linkedin.com/posts/debshata-choudhury-b2593a271_nasaspaceapps2025-exoplanetarium-code4change-activity-7381300811114532864-fz8S"
  },
  {
    id: "medical-screening",
    code: "PROJECT-03",
    category: "Deep learning · Audio & medical imaging",
    challenge: "Two distinct screening problems — tuberculosis from cough voice recordings and wound assessment — with limited labelled medical data.",
    solution: "Transfer-learned ResNet34, ConvNeXt and EfficientNetV2 backbones across both tracks using PyTorch and Keras.",
    result: "83.87% TB accuracy and 82.02% wound CV accuracy — Top 50 at IIIT-Delhi HORIBA Hack4Health.",
    project: "MediConnect",
    title: "Deep Learning Medical Screening",
    achievement: "Top 50 — IIIT-Delhi HORIBA Hack4Health",
    description:
      "Two-track deep-learning screening system: tuberculosis detection from cough voice recordings and wound classification from computer vision, built on transfer-learned convolutional backbones.",
    metricLabel: "TB screening accuracy",
    metricValue: "83.87%",
    secondaryMetricLabel: "Wound CV accuracy",
    secondaryMetricValue: "82.02%",
    technologies: ["PyTorch", "Keras", "ResNet34", "ConvNeXt", "EfficientNetV2"],
    writeup: [
      "A rural health-tech platform connecting underserved clinics with urban doctors, diagnostic services and affordable medicine networks.",
      "It combines telemedicine with AI-assisted triage, including cough, tongue and wound analysis, alongside multilingual and offline-ready healthcare support.",
      "The prototype converts basic rural patient visits into structured digital care journeys while reducing unnecessary hospital travel."
    ],
    images: [
      { src: "/images/projects/mediconnect/mediconnect-01.png" },
      { src: "/images/projects/mediconnect/mediconnect-02.png" },
      { src: "/images/projects/mediconnect/mediconnect-03.png" },
      { src: "/images/projects/mediconnect/mediconnect-04.png" },
      { src: "/images/projects/mediconnect/mediconnect-05.png" },
      { src: "/images/projects/mediconnect/mediconnect-06.png" },
      { src: "/images/projects/mediconnect/mediconnect-07.jpg" },
      { src: "/images/projects/mediconnect/mediconnect-08.jpg" }
    ],
    githubUrl: "https://github.com/Niranjan1Praveen/MediConnect/tree/master",
    eventUrl: "https://drive.google.com/file/d/15k-1ITLv5usuoJP2y8tOWKuiAml9NuxR/view?usp=sharing"
  },
  {
    id: "quantum-logistics",
    code: "PROJECT-04",
    category: "Quantum · Optimisation",
    challenge: "Vehicle routing grows combinatorially, and pure classical solvers stall on the constrained rural case.",
    solution: "Formulated the route problem as QUBO, solved with QAOA on IBM Quantum hardware alongside a classical solver, served via FastAPI, Docker and MongoDB.",
    result: "A working hybrid quantum-classical routing service — Top 10 at the Microsoft Azure Hackathon.",
    project: "VahaanBandhu",
    title: "Quantum-Classical Logistics Optimization",
    achievement: "Top 10 — Microsoft Azure Hackathon",
    description:
      "Hybrid routing framework pairing QUBO/QAOA formulations run on IBM Quantum hardware with classical solvers, served through a FastAPI, Docker and MongoDB stack.",
    metricLabel: "Approach",
    metricValue: "QUBO / QAOA",
    secondaryMetricLabel: "Executed on",
    secondaryMetricValue: "IBM Quantum",
    technologies: ["Qiskit", "QUBO / QAOA", "FastAPI", "Docker", "MongoDB"],
    writeup: [
      "A smart agricultural logistics platform connecting farmers, truckers and input dealers to improve movement of crops and agricultural supplies.",
      "Its routing engine combines classical optimisation with QUBO-based quantum optimisation and validated IBM Quantum hardware experiments.",
      "The prototype focuses on finding efficient, practical logistics routes while using quantum computation as an experimental optimisation component rather than claiming quantum advantage."
    ],
    images: [
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-01.png" },
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-02.png" },
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-03.png" },
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-04.png" },
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-05.jpg" },
      { src: "/images/projects/vahaanbandhu/vahaanbandhu-06.jpg" }
    ],
    githubUrl: "https://github.com/Niranjan1Praveen/VahaanBandhu/tree/main",
    eventUrl: "https://www.linkedin.com/posts/debshata-choudhury-b2593a271_agritechhack-teamcode4change-learningexperience-activity-7342921097463439360-wCvG"
  }
];

export interface Internship {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  outcomes: string[];
  /** "Journey" — the write-up for this role. */
  journeyUrl: string;
}

export const internships: Internship[] = [
  {
    id: "accenture",
    company: "Accenture",
    role: "Associate Software Engineering Intern",
    period: "May 2026 – July 2026",
    location: "Bengaluru, India",
    description:
      "Designed and implemented PySpark ETL pipelines that transformed five synthetic banking datasets into analytics-ready Gold tables. Used medallion architecture, modular data validation and Delta Lake processing to reduce pipeline complexity.",
    technologies: ["PySpark", "Apache Spark", "Delta Lake", "Hadoop", "Hive", "Prefect", "Power BI", "Medallion architecture"],
    outcomes: ["5 banking datasets transformed to Gold tables", "Medallion architecture reduced pipeline complexity"],
    journeyUrl: "https://lnkd.in/p/deUxrh9e"
  },
  {
    id: "finideas",
    company: "Finideas",
    role: "Quantitative ML Research Intern",
    period: "February 2026 – April 2026",
    location: "Remote",
    description:
      "Developed equity-market prediction models using more than 15 engineered features. Applied XGBoost, LightGBM and time-series validation to improve forecasting reliability.",
    technologies: ["Python", "XGBoost", "LightGBM", "Feature engineering", "Quantitative research", "Time-series validation"],
    outcomes: ["15+ engineered features", "Improved forecasting reliability via time-series validation"],
    journeyUrl: "https://www.linkedin.com/in/debshata-choudhury-b2593a271/overlay/Position/2906408296/treasury/?profileId=ACoAAEKGOM0BqsoiTX-qDg4GYbdXpg47vqsfaAc"
  },
  {
    id: "excelerate",
    company: "Excelerate",
    role: "Data Analyst Intern",
    period: "February 2025 – April 2025",
    location: "Remote",
    description:
      "Analysed learning outcomes for more than 500 participants and developed Looker Studio dashboards to improve programme reporting and decision-making.",
    technologies: ["Data analysis", "Looker Studio", "Dashboard design", "Reporting", "Business insights"],
    outcomes: ["500+ participant outcomes analysed", "Looker Studio dashboards adopted for reporting"],
    journeyUrl: "https://www.linkedin.com/posts/debshata-choudhury-b2593a271_data-analyst-associate-internship-excelerate-activity-7323352942156173314-E9hM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKGOM0BqsoiTX-qDg4GYbdXpg47vqsfaAc"
  }
];

export type SkillCategory =
  | "Programming"
  | "Big Data"
  | "Databases"
  | "Machine Learning"
  | "Data Engineering"
  | "Visualisation"
  | "Backend"
  | "Tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  relatedTo: string[]; // ids of internships / hackathons / sections
}

export const skills: Skill[] = [
  { id: "python", name: "Python", category: "Programming", relatedTo: ["finideas", "water-risk", "exoplanet"] },
  { id: "r", name: "R", category: "Programming", relatedTo: ["data-science"] },
  { id: "java", name: "Java", category: "Programming", relatedTo: [] },
  { id: "javascript", name: "JavaScript", category: "Programming", relatedTo: [] },
  { id: "sql", name: "SQL", category: "Programming", relatedTo: ["excelerate"] },
  { id: "html", name: "HTML", category: "Programming", relatedTo: [] },
  { id: "css", name: "CSS", category: "Programming", relatedTo: [] },
  { id: "cpp", name: "C++", category: "Programming", relatedTo: [] },
  { id: "qiskit", name: "Qiskit", category: "Programming", relatedTo: ["quantum", "qiskit-advocate", "quantum-logistics"] },

  { id: "pyspark", name: "PySpark", category: "Big Data", relatedTo: ["accenture", "data-engineering"] },
  { id: "spark", name: "Apache Spark", category: "Big Data", relatedTo: ["accenture", "data-engineering"] },
  { id: "hadoop", name: "Hadoop", category: "Big Data", relatedTo: ["accenture"] },
  { id: "hive", name: "Hive", category: "Big Data", relatedTo: ["accenture"] },
  { id: "delta-lake", name: "Delta Lake", category: "Big Data", relatedTo: ["accenture", "data-engineering"] },

  { id: "mysql", name: "MySQL", category: "Databases", relatedTo: [] },
  { id: "postgresql", name: "PostgreSQL", category: "Databases", relatedTo: [] },
  { id: "sqlite", name: "SQLite", category: "Databases", relatedTo: [] },
  { id: "mongodb", name: "MongoDB", category: "Databases", relatedTo: ["quantum-logistics"] },

  { id: "pytorch", name: "PyTorch", category: "Machine Learning", relatedTo: ["medical-screening"] },
  { id: "sklearn", name: "Scikit-learn", category: "Machine Learning", relatedTo: ["ai-ml"] },
  { id: "regression", name: "Regression", category: "Machine Learning", relatedTo: ["finideas"] },
  { id: "classification", name: "Classification", category: "Machine Learning", relatedTo: ["water-risk", "exoplanet"] },
  { id: "xgboost", name: "XGBoost", category: "Machine Learning", relatedTo: ["finideas", "water-risk", "exoplanet"] },
  { id: "lightgbm", name: "LightGBM", category: "Machine Learning", relatedTo: ["finideas", "exoplanet"] },
  { id: "timeseries", name: "Time-series modelling", category: "Machine Learning", relatedTo: ["finideas"] },

  { id: "etl", name: "ETL pipelines", category: "Data Engineering", relatedTo: ["accenture"] },
  { id: "medallion", name: "Medallion architecture", category: "Data Engineering", relatedTo: ["accenture"] },
  { id: "data-validation", name: "Data validation", category: "Data Engineering", relatedTo: ["accenture"] },
  { id: "pipeline-dev", name: "Pipeline development", category: "Data Engineering", relatedTo: ["accenture"] },
  { id: "orchestration", name: "Orchestration", category: "Data Engineering", relatedTo: ["accenture"] },

  { id: "powerbi", name: "Power BI", category: "Visualisation", relatedTo: ["accenture"] },
  { id: "looker", name: "Looker Studio", category: "Visualisation", relatedTo: ["excelerate"] },
  { id: "matplotlib", name: "Matplotlib", category: "Visualisation", relatedTo: [] },
  { id: "plotly", name: "Plotly", category: "Visualisation", relatedTo: [] },

  { id: "fastapi", name: "FastAPI", category: "Backend", relatedTo: ["quantum-logistics"] },
  { id: "docker", name: "Docker", category: "Backend", relatedTo: ["quantum-logistics"] },
  { id: "supabase", name: "Supabase", category: "Backend", relatedTo: [] },

  { id: "git", name: "Git", category: "Tools", relatedTo: [] },
  { id: "github", name: "GitHub", category: "Tools", relatedTo: [] },
  { id: "jupyter", name: "Jupyter Notebook", category: "Tools", relatedTo: [] },
  { id: "colab", name: "Google Colab", category: "Tools", relatedTo: [] },
  { id: "vscode", name: "VS Code", category: "Tools", relatedTo: [] },
  { id: "prefect", name: "Prefect", category: "Tools", relatedTo: ["accenture"] }
];

export interface Degree {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status?: string;
  coursework: string[];
  track: "analytical" | "engineering";
}

export const degrees: Degree[] = [
  {
    id: "iitm",
    institution: "IIT Madras",
    degree: "B.S. in Data Science",
    period: "2023 – 2027",
    status: "Completed Diploma in Data Science and Programming",
    coursework: ["Business Analytics", "Data Management", "Machine Learning Practices", "Statistics", "Tools for Data Science"],
    track: "analytical"
  },
  {
    id: "amity",
    institution: "Amity University, Noida",
    degree: "B.Tech in Computer Science",
    period: "2023 – 2027",
    coursework: ["Data Structures", "Database Management Systems", "Operating Systems", "Software Engineering"],
    track: "engineering"
  }
];

export const degreeConvergence = "Quantum-AI research and intelligent systems";

export interface QiskitContribution {
  statement: string;
  contribution: string;
  points: string[];
  qubits: number;
  molecularValidity: string;
}

export const qiskitContribution: QiskitContribution = {
  statement:
    "As an IBM Qiskit Advocate, I collaborate with quantum researchers and developers on open-source quantum computing and quantum machine-learning work.",
  contribution:
    "Developed a five-qubit Quantum Circuit Born Machine that achieved 85% molecular validity on IBM Quantum hardware.",
  points: [
    "Presented results at IBM QAMP 2025.",
    "Contributed to quantum machine-learning research.",
    "Participated in the Qiskit open-source ecosystem.",
    "Explored quantum generative modelling and variational algorithms."
  ],
  qubits: 5,
  molecularValidity: "85%"
};

export interface ResearchEntry {
  id: string;
  authors: string;
  title: string;
  kind: "featured" | "direction";
  venue?: string;
  description: string;
  metricLabel?: string;
  metricValue?: string;
  problem: string;
  method: string;
  technology: string[];
  result: string;
  nextQuestion: string;
  /** Labelled external links rendered as-is under the record. */
  links: { label: string; url: string }[];
}

export const research: ResearchEntry[] = [
  {
    id: "qubit-comparative-study",
    title: "Comparative Study on Quantum Computing Qubits",
    authors: "Debshata Choudhury",
    kind: "featured",
    venue: "ICETET 2025",
    description:
      "A comparative study examining major qubit technologies, their operating principles, advantages, limitations and potential roles in scalable quantum computing.",
    problem: "Which qubit technologies are most viable for scalable, fault-tolerant quantum computing?",
    method: "Comparative literature and technical analysis of superconducting, trapped-ion, photonic and topological qubit architectures.",
    technology: ["Quantum hardware analysis", "Literature review", "Comparative benchmarking"],
    result: "Identified trade-offs across coherence time, gate fidelity and scalability for each qubit modality.",
    nextQuestion: "How do hybrid qubit architectures change the scalability trade-off?",
    links: [
      {
        label: "About Conference",
        url: "https://www.linkedin.com/posts/debshata-choudhury-b2593a271_icetet-2025-activity-7309735332428554241-XyWL"
      },
      { label: "DOI", url: "https://zenodo.org/records/15072694" }
    ]
  },
  {
    id: "qcbm-molecular",
    title: "Quantum Circuit Born Machine for Molecular Generation",
    authors:
      "Natalie Hawkins (Mentor, Quantum Algorithms and Applications, QuantumBits) · Jorge Plazas (Mentee, Escuela Politécnica Superior, Universidad Francisco de Vitoria) · Debshata Choudhury (Mentee, B.Tech CSE-ASET Noida; BS Data Science-IIT Madras)",
    venue: "IBM QAMP 2025",
    kind: "direction",
    description:
      "Developed and tested a five-qubit quantum generative model on IBM Quantum hardware, with a focus on molecular validity and practical quantum-machine-learning experimentation.",
    metricLabel: "Molecular validity",
    metricValue: "85%",
    problem: "Can a small-scale quantum generative model produce chemically valid molecular structures on real hardware?",
    method: "Trained a five-qubit Quantum Circuit Born Machine (QCBM) using variational parameter optimisation on IBM Quantum hardware.",
    technology: ["Qiskit", "Quantum Circuit Born Machine", "Variational algorithms", "IBM Quantum hardware"],
    result: "Achieved 85% molecular validity across generated samples.",
    nextQuestion: "How does qubit count scaling affect generative diversity and validity?",
    links: [
      { label: "GitHub Repo", url: "https://github.com/QCHPC/qiskit_QCBMs" },
      { label: "About Event", url: "https://lnkd.in/p/dDcHquzT" }
    ]
  }
];

export const additionalResearchInterests: string[] = [
  "Variational quantum algorithms",
  "Quantum machine learning",
  "Hybrid quantum-classical optimisation",
  "Quantum generative models",
  "Financial machine learning",
  "Scalable data pipelines",
  "AI for scientific discovery"
];

export interface Credential {
  id: string;
  title: string;
  url: string;
}

export const certifications: Credential[] = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    url: "https://www.credly.com/badges/cf0f4130-853a-4b53-816c-f4fc2f1ff5d5"
  },
  {
    id: "ccna",
    title: "CCNA",
    url: "https://www.credly.com/badges/3be51f5a-7441-4b92-9bcb-c2788e3d38f5/public_url"
  },
  {
    id: "mckinsey-forward",
    title: "McKinsey Forward Program",
    url: "https://www.credly.com/badges/9f6b1fcb-5929-4571-8c35-bb3a9ad2c424/public_url"
  }
];

/** External profiles shown beside the résumé at the top and bottom of the archive. */
export const profileLinks: { label: string; url: string }[] = [
  { label: "GITHUB", url: links.github },
  { label: "LINKEDIN", url: links.linkedin },
  { label: "KAGGLE", url: links.kaggle },
  { label: "LEETCODE", url: links.leetcode }
];

export interface Recommendation {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  profileUrl: string;
  body: string[];
}

export const recommendations: Recommendation[] = [
  {
    id: "jorge-plazas",
    name: "Jorge Plazas",
    title: "Mathematical Physicist | Professor at Universidad Francisco de Vitoria",
    relationship: "Jorge was Debshata's mentor",
    date: "March 16, 2026",
    profileUrl: "https://www.linkedin.com/in/jorgeplazas/",
    body: [
      "I worked with Debshata on a software project which began as a part of the Qiskit Advocate Mentorship Program, a focused program where our small team developed a set of tools for the implementation of Quantum Circuirt Born Machines. Even though we collaborated entirely online, it was a very enjoyable and smooth experience, thanks in large part to him.",
      "During the program, Debshata stood out for his proactivity and strong sense of responsibility. He consistently took initiative and followed through on commitments, which made a real difference in moving the project forward and achieving its goals.",
      "On the more technical side, Debshata combines a solid expertise with a strong set of analytical skills. He is able to quickly understands complex problems and turn them into well-structured solutions. On top of that, he is approachable, collaborative, and simply great to work with.",
      "I look forward to working with Debshata again and strongly recommend him to any team looking for a capable and dependable professional."
    ]
  },
  {
    id: "natalie-hawkins",
    name: "Natalie Hawkins",
    title:
      "Tier 2 Qiskit Advocate, Software Engineer, Data Science/Statistics, Quantum Community Organizer",
    relationship: "Natalie was Debshata's mentor",
    date: "February 2, 2026",
    profileUrl: "https://www.linkedin.com/in/natalie-hawkins-seattle/",
    body: [
      "Debshata has helped us bring Quantum Circuit Born Machines described in papers to life in Qiskit code as a mentee on a project in the Qiskit Advocate Mentorship Program (QAMP2025). As the primary coder on a small team, he was able to work very independently and to produce high quality work, very quickly, ensuring that we stayed on track with the program requirements.",
      "As a mentor, I have enjoyed working with Debshata. He proactively makes suggestions and helps to check program details to ensure that we're running smoothly. I am appreciative that he has been able to find time to work on this volunteer-based project designed to become part of the Qiskit open-source ecosystem.",
      "It has been a fun learning experience for all of us, and I anticipate that we will continue our global collaboration and interaction for many years. Thank you, Debshata!"
    ]
  }
];

export const navSections = [
  { id: "about", label: "About", code: "01" },
  { id: "education", label: "Education", code: "02" },
  { id: "experience", label: "Experience", code: "03" },
  { id: "skills", label: "Skills", code: "04" },
  { id: "projects", label: "Projects", code: "05" },
  { id: "publications", label: "Research Work", code: "06" },
  { id: "recommendations", label: "Recommendations", code: "07" }
] as const;

export const archive = {
  systemName: "DC SYSTEM v1.0",
  archiveName: "PERSONNEL ARCHIVE",
  recordId: "DC-001",
  clearance: "PUBLIC",
  totalRecords: "07"
} as const;

export const moduleIndex: Record<string, string> = {
  about: "01",
  education: "02",
  experience: "03",
  skills: "04",
  projects: "05",
  publications: "06",
  recommendations: "07"
};
