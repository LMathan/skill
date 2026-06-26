export interface Project {
  title: string
  description: string
  technologies: string[]
  category: "IoT & Embedded" | "AI & ML" | "Robotics" | "Software Stacks"
}

export interface Service {
  id: string
  title: string
  shortDesc: string
  longDesc: string
  icon: string
  bulletPoints: string[]
}

export interface Feedback {
  customerName: string
  projectName: string
  message: string
  rating: number
}

export interface Blog {
  id: string
  title: string
  summary: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
}

export interface BlogSummary {
  id: string
  title: string
  summary: string
  author: string
  date: string
  readTime: string
  tags: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export const defaultFeedbacks: Feedback[] = [
  {
    customerName: "Karthik R.",
    projectName: "Smart Farm Security System",
    message: "Excellent implementation quality and timely updates throughout the project lifecycle. Highly professional guide.",
    rating: 5
  },
  {
    customerName: "Priya M.",
    projectName: "Eye Blink Controlled Wheelchair",
    message: "The team delivered exactly as promised with detailed circuit layout and hardware documentation.",
    rating: 5
  },
  {
    customerName: "Naveen S.",
    projectName: "Smart Drainage Monitoring System",
    message: "Strong technical expertise in IoT integration and cloud dashboards. Their guidelines helped us present successfully.",
    rating: 5
  },
  {
    customerName: "Ananya K.",
    projectName: "AI Face Recognition Attendance System",
    message: "Flawless OpenCV performance on the Raspberry Pi. The support team answered all our queries within minutes.",
    rating: 4
  }
];

export const projectsData: Project[] = [
  {
    title: "Eye Blink Controlled Wheelchair",
    description: "Assistive mobility platform that converts eye-blink commands into wheelchair controls.",
    technologies: ["Arduino", "Embedded", "Healthcare IoT"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Drainage Monitoring System",
    description: "Real-time water-level and blockage alerts with predictive maintenance indicators.",
    technologies: ["ESP8266", "IoT", "Cloud Dashboard"],
    category: "IoT & Embedded"
  },
  {
    title: "Drone Based Noise Pollution Monitoring",
    description: "Aerial acoustic data collection system for city-scale environmental intelligence.",
    technologies: ["Drone Tech", "AI", "IoT"],
    category: "AI & ML"
  },
  {
    title: "Smart Farm Security System",
    description: "Remote farm perimeter monitoring with motion alerts and surveillance analytics.",
    technologies: ["ESP32", "IoT", "Computer Vision"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Emergency Vehicle Traffic Control",
    description: "Adaptive traffic signal orchestration to prioritize ambulances and emergency fleets.",
    technologies: ["AI", "Edge ML", "Smart City IoT"],
    category: "AI & ML"
  },
  {
    title: "IoT Based Smart Home Automation",
    description: "Unified control for lighting, appliances, and security with mobile access.",
    technologies: ["ESP32", "IoT", "Mobile App"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Parking System using IoT",
    description: "Real-time parking occupancy detection and reservation assistance platform.",
    technologies: ["Ultrasonic Sensors", "IoT", "Dashboard"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Dustbin with Garbage Level Detection",
    description: "Automated fill-level alerts for efficient waste collection and route optimization.",
    technologies: ["Arduino", "IoT", "Sensor Network"],
    category: "IoT & Embedded"
  },
  {
    title: "Automatic Plant Watering System",
    description: "Soil-moisture based autonomous irrigation with threshold control and alerts.",
    technologies: ["Arduino", "Embedded", "Automation"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Based Face Recognition Attendance System",
    description: "Computer vision attendance platform with identity matching and attendance logs.",
    technologies: ["Python", "OpenCV", "AI"],
    category: "AI & ML"
  },
  {
    title: "Gesture Controlled Robot",
    description: "Hand-gesture driven robotic control using onboard sensors and wireless communication.",
    technologies: ["Robotics", "Arduino", "IMU"],
    category: "Robotics"
  },
  {
    title: "Fire and Gas Leakage Detection System",
    description: "Early-warning safety system with multi-sensor detection and emergency notifications.",
    technologies: ["MQ Sensors", "IoT", "Alert System"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Weather Monitoring System",
    description: "Live weather telemetry platform for temperature, humidity, pressure, and rainfall.",
    technologies: ["ESP8266", "IoT", "Cloud"],
    category: "IoT & Embedded"
  },
  {
    title: "Water Quality Monitoring System",
    description: "Continuous water quality sensing for pH, turbidity, and contamination levels.",
    technologies: ["IoT", "Sensors", "Analytics"],
    category: "IoT & Embedded"
  },
  {
    title: "RFID Based Smart Door Lock",
    description: "Secure access control with RFID authentication and event logs.",
    technologies: ["RFID", "Embedded", "Security"],
    category: "IoT & Embedded"
  },
  {
    title: "IoT Based Energy Monitoring System",
    description: "Power consumption tracking with anomaly alerts and energy-saving insights.",
    technologies: ["IoT", "Energy Analytics", "ESP32"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Object Detection Security System",
    description: "AI-enabled perimeter monitoring with object classification and intrusion alerts.",
    technologies: ["YOLO", "Computer Vision", "AI"],
    category: "AI & ML"
  },
  {
    title: "Smart Blind Stick for Visually Impaired",
    description: "Obstacle detection and guidance support for safe mobility assistance.",
    technologies: ["Ultrasonic", "Embedded", "Assistive Tech"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Helmet with Accident Detection",
    description: "Helmet-integrated impact sensing with emergency alert transmission.",
    technologies: ["IoT", "GPS", "Safety Systems"],
    category: "IoT & Embedded"
  },
  {
    title: "Vehicle Accident Alert System with GPS",
    description: "Accident detection with instant location sharing to emergency contacts.",
    technologies: ["GPS", "GSM", "IoT"],
    category: "IoT & Embedded"
  },
  {
    title: "IoT Based Smart Street Light System",
    description: "Adaptive streetlight control based on motion, daylight, and traffic patterns.",
    technologies: ["IoT", "Automation", "Smart City"],
    category: "IoT & Embedded"
  },
  {
    title: "Wireless Notice Board using IoT",
    description: "Remote message publishing board for institutions and organizations.",
    technologies: ["ESP8266", "IoT", "Display Control"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Based Mask Detection System",
    description: "Real-time compliance monitoring using camera-based AI detection.",
    technologies: ["AI", "Computer Vision", "Python"],
    category: "AI & ML"
  },
  {
    title: "Smart Irrigation System",
    description: "Data-driven irrigation scheduling for efficient water management in agriculture.",
    technologies: ["IoT", "Soil Sensors", "Automation"],
    category: "IoT & Embedded"
  },
  {
    title: "IoT Based Patient Health Monitoring System",
    description: "Remote monitoring of vitals with threshold alerts for healthcare teams.",
    technologies: ["IoT", "Healthcare", "Cloud"],
    category: "IoT & Embedded"
  },
  {
    title: "Bluetooth Controlled Robot Car",
    description: "Wireless robotic car control with responsive drive and obstacle handling.",
    technologies: ["Bluetooth", "Arduino", "Robotics"],
    category: "Robotics"
  },
  {
    title: "Voice Controlled Home Automation",
    description: "Natural-language based control of home devices and routines.",
    technologies: ["NLP", "IoT", "Home Automation"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Based Crowd Detection System",
    description: "Population density estimation with AI for safety and event management.",
    technologies: ["AI", "Computer Vision", "Analytics"],
    category: "AI & ML"
  },
  {
    title: "Smart Water Tank Level Monitoring System",
    description: "Continuous tank level tracking with overflow and low-level alerts.",
    technologies: ["IoT", "Ultrasonic", "Automation"],
    category: "IoT & Embedded"
  },
  {
    title: "Automatic Railway Gate Control System",
    description: "Sensor-triggered railway gate operation to improve crossing safety.",
    technologies: ["Embedded", "Automation", "Safety"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Based Fire Detection System",
    description: "Visual flame and smoke detection model for rapid incident response.",
    technologies: ["AI", "Computer Vision", "Safety"],
    category: "AI & ML"
  },
  {
    title: "Smart Energy Saving System",
    description: "Energy optimization framework using occupancy and load intelligence.",
    technologies: ["IoT", "Energy", "Automation"],
    category: "IoT & Embedded"
  },
  {
    title: "IoT Based Pollution Monitoring System",
    description: "Air quality monitoring solution for PM, CO2, and toxic gas analytics.",
    technologies: ["IoT", "Environmental Sensors", "Cloud"],
    category: "IoT & Embedded"
  },
  {
    title: "Smart Garbage Collection System",
    description: "Smart waste tracking and optimized collection route management.",
    technologies: ["IoT", "Routing", "Urban Tech"],
    category: "IoT & Embedded"
  },
  {
    title: "AI Based Driver Drowsiness Detection System",
    description: "Driver alertness monitoring with eye-state and head-pose detection.",
    technologies: ["AI", "Computer Vision", "Automotive Safety"],
    category: "AI & ML"
  }
];

export const servicesData: Service[] = [
  {
    id: "iot",
    title: "IoT Projects & Development",
    shortDesc: "Cloud-connected smart systems with real-time sensor intelligence and dashboards.",
    longDesc: "We design and deploy state-of-the-art Internet of Things (IoT) solutions. From local smart nodes using ESP32 or ESP8266 to cloud integrations using Firebase, AWS IoT, or Blynk. Our systems offer real-time telemetry, automated control loops, and comprehensive dashboards.",
    icon: "Cpu",
    bulletPoints: [
      "Microcontrollers: ESP32, ESP8266, Raspberry Pi",
      "Protocols: MQTT, HTTP, WebSockets, LoRaWAN",
      "Cloud Integrations: AWS IoT, Firebase, Blynk, Node-RED",
      "Sensor Nodes & Sensor Fusion (DHT, Ultrasonic, MQ, GPS, RFID)"
    ]
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    shortDesc: "Robust firmware programming and custom hardware integration for specialized devices.",
    longDesc: "Our embedded systems services bridge software logic and hardware engineering. We build high-efficiency firmware written in optimized Embedded C/C++ or Python, custom schematic and PCB designs, and physical board assembly to produce industry-grade prototypes.",
    icon: "Layers",
    bulletPoints: [
      "Hardware: Arduino, STM32, PIC, MSP430",
      "Language: Embedded C, C++, MicroPython",
      "Peripherals: SPI, I2C, UART, ADC/DAC converters",
      "Prototyping: PCB layout design, circuit simulation, and testing"
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    shortDesc: "Intelligent analytics, computer vision, and automation solutions using modern ML frameworks.",
    longDesc: "We implement artificial intelligence algorithms directly on desktop servers or hardware edges (EdgeML). Specialized in custom computer vision models (OpenCV, YOLO) and predictive systems using Python, TensorFlow, and PyTorch for smart cities and industrial automation.",
    icon: "Brain",
    bulletPoints: [
      "Computer Vision: OpenCV, YOLO, Haar Cascades, MediaPipe",
      "Edge ML: TinyML, Edge Impulse, Raspberry Pi Coral",
      "Predictive Analytics: Classification, regression, and forecasting",
      "Platforms: TensorFlow Lite, PyTorch, Scikit-Learn"
    ]
  },
  {
    id: "ieee",
    title: "IEEE Projects",
    shortDesc: "Comprehensive research support, simulation, implementation, and thesis guides for engineering scholars.",
    longDesc: "We specialize in developing official IEEE conference and journal paper architectures. Supporting engineering students in electronics, computer science, and IT fields with complete mathematical models, research documentation, and presentation rehearsals.",
    icon: "FileText",
    bulletPoints: [
      "Domains: IEEE IoT, IEEE Power Electronics, IEEE Cloud Computing",
      "Documentation: Synopsis, Design Diagrams, Thesis files, PPTs",
      "Simulations: MATLAB, Proteus, Multisim, LabVIEW",
      "Review assistance and viva preparation training"
    ]
  },
  {
    id: "web-mobile",
    title: "Web & Mobile App Development",
    shortDesc: "Premium cross-platform dashboards and user-centric applications tailored for smart products.",
    longDesc: "We build modern React web dashboards and Flutter mobile applications that sync instantly with physical hardware. Features real-time state synchronization, secure user authentication, pushing alerts, and analytics graphics.",
    icon: "Smartphone",
    bulletPoints: [
      "Web Stack: React, Tailwind CSS, Vite, Node.js",
      "Mobile Stack: Flutter (Android & iOS), Dart",
      "State Management: Redux, Context API, Firebase Streams",
      "Integrations: REST APIs, WebSockets, Bluetooth (BLE)"
    ]
  },
  {
    id: "internships",
    title: "Internship Training & Workshops",
    shortDesc: "Hands-on industrial training on IoT, AI, and Embedded systems with certified achievements.",
    longDesc: "We offer professional hardware and software training programs. Through structured modules, engineering students and graduates learn to interface microcontrollers, program computer vision systems, and develop full IoT stacks. Features 100% lab-based projects.",
    icon: "GraduationCap",
    bulletPoints: [
      "Hands-on access to development kits and sensors",
      "Mentorship from experienced embedded engineers",
      "Industrial Internship Certification & Project Badges",
      "Workshops covering Edge AI, IoT Cloud, and PCB Designing"
    ]
  }
];

import { blogData as generatedBlogData, blogSummaryData as generatedBlogSummaryData } from "./blogData"

export const blogData: Blog[] = generatedBlogData;
export const blogSummaryData: BlogSummary[] = generatedBlogSummaryData;


export const faqData: FAQ[] = [
  {
    question: "What is the best final year project center in Erode for engineering students?",
    answer: "SkillForge Technology is widely recognized as the premier final year project center in Erode, offering verified academic mentoring for ECE, CSE, EEE, IT, and Robotics streams. Situated on Perundurai Road near top institutions like Kongu Engineering College (KEC) and Velalar College (VCET), our laboratory focuses on practical learning. Unlike centers selling pre-built modules, we guide students through custom hardware assembly, schematic validation, and source code diagnostics. Learn more about our [Engineering Services](/services) or explore our [Projects Portfolio](/projects) to find your next innovation topic."
  },
  {
    question: "Do you provide IEEE projects with complete source code and documentation?",
    answer: "Yes, absolutely. SkillForge Technology is a trusted IEEE project center in Erode. Every IEEE reference paper project includes fully annotated source code (written in C++, Python, Dart, or MATLAB), complete circuit schematics, wiring connections diagrams, block flowcharts, and a detailed research thesis report formatted to college panel guidelines. We also conduct interactive code walkthroughs and mock viva presentation rehearsals to help you explain the project logic confidently to academic reviews. View our ready-made prototypes in the [Projects Gallery](/projects)."
  },
  {
    question: "Can engineering students customize their final year project parameters?",
    answer: "Yes, custom project development is our key specialty. If you want to merge features from different research papers—such as adding GPS alerts to an AI computer vision system or building a custom Node-RED dashboard for an agricultural sensor network—our lab design engineers will customize the printed circuit board (PCB) layout and write custom firmware for you. We cater to unique needs for B.E., B.Tech, and M.E. candidates. Contact our Erode design laboratory today via our [Contact Page](/contact) to discuss your customized ideas."
  },
  {
    question: "Do you provide IoT projects using ESP32 and cloud dashboards?",
    answer: "Yes. We design and program advanced Internet of Things (IoT) systems using ESP32 and ESP8266 development boards. Our lab focuses on real-time data sync using Google Firebase, AWS IoT Core, and Blynk console dashboards. We train students on modern communication protocols like MQTT, HTTP REST, and WebSockets. Projects include multi-sensor arrays, solar telemetry, and mobile controllers. Check out our IoT division details on our [Services Page](/services#iot)."
  },
  {
    question: "Do you provide AI, Machine Learning, and Edge AI projects?",
    answer: "Yes, we specialize in Artificial Intelligence and Machine Learning solutions. We develop computer vision applications using Python, OpenCV, YOLO, and MediaPipe. Crucially, we focus on Edge AI and TinyML—optimizing deep neural networks to run locally on low-power hardware like ESP32 microcontrollers, Raspberry Pi 4/5, or Nvidia Jetson Nano nodes. Projects cover facial recognition attendance systems, perimeter monitoring, and driver drowsiness alerts. Explore our AI developments at [AI Specializations](/services#ai-ml)."
  },
  {
    question: "Do you provide certified technical internships and workshops?",
    answer: "Yes. SkillForge Technology offers hands-on industrial internship programs and technical workshops at our Erode development laboratory. Students gain practical experience interfacing microcontrollers, soldering PCBs, and compiling computer vision code. Upon successful completion, you receive ISO-compliant internship certificates, technical project badges, and resume-ready credentials valued by core tech recruiters. Read testimonials from former interns on our [Reviews Page](/reviews) or consult our engineers on our [About Us Page](/about)."
  },
  {
    question: "Do you provide Embedded Systems and Robotics projects?",
    answer: "Yes, our laboratory supports robust Embedded Systems and Robotics projects using Arduino, STM32 ARM Cortex, PIC, and MSP430 controllers. We guide students in schematic capture, circuit board routing, firmware coding in Embedded C, and motor control diagnostics using digital oscilloscopes (DSOs). Robotic systems include gesture-controlled rovers, obstacle-avoidance platforms, and automated robotic arms. Read about our firmware expertise under [Embedded Services](/services#embedded)."
  },
  {
    question: "How long does a final year project take, and can they be delivered online?",
    answer: "Standard academic projects are typically finalized within 5 to 7 working days, while custom IoT or AI models take between 10 to 15 working days. Yes, we support complete online delivery for students in nearby cities like Coimbatore, Salem, Tiruppur, Namakkal, and Karur. We provide step-by-step assembly guides, online screen-sharing code explanations, and secure courier shipping. Visit our [Contact Page](/contact) to query about timelines."
  }
];
