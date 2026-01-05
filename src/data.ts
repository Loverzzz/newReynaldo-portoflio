import projectSmartgreenhouse from "./assets/projectSmartgreenhouse.png";
import projectStreamlitMetabase from "./assets/projectStreamlitMetabase.png";
import projectPlantdiseasedetection from "./assets/projectPlantdiseasedetection.png";
import projectObjectDetection from "./assets/projectObjectDetection.jpg";
import projectStressPredictive from "./assets/projectStressPredictive.png";
import projectAirQuality from "./assets/projectAirQuality.png";
import projectDiabetesMonitoring from "./assets/projectDiabetesMonitoring.png";
import projectAppleColorClassified from "./assets/projectAppleColorClassified.jpg";
import projectMusicrecommendation from "./assets/projectMusicrecommendation.png";

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
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
  /** Optional image path (import or public path). Example: `/images/projects/foo.png` or imported file */
  image?: string | null;
  /** Optional max width in pixels */
  imageWidth?: number;
  /** Optional max height in pixels */
  imageHeight?: number;
};

export const profile: Profile = {
  name: "Reynaldo Arya Budi Trisna",
  location: "Tuban, Jawa Timur",
  email: "reynaldstar@gmail.com",
  phone: "+62 81915967694",
  linkedin: "https://www.linkedin.com/in/reynaldoabt/",
  headline:
    "Content Moderator | Robotics & AI Graduate | Data & Dashboard Enthusiast",
  summary:
    "Passionate and results-driven Content Moderator with a background in Robotics & AI. Experienced in policy enforcement, trend analysis, and building data-driven solutions (ML, dashboards, IoT).",
  highlights: [
    { label: "Accuracy (Moderation)", value: "93%" },
    { label: "Exposure Growth (AEEC)", value: "+20%" },
    { label: "IoT Monitoring (Aria Agri)", value: "+60%" },
  ],
};

export const skills: string[] = [
  "Content Moderation & Policy",
  "Data Analysis (Python, Pandas)",
  "Machine Learning (scikit-learn)",
  "Deep Learning (TensorFlow / PyTorch)",
  "SQL",
  "Power BI",
  "Metabase",
  "Streamlit",
  "React + TypeScript",
  "IoT / Embedded (Arduino, C/C++)",
  "Video Editing (Premiere, After Effects)",
  "Design (Photoshop, Illustrator)",
];

export const experiences: ExperienceItem[] = [
  {
    company: "Gear Inc",
    role: "Content Moderator",
    period: "Apr 2025 – Present",
    location: "Denpasar, Bali",
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
    bullets: [
      "Directed and edited video content for podcasts and monthly recap materials.",
      "Produced social media content and increased exposure by 20%.",
      "Handled video editing, color grading, and audio design to create engaging content.",
    ],
  },
];

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
    image: projectSmartgreenhouse,
    imageWidth: 420,
  },
  {
    title: "Predictive Dashboards (Streamlit, Metabase)",
    description:
      "Machine Learning‑Based Student Dropout Prediction System with Interactive Dashboards to Identify At-Risk Students and Improve Retention Rates.",
    tags: [
      "Streamlit",
      "Metabase",
      "SQL",
      "Analytics",
      "Data Visualization",
      "Machine Learning",
    ],
    link: "https://github.com/Loverzzz/DropoutPredictive",
    image: projectStreamlitMetabase,
    imageWidth: 420,
  },
  {
    title: "Plant Disease Detection Using Deep Learning and Computer Vision",
    description:
      "A deep learning-based system that accurately detects plant diseases using image classification and convolutional neural networks (CNNs). Improve agricultural productivity by identifying plant diseases early and accurately with advanced AI solutions.",
    tags: [
      "Keras",
      "TensorFlow",
      "Python",
      "Convolutional Neural Networks (CNN)",
    ],
    link: "https://github.com/Loverzzz/PlantDiseaseDetection",
    image: projectPlantdiseasedetection,
    imageWidth: 420,
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
    link: "https://github.com/Loverzzz/PalmTreeCounting-YOLOv8",
    image: projectObjectDetection,
    imageWidth: 420,
  },
  {
    title: "Stress Prediction Using Text Based ML Models",
    description:
      "Text‑Based Stress Level Prediction Using Machine Learning and NLP.",
    tags: [
      "NLP",
      "Machine Learning Pipeline",
      "TensorFlow Extended",
      "Docker",
      "Model Deployment",
    ],
    link: "https://github.com/Loverzzz/StressPredictionTextBased",
    image: projectStressPredictive,
    imageWidth: 420,
  },
  {
    title:
      "Beijing Air Quality Data Visualization & Analysis Dashboard with Streamlit",
    description:
      "An interactive dashboard for visualizing and analyzing air quality data in Beijing, showcasing pollutants like PM2.5, PM10, SO₂, NO₂, CO, and O₃, with insights on trends, correlations, and weather data using Streamlit.",
    tags: [
      "Streamlit",
      "Pandas",
      "Data Visualization",
      "Interactive Dashboard Development",
      "Time Series Analysis",
    ],
    link: "https://github.com/Loverzzz/AirQAnalysisBeijing",
    image: projectAirQuality,
    imageWidth: 420,
  },
  {
    title:
      "Diabetes Prediction with Tensorflow Extended (TFX) for Deployment Railway and Monitoring with Promotheus",
    description:
      "A machine learning‑powered models using TensorFlow Extended (TFX) that predicts diabetes risk using health metrics and interactive visualization.",
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
    image: projectDiabetesMonitoring,
    imageWidth: 420,
  },
  {
    title:
      "Apple Color Detection & Classification with YOLOv8 with HSV Color Analysis",
    description:
      "Automated detection and classification of apples by color using YOLOv8 for object detection and HSV color analysis for categorizing red, yellow, and green apples.",
    tags: [
      "Ultralytics YOLOv8",
      "OpenCV",
      "Python",
      "NumPy",
      "Color Classification",
      "Bounding Box Processing",
      "Dataset Labeling",
      "Image Preprocessing",
    ],
    link: "https://github.com/Loverzzz/AppleColorClassifier",
    image: projectAppleColorClassified,
    imageWidth: 420,
  },
  {
    title: "Music Recommendation System with Content & Collaborative Filtering",
    description:
      "A music recommendation engine leveraging feature‑based content similarity and collaborative filtering (SVD) to suggest songs based on characteristics and user interaction patterns",
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
    image: projectMusicrecommendation,
    imageWidth: 420,
  },
];

export const achievements: string[] = [
  "1st Place — Driyarkara Film Festival (Editor, Sinematografi UNAIR)",
  "Best Performance Moderator — July & September (Gear Inc)",
];
