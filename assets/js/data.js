const FEEDBACK_STORAGE_KEY = "skillforge_feedbacks_v1";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBbhj-utyG5F0PmANrYak52amMutJEa540",
  authDomain: "skillforge-6601a.firebaseapp.com",
  projectId: "skillforge-6601a",
  storageBucket: "skillforge-6601a.firebasestorage.app",
  messagingSenderId: "1075697671756",
  appId: "1:1075697671756:web:6e89c6970ed2de870f5ee9"
};

const defaultFeedbacks = [
  {
    customerName: "Karthik R.",
    projectName: "Smart Farm Security System",
    message: "Excellent implementation quality and timely updates throughout the project lifecycle.",
    rating: 5
  },
  {
    customerName: "Priya M.",
    projectName: "Eye Blink Controlled Wheelchair",
    message: "The team delivered exactly as promised with professional support and detailed documentation.",
    rating: 5
  },
  {
    customerName: "Naveen S.",
    projectName: "Smart Drainage Monitoring System",
    message: "Strong technical expertise in IoT integration and cloud analytics. Highly recommended.",
    rating: 4
  }
];

const projectsData = [
  {
    title: "Eye Blink Controlled Wheelchair",
    description: "Assistive mobility platform that converts eye-blink commands into wheelchair controls.",
    technologies: ["Arduino", "Embedded", "Healthcare IoT"],
    image: "assets/images/project-wheelchair.svg"
  },
  {
    title: "Smart Drainage Monitoring System",
    description: "Real-time water-level and blockage alerts with predictive maintenance indicators.",
    technologies: ["ESP8266", "IoT", "Cloud Dashboard"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "Drone Based Noise Pollution Monitoring",
    description: "Aerial acoustic data collection system for city-scale environmental intelligence.",
    technologies: ["Drone Tech", "AI", "IoT"],
    image: "assets/images/project-drone.svg"
  },
  {
    title: "Smart Farm Security System",
    description: "Remote farm perimeter monitoring with motion alerts and surveillance analytics.",
    technologies: ["ESP32", "IoT", "Computer Vision"],
    image: "assets/images/project-farm.svg"
  },
  {
    title: "Smart Emergency Vehicle Traffic Control",
    description: "Adaptive traffic signal orchestration to prioritize ambulances and emergency fleets.",
    technologies: ["AI", "Edge ML", "Smart City IoT"],
    image: "assets/images/project-traffic.svg"
  },
  {
    title: "IoT Based Smart Home Automation",
    description: "Unified control for lighting, appliances, and security with mobile access.",
    technologies: ["ESP32", "IoT", "Mobile App"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "Smart Parking System using IoT",
    description: "Real-time parking occupancy detection and reservation assistance platform.",
    technologies: ["Ultrasonic Sensors", "IoT", "Dashboard"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "Smart Dustbin with Garbage Level Detection",
    description: "Automated fill-level alerts for efficient waste collection and route optimization.",
    technologies: ["Arduino", "IoT", "Sensor Network"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "Automatic Plant Watering System",
    description: "Soil-moisture based autonomous irrigation with threshold control and alerts.",
    technologies: ["Arduino", "Embedded", "Automation"],
    image: "assets/images/project-farm.svg"
  },
  {
    title: "AI Based Face Recognition Attendance System",
    description: "Computer vision attendance platform with identity matching and attendance logs.",
    technologies: ["Python", "OpenCV", "AI"],
    image: "assets/images/project-ai-vision.svg"
  },
  {
    title: "Gesture Controlled Robot",
    description: "Hand-gesture driven robotic control using onboard sensors and wireless communication.",
    technologies: ["Robotics", "Arduino", "IMU"],
    image: "assets/images/project-robotics.svg"
  },
  {
    title: "Fire and Gas Leakage Detection System",
    description: "Early-warning safety system with multi-sensor detection and emergency notifications.",
    technologies: ["MQ Sensors", "IoT", "Alert System"],
    image: "assets/images/project-traffic.svg"
  },
  {
    title: "Smart Weather Monitoring System",
    description: "Live weather telemetry platform for temperature, humidity, pressure, and rainfall.",
    technologies: ["ESP8266", "IoT", "Cloud"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "Water Quality Monitoring System",
    description: "Continuous water quality sensing for pH, turbidity, and contamination levels.",
    technologies: ["IoT", "Sensors", "Analytics"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "RFID Based Smart Door Lock",
    description: "Secure access control with RFID authentication and event logs.",
    technologies: ["RFID", "Embedded", "Security"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "IoT Based Energy Monitoring System",
    description: "Power consumption tracking with anomaly alerts and energy-saving insights.",
    technologies: ["IoT", "Energy Analytics", "ESP32"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "AI Object Detection Security System",
    description: "AI-enabled perimeter monitoring with object classification and intrusion alerts.",
    technologies: ["YOLO", "Computer Vision", "AI"],
    image: "assets/images/project-ai-vision.svg"
  },
  {
    title: "Smart Blind Stick for Visually Impaired",
    description: "Obstacle detection and guidance support for safe mobility assistance.",
    technologies: ["Ultrasonic", "Embedded", "Assistive Tech"],
    image: "assets/images/project-wheelchair.svg"
  },
  {
    title: "Smart Helmet with Accident Detection",
    description: "Helmet-integrated impact sensing with emergency alert transmission.",
    technologies: ["IoT", "GPS", "Safety Systems"],
    image: "assets/images/project-traffic.svg"
  },
  {
    title: "Vehicle Accident Alert System with GPS",
    description: "Accident detection with instant location sharing to emergency contacts.",
    technologies: ["GPS", "GSM", "IoT"],
    image: "assets/images/project-traffic.svg"
  },
  {
    title: "IoT Based Smart Street Light System",
    description: "Adaptive streetlight control based on motion, daylight, and traffic patterns.",
    technologies: ["IoT", "Automation", "Smart City"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "Wireless Notice Board using IoT",
    description: "Remote message publishing board for institutions and organizations.",
    technologies: ["ESP8266", "IoT", "Display Control"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "AI Based Mask Detection System",
    description: "Real-time compliance monitoring using camera-based AI detection.",
    technologies: ["AI", "Computer Vision", "Python"],
    image: "assets/images/project-ai-vision.svg"
  },
  {
    title: "Smart Irrigation System",
    description: "Data-driven irrigation scheduling for efficient water management in agriculture.",
    technologies: ["IoT", "Soil Sensors", "Automation"],
    image: "assets/images/project-farm.svg"
  },
  {
    title: "IoT Based Patient Health Monitoring System",
    description: "Remote monitoring of vitals with threshold alerts for healthcare teams.",
    technologies: ["IoT", "Healthcare", "Cloud"],
    image: "assets/images/project-wheelchair.svg"
  },
  {
    title: "Bluetooth Controlled Robot Car",
    description: "Wireless robotic car control with responsive drive and obstacle handling.",
    technologies: ["Bluetooth", "Arduino", "Robotics"],
    image: "assets/images/project-robotics.svg"
  },
  {
    title: "Voice Controlled Home Automation",
    description: "Natural-language based control of home devices and routines.",
    technologies: ["NLP", "IoT", "Home Automation"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "AI Based Crowd Detection System",
    description: "Population density estimation with AI for safety and event management.",
    technologies: ["AI", "Computer Vision", "Analytics"],
    image: "assets/images/project-ai-vision.svg"
  },
  {
    title: "Smart Water Tank Level Monitoring System",
    description: "Continuous tank level tracking with overflow and low-level alerts.",
    technologies: ["IoT", "Ultrasonic", "Automation"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "Automatic Railway Gate Control System",
    description: "Sensor-triggered railway gate operation to improve crossing safety.",
    technologies: ["Embedded", "Automation", "Safety"],
    image: "assets/images/project-traffic.svg"
  },
  {
    title: "AI Based Fire Detection System",
    description: "Visual flame and smoke detection model for rapid incident response.",
    technologies: ["AI", "Computer Vision", "Safety"],
    image: "assets/images/project-ai-vision.svg"
  },
  {
    title: "Smart Energy Saving System",
    description: "Energy optimization framework using occupancy and load intelligence.",
    technologies: ["IoT", "Energy", "Automation"],
    image: "assets/images/project-smart-home.svg"
  },
  {
    title: "IoT Based Pollution Monitoring System",
    description: "Air quality monitoring solution for PM, CO2, and toxic gas analytics.",
    technologies: ["IoT", "Environmental Sensors", "Cloud"],
    image: "assets/images/project-drone.svg"
  },
  {
    title: "Smart Garbage Collection System",
    description: "Smart waste tracking and optimized collection route management.",
    technologies: ["IoT", "Routing", "Urban Tech"],
    image: "assets/images/project-drainage.svg"
  },
  {
    title: "AI Based Driver Drowsiness Detection System",
    description: "Driver alertness monitoring with eye-state and head-pose detection.",
    technologies: ["AI", "Computer Vision", "Automotive Safety"],
    image: "assets/images/project-ai-vision.svg"
  }
];

