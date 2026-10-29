// ─── Types ──────────────────────────────────────────────
export type Highlight = { label: string; value: string };

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  intro: string;
  summary: string;
  availability: string;
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

export type SkillGroup = { title: string; items: string[] };

// ─── Profile ────────────────────────────────────────────
export const profile: Profile = {
  name: "Reynaldo Arya Budi Trisna",
  shortName: "Reynaldo Arya",
  role: "AI Video Editor & Social Media Data Analyst",
  location: "Denpasar, Bali, Indonesia",
  email: "reynaldstar@gmail.com",
  phone: "+6281915967694",
  linkedin: "https://www.linkedin.com/in/reynaldoabt/",
  github: "https://github.com/Loverzzz",
  intro:
    "I edit video — short films, brand ads and social content — and I use data to find out what actually works. Currently making AI-assisted campaigns at Dygtal Marketing Solutions in Bali.",
  summary:
    "I hold a Bachelor's degree in Robotics & AI Engineering, but most of my work happens on an editing timeline. I edited the short film Di Balik Kemudi, which won 1st place at Driyakarya Film Festival 2021 and is now on Bioskop Online. I've edited podcasts and educational series for Airlangga Executive Education, spent a year in content moderation at Gear Inc / Telus Digital with 93% accuracy, and now produce AI-assisted video for hospitality, F&B and real-estate brands — while tracking how each post performs.",
  availability: "Open to full-time roles in video, creative or data",
  highlights: [
    { value: "1st", label: "Place, Driyakarya Film Festival 2021" },
    { value: "93%", label: "Moderation accuracy at Gear Inc" },
    { value: "+20%", label: "Social exposure growth at AEEC Unair" },
    { value: "B.Eng", label: "Robotics & AI Engineering" },
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
export const skillGroups: SkillGroup[] = [
  {
    title: "Video & Creative",
    items: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Color grading & audio design",
      "AI image & video generation",
      "Short-form (Reels, TikTok, Shorts)",
      "Photoshop & Illustrator",
    ],
  },
  {
    title: "Data & AI",
    items: [
      "Python (Pandas, scikit-learn)",
      "TensorFlow / PyTorch",
      "SQL",
      "Power BI, Metabase, Streamlit",
      "Social media analytics",
      "AI automation",
    ],
  },
  {
    title: "Operations & Engineering",
    items: [
      "Content moderation & policy",
      "Quality review & reporting",
      "React + TypeScript",
      "IoT / Embedded (Arduino, C/C++)",
      "English — EF SET certified",
    ],
  },
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
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
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
  /** Brand / organisation the video was made for or with. */
  client?: string;
  description?: string;
  category: string;
  tags?: string[];
  /** Optional custom thumbnail. YouTube links get one automatically. */
  thumbnail?: string | null;
  /** YouTube (watch, youtu.be, shorts) or Instagram link. */
  videoUrl: string;
  year?: string;
  featured?: boolean;
  awards?: string[];
  role?: string;
  galleryImages?: string[];
};

// ─── Videos ─────────────────────────────────────────────
//
// HOW TO ADD A NEW VIDEO
// Copy this block into the list below and fill it in. For YouTube links the
// thumbnail is pulled automatically, so `thumbnail` can be left out.
// Shorts links (youtube.com/shorts/...) open in a vertical player.
//
//   {
//     title: "Video title",
//     client: "Brand name",
//     category: "AI Creative",   // Cinematic | AI Creative | Short-form | Corporate
//     videoUrl: "https://youtu.be/XXXXXXXXXXX",
//     year: "2026",
//     role: "Editor",            // optional
//     description: "One or two sentences about what you did.", // optional
//   },
//
export const videos: VideoItem[] = [
  {
    title: "Di Balik Kemudi",
    client: "Short film",
    description:
      "A short film I edited from rough cut to final delivery — picture edit, color grading and audio design. It won 1st place at Driyakarya Film Festival 2021, was an official selection at Lampung Film Festival 2022, featured in Jelajah Sinema Indonesia 2023, and is available on Bioskop Online.",
    category: "Cinematic",
    tags: ["Short film", "Color grading", "Audio design", "Premiere Pro"],
    videoUrl: "https://youtu.be/T9x1gljnHE4",
    year: "2021",
    featured: true,
    role: "Editor",
    awards: [
      "1st Place — Driyakarya Film Festival 2021",
      "Official Selection — Lampung Film Festival 2022",
      "Featured — Jelajah Sinema Indonesia 2023",
      "Streaming on Bioskop Online",
    ],
    galleryImages: [
      "/images/videos/dibalik-kemudi-1.png",
      "/images/videos/dibalik-kemudi-2.png",
      "/images/videos/dibalik-kemudi-3.png",
    ],
  },

  // ── NEW YOUTUBE VIDEOS — paste new entries here ──

  // ── AI Creative · Dygtal Marketing Solutions ──
  {
    title: "AI campaign no. 1",
    client: "Tmax Rental Bali",
    description:
      "AI-generated visuals for a Tmax Rental Bali campaign, finished in Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: ["AI video", "Automotive"],
    thumbnail: "/thumbnail tmax rental bali ai.jpg",
    videoUrl: "https://www.youtube.com/watch?v=9Z-sXMEDUYg",
    year: "2026",
  },
  {
    title: "AI campaign no. 2",
    client: "Tmax Rental Bali",
    description:
      "AI-generated visuals for a Tmax Rental Bali campaign, finished in Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: ["AI video", "Automotive"],
    thumbnail: "/thumbnail tmax rental bali ai 2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=0HLjz_OYnVA",
    year: "2026",
  },
  {
    title: "The Cube and The Wing",
    client: "Bonum Living Villas",
    description:
      "Quiet architecture, open space and the slower rhythm of Ubud. AI-generated visuals finished in Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: ["AI video", "Real estate", "After Effects"],
    thumbnail: "/thumbnail bonum.png",
    videoUrl: "https://www.instagram.com/p/DYOWvX5xnYD/",
    year: "2026",
  },
  {
    title: "The Wing Villa",
    client: "Bonum Living Villas",
    description:
      "Soft mornings and quiet corners — a slower side of staying in Ubud. AI-generated visuals finished in Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: ["AI video", "Real estate"],
    thumbnail: "/thumbnail bonum 2.png",
    videoUrl: "https://www.instagram.com/p/DYYV2yGDbDb/",
    year: "2026",
  },
  {
    title: "Brand campaign",
    client: "Beam and Bare",
    description:
      "AI-generated visuals for a Beam and Bare campaign, composited and finished in After Effects.",
    category: "AI Creative",
    tags: ["AI video", "Brand campaign"],
    thumbnail: "/thumbnail beam and bare.png",
    videoUrl: "https://www.youtube.com/watch?v=8-jxbGppTRU",
    year: "2026",
  },
  {
    title: "AI transition piece",
    client: "Gusto",
    description:
      "A transition-driven AI video for Gusto, built from generated shots and cut in Premiere Pro.",
    category: "AI Creative",
    tags: ["AI video", "Transitions"],
    videoUrl: "https://www.youtube.com/watch?v=rRYL0Bo-c48",
    year: "2026",
  },
  {
    title: "Island of Durian",
    client: "Island of Durian",
    description:
      "AI-generated product visuals for Island of Durian, finished in Premiere Pro and After Effects.",
    category: "AI Creative",
    tags: ["AI video", "F&B"],
    videoUrl: "https://youtu.be/PbU7NeCXZJA",
    year: "2026",
  },
  {
    title: "Agency ad — May",
    client: "Dygtal Marketing Solutions",
    description: "Monthly ad compilation for Dygtal's own channels.",
    category: "AI Creative",
    tags: ["AI video", "Ads"],
    videoUrl: "https://www.youtube.com/watch?v=ciaVPaBaM5c",
    year: "2026",
  },
  {
    title: "Agency ad — June",
    client: "Dygtal Marketing Solutions",
    description: "Monthly ad for Dygtal's social media campaign.",
    category: "AI Creative",
    tags: ["AI video", "Ads"],
    thumbnail: "/thumbnail dygtal ads june.jpg",
    videoUrl: "https://www.instagram.com/p/DZJtDFWvsGp/",
    year: "2026",
  },
  {
    title: "Service ad — Social Media",
    client: "Dygtal Marketing Solutions",
    description: "Ad promoting Dygtal's social media management service.",
    category: "AI Creative",
    tags: ["AI video", "Ads"],
    videoUrl: "https://www.youtube.com/watch?v=Z60yqJHuQgE",
    year: "2026",
  },
  {
    title: "Service ad — Ads Management",
    client: "Dygtal Marketing Solutions",
    description: "Ad promoting Dygtal's ads management service.",
    category: "AI Creative",
    tags: ["AI video", "Ads"],
    videoUrl: "https://www.youtube.com/watch?v=DHId2ZMHjTM",
    year: "2026",
  },
  {
    title: "Service ad — Photo & Video",
    client: "Dygtal Marketing Solutions",
    description: "Ad promoting Dygtal's photography and videography service.",
    category: "AI Creative",
    tags: ["AI video", "Ads"],
    videoUrl: "https://www.youtube.com/watch?v=2VFNObyaSd8",
    year: "2026",
  },

  // ── Short-form · Reels ──
  {
    title: "Resort reel no. 1",
    client: "Astagina Resort",
    category: "Short-form",
    tags: ["Reels", "Hospitality"],
    thumbnail: "/thumbnail astagina resort.jpg",
    videoUrl: "https://www.instagram.com/reel/DYO5wHuiIK9/",
    year: "2026",
  },
  {
    title: "Resort reel no. 2",
    client: "Astagina Resort",
    category: "Short-form",
    tags: ["Reels", "Hospitality"],
    thumbnail: "/thumbnail astagina resort 2.jpg",
    videoUrl: "https://www.instagram.com/reel/DY3YySslS9A/",
    year: "2026",
  },
  {
    title: "Resort reel",
    client: "Senang Resort",
    category: "Short-form",
    tags: ["Reels", "Hospitality"],
    thumbnail: "/thumbnail senang resort.jpg",
    videoUrl: "https://www.instagram.com/p/DaoiYh9CJ79/",
    year: "2026",
  },
  {
    title: "Reel no. 1",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei.jpg",
    videoUrl: "https://www.instagram.com/p/DYbaid5iihK/",
    year: "2026",
  },
  {
    title: "Reel no. 2",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei 2.jpg",
    videoUrl: "https://www.instagram.com/p/DZBaoYBil5q/",
    year: "2026",
  },
  {
    title: "Reel no. 3",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei 3.jpg",
    videoUrl: "https://www.instagram.com/p/DZllxvsjHPA/",
    year: "2026",
  },
  {
    title: "Reel no. 4",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei 4.jpg",
    videoUrl: "https://www.instagram.com/p/DaEbx-hlElc/",
    year: "2026",
  },
  {
    title: "Reel no. 5",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei 5.jpg",
    videoUrl: "https://www.instagram.com/p/DajhkCrAKIl/",
    year: "2026",
  },
  {
    title: "Reel no. 6",
    client: "DEI",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail dei 6.jpg",
    videoUrl: "https://www.instagram.com/p/Da6j7Abjjiv/",
    year: "2026",
  },
  {
    title: "Brand reel",
    client: "Chanting",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail chanting.jpg",
    videoUrl: "https://www.instagram.com/reel/Dapx-U3EZJA/",
    year: "2026",
  },
  {
    title: "Rental reel",
    client: "Tmax Rental Bali",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail tmax rental bali.jpg",
    videoUrl: "https://www.instagram.com/p/DXai1-OgqJP/",
    year: "2026",
  },
  {
    title: "Reel no. 1",
    client: "Cook and Baker Bali",
    category: "Short-form",
    tags: ["Reels", "F&B"],
    thumbnail: "/thumbnail cook and baker.jpg",
    videoUrl: "https://www.instagram.com/reel/DYmeo3kPnXs/",
    year: "2026",
  },
  {
    title: "Reel no. 2",
    client: "Cook and Baker Bali",
    category: "Short-form",
    tags: ["Reels", "F&B"],
    thumbnail: "/thumbnail cook and baker 2.jpg",
    videoUrl: "https://www.instagram.com/reel/DY11qUPvaO0/",
    year: "2026",
  },
  {
    title: "Reel no. 3",
    client: "Cook and Baker Bali",
    category: "Short-form",
    tags: ["Reels", "F&B"],
    thumbnail: "/thumbnail cook and baker 3.jpg",
    videoUrl: "https://www.instagram.com/p/DaZO7rNvWbs/",
    year: "2026",
  },
  {
    title: "Reel no. 1",
    client: "Feast",
    category: "Short-form",
    tags: ["Reels", "F&B"],
    thumbnail: "/thumbnail feast.jpg",
    videoUrl: "https://www.instagram.com/reel/DYoW-ioiEqg/",
    year: "2026",
  },
  {
    title: "Reel no. 2",
    client: "Feast",
    category: "Short-form",
    tags: ["Reels", "F&B"],
    thumbnail: "/thumbnail feast 2.jpg",
    videoUrl: "https://www.instagram.com/reel/DZBsvKvTsNb/",
    year: "2026",
  },
  {
    title: "Salon reel no. 1",
    client: "Christope C Hairsalon",
    category: "Short-form",
    tags: ["Reels", "Beauty"],
    thumbnail: "/thumbnail christope.jpg",
    videoUrl: "https://www.instagram.com/p/DZG0AELJofc/",
    year: "2026",
  },
  {
    title: "Salon reel no. 2",
    client: "Christope C Hairsalon",
    category: "Short-form",
    tags: ["Reels", "Beauty"],
    thumbnail: "/thumbnail christope 2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=bZZHYcLLzXY",
    year: "2026",
  },
  {
    title: "Salon reel no. 3",
    client: "Christope C Hairsalon",
    category: "Short-form",
    tags: ["Reels", "Beauty"],
    thumbnail: "/thumbnail christope 3.jpg",
    videoUrl: "https://www.instagram.com/p/DaCuQ_qJ65v/",
    year: "2026",
  },
  {
    title: "Salon reel no. 4",
    client: "Christope C Hairsalon",
    category: "Short-form",
    tags: ["Reels", "Beauty"],
    thumbnail: "/thumbnail christope c hairsalon.jpg",
    videoUrl: "https://www.instagram.com/p/Da41odwJXqO/",
    year: "2026",
  },
  {
    title: "Brand reel no. 1",
    client: "Laci Asmara",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail laci.jpg",
    videoUrl: "https://www.instagram.com/p/DY8m0nFS5gz/",
    year: "2026",
  },
  {
    title: "Brand reel no. 2",
    client: "Laci Asmara",
    category: "Short-form",
    tags: ["Reels"],
    thumbnail: "/thumbnail laci asmara 2.jpg",
    videoUrl: "https://www.instagram.com/p/DaowSORphqM/",
    year: "2026",
  },
  {
    title: "Brand reel",
    client: "Arya Ubud",
    category: "Short-form",
    tags: ["Reels", "Hospitality"],
    thumbnail: "/thumbnail arya ubud.jpg",
    videoUrl: "https://www.instagram.com/reel/DYvg-nfCVAd/",
    year: "2026",
  },
  {
    title: "May highlight",
    client: "AEEC Universitas Airlangga",
    description:
      "Monthly highlight reel for Airlangga Executive Education Center — edit, color and audio.",
    category: "Short-form",
    tags: ["Reels", "Highlight"],
    thumbnail: "/thumbnail mei highlight.jpg",
    videoUrl: "https://www.instagram.com/reel/CePz6XnpyqP/",
    year: "2022",
  },

  // ── Corporate & education · AEEC Universitas Airlangga ──
  {
    title: "Knowledge Discovery Ep. 1 — Disruptive Innovation",
    client: "AEEC Universitas Airlangga",
    description:
      "Video podcast asking whether disruptive innovation is a chance or a challenge. Edit, color grading and audio design.",
    category: "Corporate",
    tags: ["Podcast", "Color grading"],
    videoUrl: "https://www.youtube.com/watch?v=VgtTa_HbKM4",
    year: "2022",
  },
  {
    title: "Knowledge Discovery Ep. 2 — BLUD Puskesmas",
    client: "AEEC Universitas Airlangga",
    description:
      "Video podcast on implementing BLUD at community health centres, curated by Dr. Zaenal Fanani. Edit, color grading and audio design.",
    category: "Corporate",
    tags: ["Podcast", "Color grading"],
    videoUrl: "https://www.youtube.com/watch?v=LDzg5sSzWmY",
    year: "2022",
  },
  {
    title: "Podcast production",
    client: "AEEC Universitas Airlangga",
    description:
      "Directed and edited a multi-camera video podcast, including audio mixing and full post-production.",
    category: "Corporate",
    tags: ["Podcast", "Multi-cam", "Directing"],
    videoUrl: "https://www.youtube.com/watch?v=Mqol31CDHHI",
    year: "2022",
    role: "Director & Editor",
  },
  {
    title: "Export Import 101 Ep. 2 — International Payment Methods",
    client: "AEEC Universitas Airlangga",
    category: "Corporate",
    tags: ["Education", "Podcast"],
    videoUrl: "https://www.youtube.com/watch?v=I0DyaNrsrw8",
    year: "2022",
  },
  {
    title: "Export Import & Kepabeanan 101 Ep. 1",
    client: "AEEC Universitas Airlangga",
    category: "Corporate",
    tags: ["Education", "Reels"],
    thumbnail: "/thumbnail keapabeanan.jpg",
    videoUrl: "https://www.instagram.com/p/CcSOWpbjrv0/",
    year: "2022",
  },
  {
    title: "Finance & Accounting 101 Ep. 5 — Planning and Control",
    client: "AEEC Universitas Airlangga",
    category: "Corporate",
    tags: ["Education", "Reels"],
    thumbnail: "/thumbnail finance and accounting.jpg",
    videoUrl:
      "https://www.instagram.com/airlangga_executive_edu/reel/CbeIrf1J_q6/",
    year: "2022",
  },
  {
    title: "Finance & Accounting 101 Ep. 6 — Valuation",
    client: "AEEC Universitas Airlangga",
    category: "Corporate",
    tags: ["Education", "Reels"],
    thumbnail: "/thumbnail valuation.jpg",
    videoUrl: "https://www.instagram.com/reel/CbhY0CspEgu/",
    year: "2022",
  },
];

// ─── Video Categories ──────────────────────────────────
export const videoCategories = [
  "All",
  "AI Creative",
  "Short-form",
  "Corporate",
  "Cinematic",
];
