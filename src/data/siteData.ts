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

export const blogData: Blog[] = [
  {
    id: "iot-microcontrollers-guide",
    title: "How to Choose the Right Microcontroller for Your IoT Project",
    summary: "A detailed comparison of popular microcontrollers including ESP32, Arduino, Raspberry Pi, and STM32, focusing on power, connectivity, and hardware capability.",
    content: `Choosing the right microcontroller is the foundation of any successful Internet of Things (IoT) project. With dozens of options in the market, selecting one that aligns with your project's power consumption, processing needs, and wireless connectivity can save hours of redesigning.

### 1. Arduino Uno / Nano: The Prototyping Classic
If you are just getting started or building an offline automation prototype, Arduino is the gold standard. 
* **Pros**: Simple programming model, massive community libraries, operates on 5V.
* **Cons**: No native Wi-Fi/Bluetooth, limited RAM (2KB), slow 16MHz clock speed.
* **Best For**: Basic robotics, offline sensors, and mini projects.

### 2. ESP8266 (NodeMCU): Low-Cost Wi-Fi
The ESP8266 changed the IoT landscape by bringing onboard Wi-Fi to a microchip costing under $4.
* **Pros**: Built-in 802.11 b/g/n Wi-Fi, affordable pricing, fully compatible with Arduino IDE.
* **Cons**: Single analog pin, less GPIO pins compared to Arduino.
* **Best For**: Simple smart home projects, weather stations, and basic cloud syncing.

### 3. ESP32: The IoT Powerhouse
For modern projects requiring Bluetooth, higher speeds, and multiple sensors, the ESP32 is our top recommendation.
* **Pros**: Dual-core processor, Wi-Fi & Bluetooth (BLE), touch pins, rich GPIO, hardware encryption.
* **Cons**: Higher power consumption than Arduino, operates strictly on 3.3V.
* **Best For**: Smart agriculture, healthcare monitoring, and audio streaming.

### 4. Raspberry Pi: Single Board Computing
Unlike microcontrollers that execute a single firmware file, the Raspberry Pi runs a full operating system (Linux).
* **Pros**: Multi-threading, USB support, heavy computation, OpenCV vision libraries support.
* **Cons**: High power requirements, storage corruption issues on power failure, boot delay.
* **Best For**: AI Object detection, deep learning, server hosting, and smart gateways.

### Summary Checklist:
* Choose **ESP32** if you require Wi-Fi/Bluetooth and analog sensors.
* Choose **Arduino** if your project requires simple mechanical logic and runs off a small battery.
* Choose **Raspberry Pi** if you are processing camera feeds or hosting web dashboards locally.`,
    author: "Engr. Mathan Kumar",
    date: "June 18, 2026",
    readTime: "5 min read",
    tags: ["IoT", "Microcontrollers", "Arduino", "ESP32"]
  },
  {
    id: "edge-ml-embedded-systems",
    title: "Integrating AI and Edge ML in Embedded Systems",
    summary: "Discover how Edge AI and TinyML are transforming electronics. Learn to deploy neural networks directly on microcontrollers.",
    content: `Historically, machine learning models required heavy GPU cloud infrastructure. Today, a paradigm shift called **TinyML** allows running neural network inference on ultra-low-power microcontrollers. Let's see how this transforms modern electronics.

### Why Edge ML?
1. **Zero Latency**: Decisions are made locally. For example, a driver drowsiness detector must alert the driver instantly without waiting for a round-trip network ping.
2. **Privacy**: Sensor and video data do not need to be transmitted to third-party servers.
3. **Power Efficiency**: Transmitting wireless data via GSM or Wi-Fi is incredibly power-intensive. Running calculations locally saves battery.

### How TinyML Works:
To compress a model from gigabytes to kilobytes:
1. **Collect Data**: Capture sensor readings (vibrations, acoustics, image pixels).
2. **Train Model**: Use a high-level language like Python with TensorFlow to train your model on a desktop.
3. **Quantize & Prune**: Convert float weights (32-bit) to integers (8-bit) using tools like TensorFlow Lite.
4. **Deploy**: Generate a C++ library array representing the network structure and flash it to your microcontroller.

### Popular Edge ML Platforms:
* **Edge Impulse**: A low-code platform for building TinyML pipelines.
* **Arduino Nano 33 BLE Sense**: Features onboard accelerometer, microphone, and gesture sensors perfect for ML prototyping.
* **Raspberry Pi Coral**: Accelerates tensor networks using specialized TPU chips.`,
    author: "AI Developer, SkillForge",
    date: "May 24, 2026",
    readTime: "7 min read",
    tags: ["AI", "EdgeML", "TinyML", "RaspberryPi"]
  }
];

export const faqData: FAQ[] = [
  {
    question: "Do you provide documentation and source code along with the projects?",
    answer: "Yes, absolutely. Every project delivered by SkillForge Technology includes the complete annotated source code, hardware schematics/wiring diagrams, a comprehensive project report (abstract, block diagram, components list, flowchart, and testing guidelines), and slide presentation files."
  },
  {
    question: "Can you customize projects based on our unique requirements?",
    answer: "Yes. Custom project development is our specialty. If you have an idea from a specific IEEE research paper or want to merge multiple features (e.g., adding GPS alerts to an AI vision system), our engineering team will custom design the PCB, assemble the prototype, and write the custom firmware."
  },
  {
    question: "Do you offer post-delivery support and viva preparation?",
    answer: "We support you until your final presentation. We provide video explanations of the working hardware, run online code walkthrough sessions, and conduct mock viva interviews to ensure you can confidently demonstrate your project to your panel."
  },
  {
    question: "Is there a physical training option for internships?",
    answer: "Yes, we conduct hands-on internship programs and technical workshops at our center in Perundurai, Erode. Students work directly with sensors, microcontrollers, soldering stations, and edge devices under the guidance of our design engineers."
  },
  {
    question: "How long does it take to deliver a project?",
    answer: "Mini projects are typically delivered within 3-5 working days. Complex final year projects or custom IoT/AI prototypes take between 10 to 20 working days. We provide progressive updates at each milestone."
  }
];
