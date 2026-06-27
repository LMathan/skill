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
]
