// ─── Types ──────────────────────────────────────────────
export type Highlight = { label: string; value: string };

export type Profile = {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  headline: string;
  summary: string;
  highlights: Highlight[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  logo?: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
  image?: string | null;
  category: string;
};

export type CertificationItem = {
  title: string;
  provider: string;
  credentialId?: string;
  link?: string;
  issued?: string;
};

// ─── Profile ────────────────────────────────────────────
export const profile: Profile = {
  name: "Reynaldo Arya Budi Trisna",
  location: "Denpasar, Bali, Indonesia",
  email: "reynaldstar@gmail.com",
  phone: "+6281915967694",
  linkedin: "https://www.linkedin.com/in/reynaldoabt/",
  headline:
    "AI Video Editor | B.Eng Robotics & AI | AI & Data Enthusiast | ex-Content Moderator",
  summary:
    "Versatile professional with a Bachelor's degree in Robotics and AI Engineering. Combining expertise in AI-driven content production, social media analytics, data science, and content moderation — with a proven track record across high-volume content review, AI-assisted visual production, and data-driven social media strategy. Seeking roles where technical depth and creative capability drive measurable impact.",
  highlights: [
    { label: "Accuracy (Moderation)", value: "93%" },
    { label: "Exposure Growth (AEEC)", value: "+20%" },
    { label: "IoT Monitoring (Aria Agri)", value: "+60%" },
  ],
};

// ─── Achievements ──────────────────────────────────────
export const achievements: string[] = [
  "1st Place — Driyakarya Film Festival 2021 · Di Balik Kemudi (Editor)",
  "Official Selection — Lampung Film Festival 2022 · Di Balik Kemudi (Editor)",
  "Featured Film — Jelajah Sinema Indonesia 2023 · Di Balik Kemudi (Editor)",
  "Best Performance Moderator — July (Gear Inc)",
  "Best Performance Moderator — September (Gear Inc)",
  "Best Performance Moderator — February 2026 (Gear Inc)",
];

// ─── Skills ────────────────────────────────────────────
export const skills: string[] = [
  "Content Moderation & Policy",
  "Data Analysis (Python, Pandas)",
  "Machine Learning (scikit-learn)",
  "Deep Learning (TensorFlow / PyTorch)",
  "AI Automation",
  "AI Image and Video Creation",
  "SQL",
  "Power BI",
  "Metabase",
  "Streamlit",
  "React + TypeScript",
  "IoT / Embedded (Arduino, C/C++)",
  "Video Editing (Premiere, After Effects)",
  "Design (Photoshop, Illustrator)",
];

// ─── Experience ────────────────────────────────────────
export const experiences: ExperienceItem[] = [
  {
    company: "Dygtal Marketing Solutions",
    role: "AI Content Creator & Social Media Data Analyst",
    period: "May 2026 – Present",

    location: "Denpasar, Bali",
    logo: "/images/companies/dygtal-marketing-solutions.png",
    bullets: [
      "Produced AI-assisted photo and video content using generative AI platforms, Adobe Premiere Pro, and After Effects, creating high-quality visual assets tailored for brand campaigns and social media channels.",
      "Applied AI image and video enhancement tools to accelerate post-production workflows, reducing editing turnaround time while maintaining consistent visual quality across client deliverables.",
      "Designed and edited short-form video content (Reels, TikTok, YouTube Shorts) optimized for platform-specific algorithms, contributing to increased organic reach and engagement rates.",
      "Analyzed social media engagement data across platforms (Instagram, TikTok, Facebook) using analytics dashboards, extracting insights on reach, impressions, click-through rates, and audience behavior to inform content strategy.",
      "Developed data-driven performance reports, identifying content trends and optimization opportunities to increase follower growth, post engagement, and overall brand visibility.",
      "Built and maintained engagement tracking spreadsheets and dashboards to monitor KPIs across multiple client accounts, enabling real-time campaign performance evaluation.",
      "Supported A/B testing of content formats and captions, leveraging engagement data to recommend the most effective approaches for target audiences.",
    ],
  },
  {
    company: "Telus Digital",
    role: "Content Moderator",
    period: "Mar 2026 – May 2026",

    location: "Denpasar, Bali",
    logo: "/images/companies/telus-digital.png",
    bullets: [
      "Continued content moderation operations after Gear Inc's acquisition by Telus Digital.",
      "Reviewed and enforced content guidelines to maintain a safe online environment with 93% accuracy.",
      "Collaborated with team leaders and quality analysts to improve moderation quality and consistency.",
      "Analyzed user behavior trends to identify patterns and improve content quality.",
    ],
  },
  {
    company: "Gear Inc",
    role: "Content Moderator",
    period: "Apr 2025 – Feb 2026",

    location: "Denpasar, Bali",
    logo: "/images/companies/gear-inc.png",
    bullets: [
      "Reviewed and enforced content guidelines to maintain a safe online environment with 93% accuracy.",
      "Collaborated with team leaders and quality analysts to improve moderation quality and consistency.",
      "Analyzed user behavior trends to identify patterns and improve content quality.",
    ],
  },
  {
    company: "PT Aria Agri Indonesia",
    role: "Electrical & Machine Learning Engineering Intern",
    period: "Sep 2022 – Dec 2022",
    location: "Sunter, Jakarta Utara",
    logo: "/images/companies/aria-agri.png",
    bullets: [
      "Led smart greenhouse development improving IoT monitoring by 60%.",
      "Worked on electrical projects including drone multirotor system and PCB-related tasks.",
      "Applied Python for data analysis and machine learning tasks.",
    ],
  },
  {
    company: "Airlangga Executive Education",
    role: "Digital Services & Communication Staff Intern",
    period: "Feb 2022 – Jun 2022",
    location: "Surabaya",
    logo: "/images/companies/unair.png",
    bullets: [
      "Directed and edited video content for podcasts and monthly recap materials.",
      "Produced social media content and increased exposure by 20%.",
      "Handled video editing, color grading, and audio design to create engaging content.",
    ],
  },
];

// ─── Projects ──────────────────────────────────────────
export const projects: ProjectItem[] = [
  {
    title: "Smart Greenhouse Monitoring",
    description:
      "IoT monitoring improvement for greenhouse with data insights for operations in PT Aria Agri Indonesia.",
    tags: [
      "IoT Sensors",
      "Arduino",
      "Electrical and PCB",
      "Dashboards",
      "Agritech",
    ],
    link: "https://github.com/Loverzzz/smartgreenhouse",
    image: "/images/projects/smart-greenhouse.png",
    category: "IoT & Engineering",
  },
  {
    title: "Predictive Dashboards (Streamlit, Metabase)",
    description:
      "Machine Learning-Based Student Dropout Prediction System with Interactive Dashboards to Identify At-Risk Students and Improve Retention Rates.",
    tags: [
      "Streamlit",
      "Metabase",
      "SQL",
      "Analytics",
      "Data Visualization",
      "Machine Learning",
    ],
    link: "https://github.com/Loverzzz/DropoutPredictive",
    image: "/images/projects/streamlit-metabase.png",
    category: "Data & Visualization",
  },
  {
    title: "Plant Disease Detection Using Deep Learning and Computer Vision",
    description:
      "A deep learning-based system that accurately detects plant diseases using image classification and convolutional neural networks (CNNs).",
    tags: [
      "Keras",
      "TensorFlow",
      "Python",
      "Convolutional Neural Networks (CNN)",
    ],
    link: "https://github.com/Loverzzz/PlantDiseaseDetection",
    image: "/images/projects/plant-disease-detection.png",
    category: "AI & Machine Learning",
  },
  {
    title: "Object Detection Palm Tree (Computer Vision)",
    description:
      "Palm Tree Detection and Counting with YOLOv8 Object Detection.",
    tags: [
      "YOLOv8",
      "Ultralytics",
      "Deep Learning",
      "Bounding Box Detection",
      "Custom Dataset",
    ],
    link: "https://github.com/Loverzzz/PalmTreeCount",
    image: "/images/projects/object-detection-palm.jpg",
    category: "AI & Machine Learning",
  },
  {
    title: "Stress Prediction Using Text Based ML Models",
    description:
      "Text-Based Stress Level Prediction Using Machine Learning and NLP.",
    tags: [
      "NLP",
      "Machine Learning Pipeline",
      "TensorFlow Extended",
      "Docker",
      "Model Deployment",
    ],
    link: "https://github.com/Loverzzz/StressPredictionTextBased",
    image: "/images/projects/stress-predictive.png",
    category: "AI & Machine Learning",
  },
  {
    title: "Beijing Air Quality Data Visualization & Analysis Dashboard",
    description:
      "An interactive dashboard for visualizing and analyzing air quality data in Beijing, showcasing pollutants like PM2.5, PM10, SO2, NO2, CO, and O3.",
    tags: [
      "Streamlit",
      "Pandas",
      "Data Visualization",
      "Interactive Dashboard Development",
      "Time Series Analysis",
    ],
    link: "https://github.com/Loverzzz/AirQAnalysisBeijing",
    image: "/images/projects/air-quality.png",
    category: "Data & Visualization",
  },
  {
    title:
      "Diabetes Prediction with TFX for Deployment & Monitoring with Prometheus",
    description:
      "A machine learning-powered models using TensorFlow Extended (TFX) that predicts diabetes risk using health metrics and interactive visualization.",
    tags: [
      "scikit-learn",
      "TensorFlow Extended (TFX)",
      "Streamlit",
      "Prometheus",
      "Grafana",
      "Matplotlib",
      "Seaborn",
    ],
    link: "https://github.com/Loverzzz/diabetes-prediction-app",
    image: "/images/projects/diabetes-monitoring.png",
    category: "AI & Machine Learning",
  },
  {
    title:
      "Apple Color Detection & Classification with YOLOv8 & HSV Color Analysis",
    description:
      "Automated detection and classification of apples by color using YOLOv8 for object detection and HSV color analysis for categorizing red, yellow, and green apples.",
    tags: [
      "Ultralytics YOLOv8",
      "OpenCV",
      "Python",
      "NumPy",
      "Color Classification",
      "Bounding Box Processing",
    ],
    link: "https://github.com/Loverzzz/AppleColorClassifier",
    image: "/images/projects/apple-color-classified.jpg",
    category: "AI & Machine Learning",
  },
  {
    title: "Music Recommendation System with Content & Collaborative Filtering",
    description:
      "A music recommendation engine leveraging feature-based content similarity and collaborative filtering (SVD) to suggest songs.",
    tags: [
      "Python",
      "Feature Engineering",
      "Pandas",
      "NumPy",
      "Cosine Similarity",
      "Collaborative Filtering",
      "SVD",
    ],
    link: "https://github.com/Loverzzz/MusicRecommendation",
    image: "/images/projects/music-recommendation.png",
    category: "AI & Machine Learning",
  },
];

// ─── Certifications ────────────────────────────────────
export const certifications: CertificationItem[] = [
  {
    title: "EF SET Certificate",
    provider: "EF Standard English Test (EF SET)",
    issued: "Feb 2025",
    link: "https://cert.efset.org/n5TxSe",
  },
  {
    title: "Belajar Penerapan Data Science",
    provider: "Dicoding Indonesia",
    credentialId: "JMZVE1YJOPN9",
    issued: "Feb 2025 · Expires Feb 2028",
    link: "https://www.dicoding.com/certificates/JMZVE1YJOPN9",
  },
  {
    title: "Machine Learning Operations (MLOps)",
    provider: "Dicoding Indonesia",
    credentialId: "53XED1JJRPRN",
    issued: "Feb 2025 · Expires Feb 2028",
    link: "https://www.dicoding.com/certificates/53XED1JJRPRN",
  },
  {
    title: "Belajar Analisis Data dengan Python",
    provider: "Dicoding Indonesia",
    credentialId: "JMZVEQ7ENPN9",
    issued: "Jan 2025 · Expires Jan 2028",
    link: "https://www.dicoding.com/certificates/JMZVEQ7ENPN9",
  },
  {
    title: "Belajar Pengembangan Machine Learning",
    provider: "Dicoding Indonesia",
    credentialId: "NVP751N4VXR0",
    issued: "Jan 2025 · Expires Jan 2028",
    link: "https://www.dicoding.com/certificates/NVP751N4VXR0",
  },
  {
    title: "Machine Learning Terapan",
    provider: "Dicoding Indonesia",
    credentialId: "6RPNRDLD4X2M",
    issued: "Jan 2025 · Expires Jan 2028",
    link: "https://dicoding.com/certificates/6RPNRDLD4X2M",
  },
  {
    title: "Memulai Pemrograman dengan Dart",
    provider: "Dicoding Indonesia",
    credentialId: "JLX190856P72",
    issued: "Jan 2025 · Expires Jan 2028",
    link: "https://dicoding.com/certificates/JLX190856P72",
  },
  {
    title: "Belajar Dasar Data Science",
    provider: "Dicoding Indonesia",
    credentialId: "53XEQ8REKXRN",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://www.dicoding.com/certificates/53XEQ8REKXRN",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    provider: "Dicoding Indonesia",
    credentialId: "QLZ9VMNJ2X5D",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://dicoding.com/certificates/QLZ9VMNJ2X5D",
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    provider: "Dicoding Indonesia",
    credentialId: "1RXY2RVKKXVM",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://dicoding.com/certificates/1RXY2RVKKXVM",
  },
  {
    title: "Belajar Machine Learning untuk Pemula",
    provider: "Dicoding Indonesia",
    credentialId: "EYX4J4L4JZDL",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://www.dicoding.com/certificates/EYX4J4L4JZDL",
  },
  {
    title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    provider: "Dicoding Indonesia",
    credentialId: "98XW5DYO0PM3",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://dicoding.com/certificates/98XW5DYO0PM3",
  },
  {
    title: "Memulai Pemrograman Dengan Java",
    provider: "Dicoding Indonesia",
    credentialId: "2VX3476KNZYQ",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://dicoding.com/certificates/98XW5DYO0PM3",
  },
  {
    title: "Memulai Pemrograman dengan Kotlin",
    provider: "Dicoding Indonesia",
    credentialId: "2VX34QN2NZYQ",
    issued: "Dec 2024 · Expires Dec 2027",
    link: "https://www.dicoding.com/certificates/2VX34QN2NZYQ",
  },
  {
    title: "Belajar Prinsip Pemrograman SOLID",
    provider: "Dicoding Indonesia",
    credentialId: "0LZ04JDJNP65",
    issued: "Nov 2024 · Expires Nov 2027",
    link: "https://www.dicoding.com/certificates/0LZ04JDJNP65",
  },
  {
    title: "Memulai Pemrograman Dengan C",
    provider: "Dicoding Indonesia",
    credentialId: "NVP74NLYWPR0",
    issued: "Nov 2024 · Expires Nov 2027",
    link: "https://dicoding.com/certificates/NVP74NLYWPR0",
  },
  {
    title: "Complete Guide to Power BI for Data Analysts",
    provider: "Microsoft Press",
    credentialId:
      "9ebfbd54aaf744b9c154c2629af76a6d68d93d04e8a4fdb8991245a7c26787e7",
    issued: "Jan 2024",
    link: "https://www.linkedin.com/learning/certificates/9ebfbd54aaf744b9c154c2629af76a6d68d93d04e8a4fdb8991245a7c26787e7",
  },
  {
    title:
      "Learning Data Analytics Part 2: Extending and Applying Core Knowledge",
    provider: "LinkedIn",
    credentialId:
      "0f655e9c0584fea4461c39c5d7291a94ab4ec710adbbfb8cf2e921d9da0056ac",
    issued: "Jan 2025",
    link: "https://www.linkedin.com/learning/certificates/0f655e9c0584fea4461c39c5d7291a94ab4ec710adbbfb8cf2e921d9da0056ac",
  },
];

// ─── Navigation ────────────────────────────────────────
export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "creative", label: "Creative" },
  { id: "contact", label: "Contact" },
];

// ─── Project Categories ────────────────────────────────
export const projectCategories = [
  "All",
  "AI & Machine Learning",
  "Data & Visualization",
  "IoT & Engineering",
];

// ─── Video Types ────────────────────────────────────────
export type VideoItem = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string | null;
  videoUrl: string;
  duration?: string;
  year?: string;
  featured?: boolean;
  award?: string;
  awards?: { label: string; icon?: string }[];
  role?: string;
  platform?: string;
  galleryImages?: string[];
};

// ─── Videos ─────────────────────────────────────────────
export const videos: VideoItem[] = [
  {
    title: "Di Balik Kemudi",
    description:
      "Award-winning short film that received multiple prestigious festival recognitions. Worked as Editor — handling full editing, color grading, and audio design from start to finish. Available on Bioskop Online.",
    category: "Cinematic",
    tags: [
      "Short Film",
      "Color Grading",
      "Audio Design",
      "Premiere Pro",
      "After Effects",
    ],
    thumbnail: null,
    videoUrl: "https://youtu.be/T9x1gljnHE4",
    duration: "0:00",
    year: "2021",
    featured: true,
    role: "Editor",
    platform: "Short-Film",
    award: "🏆 1st Place — Driyakarya Film Festival 2021",
    awards: [
      { label: "1st Place — Driyakarya Film Festival 2021", icon: "🏆" },
      { label: "Official Selection — Lampung Film Festival 2022", icon: "🎖️" },
      { label: "Featured Film — Jelajah Sinema Indonesia 2023", icon: "⭐" },
      { label: "Short-Film", icon: "🎬" },
    ],
    galleryImages: [
      "/images/videos/dibalik-kemudi-1.png",
      "/images/videos/dibalik-kemudi-2.png",
      "/images/videos/dibalik-kemudi-3.png",
    ],
  },
  {
    title:
      "Knowledge Discovery Ep. 1 - Disruptive Innovation: a chance or a challenge?",
    description:
      "Podcast video for Knowledge Discovery Episode 1 at Airlangga Executive Education Center. Discussing Disruptive Innovation — opportunity or challenge? Handled editing, color grading, and audio design.",
    category: "Corporate",
    tags: [
      "Podcast",
      "Video Editing",
      "Color Grading",
      "Corporate",
      "Premiere Pro",
    ],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=VgtTa_HbKM4&t=67s",
    duration: "0:00",
    year: "2022",
    featured: false,
  },
  {
    title: "Knowledge Discovery Ep. 2 - Penerapan BLUD Puskesmas",
    description:
      "Podcast video for Knowledge Discovery Episode 2 at Airlangga Executive Education Center. Discussing the Implementation of BLUD Puskesmas. Curated by Dr. Zaenal Fanani SE., MSA., Ak., CA., ACPA. from Universitas Airlangga. Handled editing, color grading, and audio design.",
    category: "Corporate",
    tags: [
      "Podcast",
      "Video Editing",
      "Color Grading",
      "Corporate",
      "Premiere Pro",
    ],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=LDzg5sSzWmY&t=125s",
    duration: "0:00",
    year: "2022",
    featured: false,
  },
  {
    title: "MEI HIGHLIGHT — AEEC Unair",
    description:
      "Monthly highlight video for May at Airlangga Executive Education Center (AEEC) Universitas Airlangga. Included video editing, color grading, and audio design for social media content.",
    category: "Short-form",
    tags: ["Reels", "Highlight", "Social Media", "AEEC", "Premiere Pro"],
    thumbnail: "/thumbnail mei highlight.jpg",
    videoUrl: "https://www.instagram.com/reel/CePz6XnpyqP/",
    duration: "0:00",
    year: "2022",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "AI Generated Content (Beam and Bare) — Dygtal",
    description:
      "AI-generated visual content for Beam and Bare brand campaign at Dygtal Marketing Solutions. Produced using generative AI platforms combined with Adobe Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: [
      "AI Video",
      "Generative AI",
      "After Effects",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail beam and bare.png",
    videoUrl: "https://www.youtube.com/watch?v=8-jxbGppTRU",
    duration: "0:00",
    year: "2026",
    featured: false,
  },
  {
    title: "Gusto AI Transition Creation — Dygtal",
    description:
      "AI-generated transition video content created for Gusto brand at Dygtal Marketing Solutions. Produced using generative AI platforms combined with Adobe Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: [
      "AI Video",
      "Generative AI",
      "Transitions",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=rRYL0Bo-c48",
    duration: "0:00",
    year: "2026",
    featured: false,
  },
  {
    title: "Cook and Baker — Reels — Dygtal",
    description:
      "Social media Reels content for Cook and Baker, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail cook and baker.jpg",
    videoUrl: "https://www.instagram.com/reel/DYmeo3kPnXs/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Feast — Reels — Dygtal",
    description:
      "Social media Reels content for Feast, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail feast.jpg",
    videoUrl: "https://www.instagram.com/reel/DYoW-ioiEqg/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Feast — Reels — Dygtal",
    description:
      "Social media Reels content for Feast, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail feast 2.jpg",
    videoUrl: "https://www.instagram.com/reel/DZBsvKvTsNb/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Christope C — Reels — Dygtal",
    description:
      "Social media Reels content for Christope C Hairsalon, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail christope 2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=bZZHYcLLzXY",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Christope C — Reels — Dygtal",
    description:
      "Social media Reels content for Christope C Hairsalon, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail christope 3.jpg",
    videoUrl: "https://www.instagram.com/p/DaCuQ_qJ65v/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Christope C Hairsalon — Reels — Dygtal",
    description:
      "Social media Reels content for Christope C Hairsalon, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail christope.jpg",
    videoUrl: "https://www.instagram.com/p/DZG0AELJofc/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Laci Asmara — Reels — Dygtal",
    description:
      "Social media Reels content for Laci Asmara, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail laci.jpg",
    videoUrl: "https://www.instagram.com/p/DY8m0nFS5gz/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Cook and Baker — Reels — Dygtal",
    description:
      "Social media Reels content for Cook and Baker, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail cook and baker 2.jpg",
    videoUrl: "https://www.instagram.com/reel/DY11qUPvaO0/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Arya Ubud — Reels — Dygtal",
    description:
      "Social media Reels content for Arya Ubud, produced at Dygtal Marketing Solutions. Short-form video optimized for Instagram Reels with creative editing and motion design.",
    category: "Short-form",
    tags: [
      "Reels",
      "Video Editing",
      "Social Media",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail arya ubud.jpg",
    videoUrl: "https://www.instagram.com/reel/DYvg-nfCVAd/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "The Cube and The Wing by Bonum Living Villas — Dygtal",
    description:
      "The Cube and The Wing by Bonum Living Villas bring together quiet architecture, open space, and the slower rhythm of Ubud. AI-generated visual content produced at Dygtal Marketing Solutions.",
    category: "AI Creative",
    tags: [
      "AI Video",
      "Generative AI",
      "Real Estate",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail bonum.png",
    videoUrl: "https://www.instagram.com/p/DYOWvX5xnYD/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram",
  },
  {
    title: "The Wing Villa by Bonum Living Villas — Dygtal",
    description:
      "The Wing Villa by Bonum Living Villas feels intimate in a way that's hard to explain, soft mornings, quiet corners, and a space that naturally slows everything down. A different side of staying in Ubud. AI-generated visual content produced at Dygtal Marketing Solutions.",
    category: "AI Creative",
    tags: [
      "AI Video",
      "Generative AI",
      "Real Estate",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: "/thumbnail bonum 2.png",
    videoUrl: "https://www.instagram.com/p/DYYV2yGDbDb/",
    duration: "0:00",
    year: "2026",
    featured: false,
    platform: "Instagram",
  },
  {
    title: "Island Of Durian — AI Creation",
    description:
      "AI-generated visual content for Island Of Durian. Produced using generative AI platforms combined with Adobe Premiere Pro and After Effects at Dygtal Marketing Solutions.",
    category: "AI Creative",
    tags: [
      "AI Video",
      "Generative AI",
      "After Effects",
      "Brand Campaign",
      "Dygtal",
    ],
    thumbnail: null,
    videoUrl: "https://youtu.be/PbU7NeCXZJA",
    duration: "0:00",
    year: "2026",
    featured: false,
  },
  {
    title: "Finance and Accounting 101 - Eps. 5: Perencanaan dan Pengendalian",
    description:
      "Planning is the process of designing goals and determining the best way to achieve them. The goal is to identify specific outcomes that individuals or organizations want to achieve. Educational content for Airlangga Executive Education Center.",
    category: "Corporate",
    tags: ["Reels", "Video Editing", "Corporate", "Education", "AEEC"],
    thumbnail: "/thumbnail finance and accounting.jpg",
    videoUrl: "https://www.instagram.com/airlangga_executive_edu/reel/CbeIrf1J_q6/",
    duration: "0:00",
    year: "2022",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Finance and Accounting 101 - Eps. 6: Valuasi",
    description:
      "Valuation is the process of estimating the economic value of an asset or company. Educational content for Airlangga Executive Education Center.",
    category: "Corporate",
    tags: ["Reels", "Video Editing", "Corporate", "Education", "AEEC"],
    thumbnail: "/thumbnail valuation.jpg",
    videoUrl: "https://www.instagram.com/reel/CbhY0CspEgu/",
    duration: "0:00",
    year: "2022",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Export Import & Kepabeanan 101 - Ep. 1: Kepabeanan",
    description:
      "Educational content on Export Import & Customs (Kepabeanan) Episode 1 for Airlangga Executive Education Center. Handled video editing, color grading, and audio design for social media content.",
    category: "Corporate",
    tags: ["Reels", "Video Editing", "Corporate", "Education", "AEEC"],
    thumbnail: "/thumbnail keapabeanan.jpg",
    videoUrl: "https://www.instagram.com/p/CcSOWpbjrv0/",
    duration: "0:00",
    year: "2022",
    featured: false,
    platform: "Instagram Reels",
  },
  {
    title: "Export Import 101 - Episode 2: International Payment Method",
    description:
      "Educational content on Export Import Episode 2 — International Payment Methods. Produced for Airlangga Executive Education Center. Handled video editing, color grading, and audio design.",
    category: "Corporate",
    tags: ["Podcast", "Video Editing", "Corporate", "Education", "AEEC"],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=I0DyaNrsrw8",
    duration: "0:00",
    year: "2022",
    featured: false,
  },
  {
    title: "Export Import 101 - Episode 3: Persiapan Opening Letter of Credit",
    description:
      "Educational content on Export Import Episode 3 — Preparation of Opening Letter of Credit. Produced for Airlangga Executive Education Center. Handled video editing, color grading, and audio design.",
    category: "Corporate",
    tags: ["Podcast", "Video Editing", "Corporate", "Education", "AEEC"],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=I0DyaNrsrw8",
    duration: "0:00",
    year: "2022",
    featured: false,
  },
  {
    title: "Podcast Video Production — AEEC",
    description:
      "Directing and editing video podcast for Airlangga Executive Education Center. Includes multi-cam setup, audio mixing, and full post-production.",
    category: "Corporate",
    tags: ["Podcast", "Multi-cam", "Audio Mixing", "Directing", "AEEC"],
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=Mqol31CDHHI&t=140s",
    duration: "0:00",
    year: "2022",
    featured: false,
  },
];

// ─── Video Categories ──────────────────────────────────
export const videoCategories = [
  "All",
  "Cinematic",
  "Short-form",
  "Corporate",
  "AI Creative",
];
