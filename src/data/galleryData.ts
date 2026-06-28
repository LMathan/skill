/**
 * Gallery Data — SkillForge Technology Project Gallery
 *
 * HOW TO ADD A NEW IMAGE:
 * 1. Name the file descriptively: e.g. esp32-smart-home-iot-project.jpeg
 * 2. Drop it in /public/gallery/
 * 3. Add an entry below with all fields filled in
 */

export type GalleryCategory =
  | "IoT & Embedded"
  | "AI & ML"
  | "Robotics"
  | "Software Stacks"

export interface GalleryImage {
  /** Caption title shown under the image card and in the lightbox */
  projectTitle: string
  /** SEO-friendly filename path from /public */
  src: string
  /**
   * Descriptive alt text — critical for Google Image Search ranking.
   * Format: "[Project Name] built by SkillForge Technology, Erode — [hardware/software details]"
   */
  alt: string
  /** Category used by the filter bar */
  category: GalleryCategory
  /** Technologies used — shown as chips under the card caption */
  technologies: string[]
  /** Target department/stream */
  department: string
  /** One-line description shown under the card */
  shortDesc: string
  /** Optional: internal link to the related services page section */
  relatedService?: string
  /** Optional: internal link to a related blog post slug */
  relatedBlog?: string
}

export const galleryData: GalleryImage[] = [
  // ─── Robotics ──────────────────────────────────────────────────────────────
  {
    projectTitle: "Eye Blink Controlled Car with Obstacle Avoidance",
    src: "/gallery/eye-blink-car-obstacle-avoidance-front-view.jpeg",
    alt: "Eye Blink Controlled Car with Obstacle Avoidance built by SkillForge Technology Erode — front view showing Arduino UNO, HC-SR04 ultrasonic sensor and 18650 Li-Ion battery pack",
    category: "Robotics",
    technologies: ["Arduino UNO", "Ultrasonic Sensor", "Eye Blink Sensor", "L298N Motor Driver"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "Assistive car controlled by eye blink signals with automatic obstacle detection and avoidance.",
    relatedService: "/services#embedded",
  },
  {
    projectTitle: "Eye Blink Controlled Car with Obstacle Avoidance",
    src: "/gallery/eye-blink-car-obstacle-avoidance-top-view.jpeg",
    alt: "Eye Blink Controlled Car with Obstacle Avoidance — top-down view of PCB layout, L298N motor driver and 18650 Li-Ion battery holder built at SkillForge Technology lab, Erode",
    category: "Robotics",
    technologies: ["Arduino UNO", "Ultrasonic Sensor", "Eye Blink Sensor", "L298N Motor Driver"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "PCB top view — motor driver wiring, Li-Ion battery cells, and custom chassis layout.",
    relatedService: "/services#embedded",
  },

  // ─── IoT & Embedded ────────────────────────────────────────────────────────
  {
    projectTitle: "Smart Irrigation System",
    src: "/gallery/smart-irrigation-system-esp8266-arduino-sensors.jpeg",
    alt: "Smart Irrigation System developed at SkillForge Technology Erode — capacitive soil moisture sensor V1.2, ESP8266 NodeMCU, Arduino UNO, dual relay module and solenoid water valves",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Soil Moisture Sensor", "Relay Module", "Solenoid Valve"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "IoT-based automatic irrigation using soil moisture sensing, cloud monitoring and relay-controlled water valves.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "Smart Irrigation System",
    src: "/gallery/smart-irrigation-system-mobile-dashboard-iot.png",
    alt: "Smart Irrigation System IoT hardware with mobile app dashboard showing real-time irrigation control — developed by SkillForge Technology, Erode Tamil Nadu",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Flutter Mobile App", "Firebase"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "Mobile dashboard showing live sensor readings and manual/auto irrigation control from anywhere.",
    relatedService: "/services#iot",
  },

  // ─── AI & ML ───────────────────────────────────────────────────────────────
  {
    projectTitle: "AI Smart Waste Monitoring System",
    src: "/gallery/ai-smart-waste-monitoring-system-dashboard.png",
    alt: "AI Smart Waste Monitoring System developed by SkillForge Technology Erode — web dashboard interface on Lenovo Legion laptop with circular AI vision sensor module connected via USB",
    category: "AI & ML",
    technologies: ["Python", "Computer Vision", "OpenCV", "React Dashboard", "USB Camera Module"],
    department: "CSE / IT Final Year Project",
    shortDesc: "AI-powered waste detection system with real-time web dashboard and camera-based classification module.",
    relatedService: "/services#ai-ml",
  },

  // ─── IoT & Embedded ────────────────────────────────────────────────────────
  {
    projectTitle: "Automatic & Remote Motor Control System",
    src: "/gallery/automatic-remote-motor-control-dashboard-laptops.jpeg",
    alt: "Automatic and Remote Motor Control System by SkillForge Technology Erode — mobile control dashboard, development setup on two laptops with VS Code and motor controller hardware enclosure",
    category: "IoT & Embedded",
    technologies: ["ESP32", "Flutter Mobile App", "Firebase", "Relay Module", "Motor Driver"],
    department: "EEE / Mechatronics Final Year Project",
    shortDesc: "Remote and automated motor control with live mobile dashboard, IoT integration and relay switching.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "Automatic & Remote Motor Control System",
    src: "/gallery/automatic-remote-motor-control-hardware-relay.jpeg",
    alt: "Automatic and Remote Motor Control System hardware internals — relay module, custom wiring, motor driver circuit inside enclosure, built at SkillForge Technology laboratory Erode",
    category: "IoT & Embedded",
    technologies: ["Relay Module", "Motor Driver", "ESP32", "Custom Enclosure", "Power Electronics"],
    department: "EEE / Mechatronics Final Year Project",
    shortDesc: "Internal hardware — relay switching circuit, power electronics and motor driver mounted inside protective enclosure.",
    relatedService: "/services#embedded",
  },

  // ─── IoT & Embedded (New) ──────────────────────────────────────────────────
  {
    projectTitle: "Smart Irrigation and Water Flow Control System",
    src: "/gallery/smart-irrigation-system-water-flow-sensor-hardware.jpeg",
    alt: "Smart Irrigation and Water Flow Control System hardware built by SkillForge Technology Erode — showing NodeMCU ESP8266, soil moisture sensor v1.2, YF-S201 flow sensor, solenoid valve, and power adapter on a wooden test board",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Soil Moisture Sensor", "Water Flow Sensor YF-S201", "Solenoid Valve", "Relay Module"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "Automated irrigation hardware setup featuring capacitive soil moisture sensor, water flow sensor, NodeMCU, and solenoid valve control.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "IoT Vehicle Tracking & GPS Alert System",
    src: "/gallery/iot-gps-vehicle-tracking-system-hardware.jpeg",
    alt: "IoT Vehicle Tracking and GPS Alert System hardware developed by SkillForge Technology Erode — showing ESP8266 NodeMCU, NEO-6M GPS receiver module, and ceramic GPS patch antenna on a dot matrix prototyping PCB",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "NEO-6M GPS Module", "GPS Ceramic Antenna", "Sound Level Sensor"],
    department: "ECE / CSE Final Year Project",
    shortDesc: "IoT-enabled vehicle tracking prototype using NEO-6M GPS and NodeMCU on a general-purpose PCB for real-time location mapping.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "IoT Water Pipeline Leakage & Theft Detection System",
    src: "/gallery/iot-water-leakage-detection-system-hardware.jpeg",
    alt: "IoT Water Pipeline Leakage and Theft Detection System prototype by SkillForge Technology Erode — dual YF-S201 water flow sensors connected to PVC piping, LCD display showing flow metrics, and submersible pump on wood base",
    category: "IoT & Embedded",
    technologies: ["ESP8266", "Water Flow Sensor YF-S201", "16x2 LCD Display", "Submersible Water Pump", "Buzzer", "Relay Module"],
    department: "ECE / EEE / Mechatronics Project",
    shortDesc: "Pipeline leakage detection prototype measuring flow rates at multiple points using YF-S201 sensors and reporting to an LCD and IoT cloud.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "IoT Alcohol Detection & Vehicle Ignition Locking System",
    src: "/gallery/alcohol-detection-engine-locking-system-esp32.jpeg",
    alt: "IoT Alcohol Detection and Vehicle Ignition Locking System built by SkillForge Technology Erode — ESP32 microcontroller, MQ-3 alcohol sensor module, dual relay board, and 16x2 LCD screen showing 'Alc: 0 SAFE Waiting'",
    category: "IoT & Embedded",
    technologies: ["ESP32 WROOM", "MQ-3 Alcohol Sensor", "16x2 LCD Display", "Dual Relay Module", "Buzzer"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "Smart vehicle safety system that detects alcohol levels using an MQ-3 sensor and locks the engine ignition via relays.",
    relatedService: "/services#iot",
  },
  {
    projectTitle: "IoT Smart Drainage & Blockage Monitoring System",
    src: "/gallery/iot-smart-drainage-system-hardware-solenoid-valve.png",
    alt: "IoT Smart Drainage and Blockage Monitoring System built by SkillForge Technology Erode — showing NodeMCU ESP8266, Arduino UNO, solenoid control valves, gas level sensors, and a web dashboard on a laptop displaying live drainage metrics",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Solenoid Valve", "Gas Sensor", "Relay Module", "Web Dashboard"],
    department: "ECE / CSE Final Year Project",
    shortDesc: "IoT-based drainage monitoring and control system with automated flow direction valves and live web dashboard monitoring.",
    relatedService: "/services#iot",
  },

  // ─── Robotics (New) ────────────────────────────────────────────────────────
  {
    projectTitle: "F450 Quadcopter Drone with FlySky RC Transmitter",
    src: "/gallery/f450-quadcopter-drone-uav-assembly.jpeg",
    alt: "Assembled F450 quadcopter drone on wooden table by SkillForge Technology Erode — showcasing red and black arms, FlySky FS-iA6B receiver, brushless motors, propellers, and FS-i6 remote transmitter in foreground",
    category: "Robotics",
    technologies: ["F450 Quadcopter Frame", "A2212 Brushless Motors", "FlySky FS-i6 Transmitter", "FS-iA6B Receiver", "ESC", "Flight Controller"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Assembled F450 quadcopter drone featuring 2200KV brushless motors, ESC speed controllers, and a FlySky remote control transmitter setup.",
    relatedService: "/services#embedded",
  },
  {
    projectTitle: "Autonomous Drone Flight Testing",
    src: "/gallery/quadcopter-drone-uav-outdoor-flight-test.jpeg",
    alt: "Autonomous quadcopter drone in mid-air flight during test run by SkillForge Technology Erode — showcasing spinning brushless motors and propellers against a blurred background building",
    category: "Robotics",
    technologies: ["Quadcopter UAV", "Brushless Motors", "LiPo Battery", "Flight Controller", "Telemetry"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Real-time outdoor flight stability testing of a custom-built quadcopter drone at SkillForge Technology center.",
    relatedService: "/services#embedded",
  },
  {
    projectTitle: "FlySky FS-i6 RC Transmitter Ground Calibration",
    src: "/gallery/flysky-remote-controller-drone-ground-setup.jpeg",
    alt: "FlySky FS-i6 radio remote control transmitter on green grass during outdoor drone flight testing by SkillForge Technology Erode — quadcopter drone visible out of focus in background",
    category: "Robotics",
    technologies: ["FlySky FS-i6 Transmitter", "Quadcopter Drone", "Radio Frequency (RF) Control"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Close-up of FlySky FS-i6 RC transmitter setup on green lawn during field calibration of the quadcopter drone.",
    relatedService: "/services#embedded",
  },
]

