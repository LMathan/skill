/**
 * Gallery Data — SkillForge Technology Project Gallery
 *
 * HOW TO ADD A NEW IMAGE:
 * 1. Name the file descriptively: e.g. esp32-smart-home-iot-project.jpeg
 * 2. Drop it in /public/gallery/[service-slug]/ (e.g. /public/gallery/iot/)
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
  /** Dynamic features bullet points list showing project specs */
  features?: string[]
}

export const galleryData: GalleryImage[] = [
  // ─── Robotics ──────────────────────────────────────────────────────────────
  {
    projectTitle: "Eye Blink Controlled Car with Obstacle Avoidance",
    src: "/gallery/iot/eye-blink-car-obstacle-avoidance-front-view.jpeg",
    alt: "Eye Blink Controlled Car with Obstacle Avoidance built by SkillForge Technology Erode — front view showing Arduino UNO, HC-SR04 ultrasonic sensor and 18650 Li-Ion battery pack",
    category: "Robotics",
    technologies: ["Arduino UNO", "Ultrasonic Sensor", "Eye Blink Sensor", "L298N Motor Driver"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "Assistive car controlled by eye blink signals with automatic obstacle detection and avoidance.",
    relatedService: "/services/iot-embedded",
    features: [
      "Real-time eye blink sensor signal processing using threshold algorithms.",
      "Automated obstacle distance mapping with HC-SR04 ultrasonic sensor inputs.",
      "Dynamic motor control steering via L298N driver logic gates."
    ]
  },
  {
    projectTitle: "Eye Blink Controlled Car with Obstacle Avoidance",
    src: "/gallery/iot/eye-blink-car-obstacle-avoidance-top-view.jpeg",
    alt: "Eye Blink Controlled Car with Obstacle Avoidance — top-down view of PCB layout, L298N motor driver and 18650 Li-Ion battery holder built at SkillForge Technology lab, Erode",
    category: "Robotics",
    technologies: ["Arduino UNO", "Ultrasonic Sensor", "Eye Blink Sensor", "L298N Motor Driver"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "PCB top view — motor driver wiring, Li-Ion battery cells, and custom chassis layout.",
    relatedService: "/services/iot-embedded",
    features: [
      "Compact PCB layout optimized for 18650 Li-Ion battery pack efficiency.",
      "High-conductivity copper trace pathways protecting the L298N motor driver.",
      "Secure structural chassis layout aligning sensors with logic gates."
    ]
  },

  // ─── IoT & Embedded ────────────────────────────────────────────────────────
  {
    projectTitle: "Smart Irrigation System",
    src: "/gallery/iot/smart-irrigation-system-esp8266-arduino-sensors.jpeg",
    alt: "Smart Irrigation System developed at SkillForge Technology Erode — capacitive soil moisture sensor V1.2, ESP8266 NodeMCU, Arduino UNO, dual relay module and solenoid water valves",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Soil Moisture Sensor", "Relay Module", "Solenoid Valve"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "IoT-based automatic irrigation using soil moisture sensing, cloud monitoring and relay-controlled water valves.",
    relatedService: "/services/iot-embedded",
    features: [
      "Capacitive soil moisture sensing calibrating digital irrigation threshold parameters.",
      "Automated solenoid valve triggering based on real-time soil dry state data.",
      "Low power ESP8266 controller sleep cycles extending battery deployment longevity."
    ]
  },
  {
    projectTitle: "Smart Irrigation System",
    src: "/gallery/iot/smart-irrigation-system-mobile-dashboard-iot.png",
    alt: "Smart Irrigation System IoT hardware with mobile app dashboard showing real-time irrigation control — developed by SkillForge Technology, Erode Tamil Nadu",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Flutter Mobile App", "Firebase"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "Mobile dashboard showing live sensor readings and manual/auto irrigation control from anywhere.",
    relatedService: "/services/iot-embedded",
    features: [
      "Real-time telemetry database sync feeding live mobile charts.",
      "Custom Flutter mobile app UI displaying soil dry/wet status toggles.",
      "Manual override relay switching commands with minimal latency feedback."
    ]
  },

  // ─── AI & ML ───────────────────────────────────────────────────────────────
  {
    projectTitle: "AI Smart Waste Monitoring System",
    src: "/gallery/iot/ai-smart-waste-monitoring-system-dashboard.png",
    alt: "AI Smart Waste Monitoring System developed by SkillForge Technology Erode — web dashboard interface on Lenovo Legion laptop with circular AI vision sensor module connected via USB",
    category: "AI & ML",
    technologies: ["Python", "Computer Vision", "OpenCV", "React Dashboard", "USB Camera Module"],
    department: "CSE / IT Final Year Project",
    shortDesc: "AI-powered waste detection system with real-time web dashboard and camera-based classification module.",
    relatedService: "/services/ai-solutions",
    features: [
      "Computer vision object detection classifying degradable vs non-degradable waste.",
      "React dashboard panel visualizing real-time bin capacity statuses.",
      "USB camera feed analysis with OpenCV library running on local edge nodes."
    ]
  },

  // ─── IoT & Embedded ────────────────────────────────────────────────────────
  {
    projectTitle: "Automatic & Remote Motor Control System",
    src: "/gallery/iot/automatic-remote-motor-control-dashboard-laptops.jpeg",
    alt: "Automatic and Remote Motor Control System by SkillForge Technology Erode — mobile control dashboard, development setup on two laptops with VS Code and motor controller hardware enclosure",
    category: "IoT & Embedded",
    technologies: ["ESP32", "Flutter Mobile App", "Firebase", "Relay Module", "Motor Driver"],
    department: "EEE / Mechatronics Final Year Project",
    shortDesc: "Remote and automated motor control with live mobile dashboard, IoT integration and relay switching.",
    relatedService: "/services/iot-embedded",
    features: [
      "Remote starting and stopping commands sent via cloud database sync.",
      "Over-current protection indicators alerting on abnormal load spikes.",
      "Flutter app dashboard graphing live motor operational telemetry variables."
    ]
  },
  {
    projectTitle: "Automatic & Remote Motor Control System",
    src: "/gallery/iot/automatic-remote-motor-control-hardware-relay.jpeg",
    alt: "Automatic and Remote Motor Control System hardware internals — relay module, custom wiring, motor driver circuit inside enclosure, built at SkillForge Technology laboratory Erode",
    category: "IoT & Embedded",
    technologies: ["Relay Module", "Motor Driver", "ESP32", "Custom Enclosure", "Power Electronics"],
    department: "EEE / Mechatronics Final Year Project",
    shortDesc: "Internal hardware — relay switching circuit, power electronics and motor driver mounted inside protective enclosure.",
    relatedService: "/services/iot-embedded",
    features: [
      "Secure industrial enclosure protecting power relays and high-voltage wiring.",
      "ESP32 board layout integrating optocoupler isolation circuits.",
      "Stable 12V to 5V step-down power conversion for logic rails."
    ]
  },

  // ─── IoT & Embedded (New) ──────────────────────────────────────────────────
  {
    projectTitle: "Smart Irrigation and Water Flow Control System",
    src: "/gallery/iot/smart-irrigation-system-water-flow-sensor-hardware.jpeg",
    alt: "Smart Irrigation and Water Flow Control System hardware built by SkillForge Technology Erode — showing NodeMCU ESP8266, soil moisture sensor v1.2, YF-S201 flow sensor, solenoid valve, and power adapter on a wooden test board",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Soil Moisture Sensor", "Water Flow Sensor YF-S201", "Solenoid Valve", "Relay Module"],
    department: "ECE / Agriculture Engineering Final Year Project",
    shortDesc: "Automated irrigation hardware setup featuring capacitive soil moisture sensor, water flow sensor, NodeMCU, and solenoid valve control.",
    relatedService: "/services/iot-embedded",
    features: [
      "Dual flow measurement comparing inlet vs outlet fluid metrics.",
      "Capacitive moisture readings mapping volumetric soil water content.",
      "Automated flow cutoff safety gates if anomalies are detected."
    ]
  },
  {
    projectTitle: "IoT Vehicle Tracking & GPS Alert System",
    src: "/gallery/iot/iot-gps-vehicle-tracking-system-hardware.jpeg",
    alt: "IoT Vehicle Tracking and GPS Alert System hardware developed by SkillForge Technology Erode — showing ESP8266 NodeMCU, NEO-6M GPS receiver module, and ceramic GPS patch antenna on a dot matrix prototyping PCB",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "NEO-6M GPS Module", "GPS Ceramic Antenna", "Sound Level Sensor"],
    department: "ECE / CSE Final Year Project",
    shortDesc: "IoT-enabled vehicle tracking prototype using NEO-6M GPS and NodeMCU on a general-purpose PCB for real-time location mapping.",
    relatedService: "/services/iot-embedded",
    features: [
      "NEO-6M GPS satellite signal decoding mapping raw NMEA sentences.",
      "Real-time location coordinate updates sent over cellular network channels.",
      "Automatic boundary geofencing alerts emitting buzzer sound alarms."
    ]
  },
  {
    projectTitle: "IoT Water Pipeline Leakage & Theft Detection System",
    src: "/gallery/iot/iot-water-leakage-detection-system-hardware.jpeg",
    alt: "IoT Water Pipeline Leakage and Theft Detection System prototype by SkillForge Technology Erode — dual YF-S201 water flow sensors connected to PVC piping, LCD display showing flow metrics, and submersible pump on wood base",
    category: "IoT & Embedded",
    technologies: ["ESP8266", "Water Flow Sensor YF-S201", "16x2 LCD Display", "Submersible Water Pump", "Buzzer", "Relay Module"],
    department: "ECE / EEE / Mechatronics Project",
    shortDesc: "Pipeline leakage detection prototype measuring flow rates at multiple points using YF-S201 sensors and reporting to an LCD and IoT cloud.",
    relatedService: "/services/iot-embedded",
    features: [
      "Flow comparison sensors measuring volume discrepancies across pipelines.",
      "LCD visual display mapping live sensor liters-per-minute metrics.",
      "Real-time leak indicator logic warning of theft/burst coordinates."
    ]
  },
  {
    projectTitle: "IoT Alcohol Detection & Vehicle Ignition Locking System",
    src: "/gallery/iot/alcohol-detection-engine-locking-system-esp32.jpeg",
    alt: "IoT Alcohol Detection and Vehicle Ignition Locking System built by SkillForge Technology Erode — ESP32 microcontroller, MQ-3 alcohol sensor module, dual relay board, and 16x2 LCD screen showing 'Alc: 0 SAFE Waiting'",
    category: "IoT & Embedded",
    technologies: ["ESP32 WROOM", "MQ-3 Alcohol Sensor", "16x2 LCD Display", "Dual Relay Module", "Buzzer"],
    department: "ECE / EEE Final Year Project",
    shortDesc: "Smart vehicle safety system that detects alcohol levels using an MQ-3 sensor and locks the engine ignition via relays.",
    relatedService: "/services/iot-embedded",
    features: [
      "Highly sensitive MQ-3 alcohol sensor calibration with threshold metrics.",
      "Automatic ignition engine locking relay switching logic gates.",
      "16x2 LCD screen mapping real-time breath analyzer feedback."
    ]
  },
  {
    projectTitle: "IoT Smart Drainage & Blockage Monitoring System",
    src: "/gallery/iot/iot-smart-drainage-system-hardware-solenoid-valve.png",
    alt: "IoT Smart Drainage and Blockage Monitoring System built by SkillForge Technology Erode — showing NodeMCU ESP8266, Arduino UNO, solenoid control valves, gas level sensors, and a web dashboard on a laptop displaying live drainage metrics",
    category: "IoT & Embedded",
    technologies: ["ESP8266 NodeMCU", "Arduino UNO", "Solenoid Valve", "Gas Sensor", "Relay Module", "Web Dashboard"],
    department: "ECE / CSE Final Year Project",
    shortDesc: "IoT-based drainage monitoring and control system with automated flow direction valves and live web dashboard monitoring.",
    relatedService: "/services/iot-embedded",
    features: [
      "Ultrasonic level sensors detecting wastewater height profiles.",
      "Combustible toxic gas level monitoring via MQ family detectors.",
      "Solenoid gate valve flushing controls clearing blockage spots."
    ]
  },

  // ─── Robotics (New) ────────────────────────────────────────────────────────
  {
    projectTitle: "F450 Quadcopter Drone with FlySky RC Transmitter",
    src: "/gallery/iot/f450-quadcopter-drone-uav-assembly.jpeg",
    alt: "Assembled F450 quadcopter drone on wooden table by SkillForge Technology Erode — showcasing red and black arms, FlySky FS-iA6B receiver, brushless motors, propellers, and FS-i6 remote transmitter in foreground",
    category: "Robotics",
    technologies: ["F450 Quadcopter Frame", "A2212 Brushless Motors", "FlySky FS-i6 Transmitter", "FS-iA6B Receiver", "ESC", "Flight Controller"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Assembled F450 quadcopter drone featuring 2200KV brushless motors, ESC speed controllers, and a FlySky remote control transmitter setup.",
    relatedService: "/services/iot-embedded",
    features: [
      "F450 quadcopter arm structural assembly securing ESC and wiring paths.",
      "FlySky FS-i6 transmitter binding with FS-iA6B receiver layout.",
      "A2212 brushless motor mount alignment with propeller sets."
    ]
  },
  {
    projectTitle: "Autonomous Drone Flight Testing",
    src: "/gallery/iot/quadcopter-drone-uav-outdoor-flight-test.jpeg",
    alt: "Autonomous quadcopter drone in mid-air flight during test run by SkillForge Technology Erode — showcasing spinning brushless motors and propellers against a blurred background building",
    category: "Robotics",
    technologies: ["Quadcopter UAV", "Brushless Motors", "LiPo Battery", "Flight Controller", "Telemetry"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Real-time outdoor flight stability testing of a custom-built quadcopter drone at SkillForge Technology center.",
    relatedService: "/services/iot-embedded",
    features: [
      "Flight controller calibration tuning PID roll and pitch values.",
      "Telemetry logs tracking live battery voltage levels and RF signal strength.",
      "Outdoor mid-air flight stability checks under variable wind loads."
    ]
  },
  {
    projectTitle: "FlySky FS-i6 RC Transmitter Ground Calibration",
    src: "/gallery/iot/flysky-remote-controller-drone-ground-setup.jpeg",
    alt: "FlySky FS-i6 radio remote control transmitter on green grass during outdoor drone flight testing by SkillForge Technology Erode — quadcopter drone visible out of focus in background",
    category: "Robotics",
    technologies: ["FlySky FS-i6 Transmitter", "Quadcopter Drone", "Radio Frequency (RF) Control"],
    department: "Aeronautical / ECE / Mechatronics Project",
    shortDesc: "Close-up of FlySky FS-i6 RC transmitter setup on green lawn during field calibration of the quadcopter drone.",
    relatedService: "/services/iot-embedded",
    features: [
      "Radio frequency channel calibration matching remote sticks to receiver axes.",
      "Visual telemetry screen monitoring real-time throttle curve metrics.",
      "Dual-rate switch tuning for high and low drone agility presets."
    ]
  },
  {
    projectTitle: "Omnisphere Enterprise ERP Cloud Suite",
    src: "/gallery/software/enterprise-erp-dashboard.png",
    alt: "Omnisphere Enterprise ERP Cloud Suite web interface built by SkillForge Technology Erode showing glassmorphic layout, analytics line charts, revenue indicators, and database query lists",
    category: "Software Stacks",
    technologies: ["Next.js", "Prisma ORM", "Tailwind CSS", "Postgres", "Redis Caching"],
    department: "Custom Enterprise Software Development",
    shortDesc: "Fully responsive multi-tenant SaaS ERP panel featuring glassmorphism and real-time dashboard analytics.",
    relatedService: "/services/software-development",
    features: [
      "Multi-tenant user authentication and custom permission role grids.",
      "Interactive financial cash flow ledger charts built with Chart.js.",
      "High-throughput Postgres query structures caching metrics on Redis."
    ]
  },
  {
    projectTitle: "Aura Organics WooCommerce Storefront",
    src: "/gallery/software/woocommerce-storefront.png",
    alt: "Aura Organics WooCommerce Storefront developed by SkillForge Technology Erode showing minimalist design, product grids, custom shopping cart configurations, and clean typography",
    category: "Software Stacks",
    technologies: ["WordPress", "WooCommerce", "Tailwind CSS", "Stripe Gateway", "Core Web Vitals"],
    department: "E-Commerce Solutions / CMS",
    shortDesc: "Highly optimized organic product e-commerce storefront with custom filters and fast payment integration.",
    relatedService: "/services/wordpress-development",
    features: [
      "High-conversion e-commerce landing pages optimized for fast checkout flow.",
      "Secure payment gateway integration (Stripe, Paypal) and custom coupon engines.",
      "WordPress WooCommerce database schema optimization and custom plugin hooks."
    ]
  },
  {
    projectTitle: "Enterprise CI/CD Cloud Pipeline Monitor",
    src: "/gallery/software/devops-pipeline-console.png",
    alt: "Enterprise CI/CD Cloud Pipeline Monitor dashboard created by SkillForge Technology Erode showcasing containerized deployment status, build latency metrics, and AWS cluster graphs",
    category: "Software Stacks",
    technologies: ["AWS ECS", "Docker", "GitHub Actions", "Kubernetes", "Datadog Telemetry"],
    department: "Cloud Operations & DevOps",
    shortDesc: "Real-time cloud deployment pipelines monitor showcasing staging to production cluster orchestrations.",
    relatedService: "/services/cloud-solutions",
    features: [
      "Automated CI/CD workflow pipeline setup with secure container actions.",
      "AWS ECS or Kubernetes cloud cluster orchestration and load balancing.",
      "Real-time cloud application monitoring, latency logging, and error alert telemetry."
    ]
  },
  {
    projectTitle: "Multi-Agent Cognitive Workflow Graph Workspace",
    src: "/gallery/software/ai-agentic-dashboard.png",
    alt: "Multi-Agent Cognitive Workflow Graph Workspace developed by SkillForge Technology Erode showcasing neural semantic nodes, AI agent chat logs, and vector embedding visualizations",
    category: "AI & ML",
    technologies: ["LangChain", "Python", "OpenAI API", "Vector Databases", "LangGraph Graph Flow"],
    department: "AI Agents & Intelligent Automation",
    shortDesc: "Futuristic agentic AI workbench utilizing LangGraph nodes to run recursive audit checks and tasks.",
    relatedService: "/services/ai-solutions",
    features: [
      "LangGraph node design routing multi-agent verification tasks.",
      "OpenAI text embedding search indexing context vector segments.",
      "Real-time chat execution log console updating node state streams."
    ]
  },
  {
    projectTitle: "Elara Reed Premium Personal Portfolio Website",
    src: "/gallery/software/wordpress-portfolio-site.png",
    alt: "Elara Reed Premium Personal Portfolio Website layout built by SkillForge Technology Erode showing artistic 3D geometries, modern typeface layouts, and filterable work galleries",
    category: "Software Stacks",
    technologies: ["WordPress", "PHP", "Framer Motion", "GSAP Animations", "Custom Design System"],
    department: "Creative Web Development",
    shortDesc: "Artistic web portfolio featuring interactive 3D assets, fluid motion animations, and content filters.",
    relatedService: "/services/wordpress-development",
    features: [
      "Artistic 3D canvas rendering using WebGL technologies.",
      "GSAP animation timelines orchestrating responsive page transitions.",
      "Dynamic portfolio project catalog filtering tags instantly."
    ]
  },
  {
    projectTitle: "ChatGPT Custom AI Assistant Integration Panel",
    src: "/gallery/saas-development/chatgpt-ai-chat-assistant.png",
    alt: "ChatGPT Custom AI Assistant Integration Panel developed by SkillForge Technology Erode showcasing user prompts, ChatGPT API chat flows, custom dashboard widgets, and sidebar histories",
    category: "AI & ML",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "SaaS Billing", "Pinecone Vector DB"],
    department: "Custom AI Solutions / SaaS",
    shortDesc: "Conversational custom AI chat assistant integration showing natural language querying and chat history storage.",
    relatedService: "/services/saas-development",
    features: [
      "ChatGPT API conversational memory pipelines storing dialogue history.",
      "Custom layout design presenting chat bubbles in a glassmorphic look.",
      "Semantic vector database index checks searching context database collections."
    ]
  },
  {
    projectTitle: "Aurelia Skincare & Cosmetics E-Commerce",
    src: "/gallery/web-development/luxe-skincare-cosmetics-store.png",
    alt: "Aurelia Skincare and Cosmetics E-Commerce website built by SkillForge Technology Erode showing minimalist design, luxury pastel rose-gold grids, cosmetics collections, and ingredients stories",
    category: "Software Stacks",
    technologies: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion", "Stripe API"],
    department: "Creative Web Development / E-Commerce",
    shortDesc: "Minimalist, high-conversion cosmetics and organic skincare e-commerce storefront with fluid interactions.",
    relatedService: "/services/web-development",
    features: [
      "High-fidelity visual grids rendering beauty cosmetic products and custom filters.",
      "Shopify Storefront API integration fetching dynamic inventories with custom cart counters.",
      "Framer Motion slide transitions creating a smooth, premium luxury shopping experience."
    ]
  },
  {
    projectTitle: "Aura Yoga & Wellness Sanctuary Hub",
    src: "/gallery/web-development/aura-wellness-sanctuary.png",
    alt: "Aura Yoga and Wellness Sanctuary Hub designed by SkillForge Technology Erode showcasing digital scheduling calendar widgets, upcoming wellness classes, and natural herbal product panels",
    category: "Software Stacks",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Calendly Integration"],
    department: "Custom Web Application / Health & Wellness",
    shortDesc: "Serene wellness sanctuary platform showcasing scheduling widgets, digital therapy bookings, and lifestyle resources.",
    relatedService: "/services/web-development",
    features: [
      "Interactive appointment scheduling grid showing real-time class booking availability.",
      "Pastel peach and sage green color theme customized for a relaxing digital wellness flow.",
      "Full mobile responsiveness supporting seamless navigation across all viewport screen sizes."
    ]
  },
  {
    projectTitle: "Quantum Cyber-Grid Developer Portfolio",
    src: "/gallery/web-development/quantum-studio-portfolio.png",
    alt: "Quantum Cyber-Grid Developer Portfolio website built by SkillForge Technology Erode showing glowing neon purple lines, 3D abstract grid sphere rendering, and dark slate layout modules",
    category: "Software Stacks",
    technologies: ["React", "Three.js", "WebGL", "GSAP Animations", "Tailwind CSS"],
    department: "Creative Web Development",
    shortDesc: "Dark-themed developer portfolio featuring 3D abstract grid spheres, glowing cyber lines, and smooth animations.",
    relatedService: "/services/web-development",
    features: [
      "Interactive 3D WebGL sphere geometry rendering in real-time using Three.js scripts.",
      "GSAP timeline orchestrating project grids on user mouse scroll actions.",
      "High-contrast dark-mode template utilizing neon purple and cyber blue color palettes."
    ]
  },
  {
    projectTitle: "Vortex Collaborative Task Management Dashboard",
    src: "/gallery/web-development/vortex-task-dashboard.png",
    alt: "Vortex Collaborative Task Management Dashboard developed by SkillForge Technology Erode showing teal glassmorphic task cards, project progress meters, and task activity feeds",
    category: "Software Stacks",
    technologies: ["Next.js", "TypeScript", "Dnd-kit", "Recharts", "Supabase Backend"],
    department: "SaaS Application Development",
    shortDesc: "Modern SaaS project board featuring interactive Kanban columns, performance charts, and team tracking.",
    relatedService: "/services/web-development",
    features: [
      "Drag-and-drop task card routing across Kanban boards via dnd-kit library hooks.",
      "Visual performance metrics and circular completion rings drawn dynamically with Recharts.",
      "Multi-user sync powered by Supabase channels for live team updates."
    ]
  },
  {
    projectTitle: "Terra Luxury Villa Travel & Reservation Platform",
    src: "/gallery/web-development/terrene-travel-villa.png",
    alt: "Terra Luxury Villa Travel and Reservation Platform built by SkillForge Technology Erode showing large clean typography, warm terracotta resort photo cards, and guest destination selector consoles",
    category: "Software Stacks",
    technologies: ["Next.js", "PostgreSQL", "Google Maps API", "Prisma ORM", "Tailwind CSS"],
    department: "Custom Web Development",
    shortDesc: "Earth-toned luxury villa listing and booking site featuring large typography and high-definition photo grids.",
    relatedService: "/services/web-development",
    features: [
      "Exquisite multi-column resort listing cards displaying pricing and reservation buttons.",
      "Interactive maps utilizing Google Maps SDK showing exact geographic villa pin coordinates.",
      "Premium earth-toned design palette featuring custom terracotta and warm beige highlights."
    ]
  },
  {
    projectTitle: "Couture Atelier Creative Designer Workspace",
    src: "/gallery/software-development/couture-atelier-workspace.png",
    alt: "Couture Atelier Creative Designer Workspace layout built by SkillForge Technology Erode showcasing premium fashion model catalog listings, textile inventory logs, and order book tables",
    category: "Software Stacks",
    technologies: ["React SPA", "Node.js", "Tailwind CSS", "Three.js WebGL", "PostgreSQL"],
    department: "Creative & Fashion Software Stacks",
    shortDesc: "Bespoke digital atelier management suite for fashion designers, featuring model portfolios and catalog orders.",
    relatedService: "/services/software-development",
    features: [
      "Interactive fashion model catalog visualization with fluid layout sliders.",
      "Real-time textile ordering and measurements inventory tracking sheets.",
      "Tailwind-styled dashboard optimizing order checkout and booking workflows."
    ]
  },
  {
    projectTitle: "Aegis Clinical Healthcare & Patient Workspace",
    src: "/gallery/software-development/healthcare-management-dashboard.png",
    alt: "Aegis Clinical Healthcare and Patient Workspace developed by SkillForge Technology Erode showcasing doctor patient metrics, appointment charts, and medical history feeds",
    category: "Software Stacks",
    technologies: ["React", "Laravel Framework", "MySQL Database", "Chart.js Charts", "WebSockets Sync"],
    department: "Healthcare Information Systems",
    shortDesc: "Clinical patient tracking system featuring doctors worklists, dynamic medical records, and scheduling calendars.",
    relatedService: "/services/software-development",
    features: [
      "Live medical workspace telemetry updating patient list metrics instantly.",
      "Interactive appointment calendar checking slot availability with minimal latency.",
      "Secure data columns masking sensitive patient medical history coordinates."
    ]
  },
  {
    projectTitle: "Cognitive AI Dialogue & Chat Integration",
    src: "/gallery/software-development/ai-chat-assistant-page.png",
    alt: "Cognitive AI Dialogue and Chat Integration created by SkillForge Technology Erode showcasing user prompt inputs, ChatGPT sidebar dialogue history logs, and vector query matches",
    category: "AI & ML",
    technologies: ["Next.js", "Python API", "OpenAI Embeddings", "SaaS Billing", "Pinecone DB"],
    department: "Custom AI Solutions & SaaS",
    shortDesc: "Advanced natural language chatting assistant featuring custom user prompts, chat history, and semantic retrieval.",
    relatedService: "/services/software-development",
    features: [
      "ChatGPT conversational memory pipelines indexing past dialogue logs.",
      "Sleek visual dashboard layout grouping prompts by AI models.",
      "Contextual vector search matching matching keywords against custom databases."
    ]
  },
  {
    projectTitle: "Malibu Luxury Real Estate Brokerage Portal",
    src: "/gallery/software-development/real-estate-listing-platform.png",
    alt: "Malibu Luxury Real Estate Brokerage Portal built by SkillForge Technology Erode showcasing visual listing grids, villa card lists, and real estate reservation buttons",
    category: "Software Stacks",
    technologies: ["React SPA", "PostgreSQL", "Google Maps SDK", "Tailwind CSS", "Prisma ORM"],
    department: "Custom Web Development",
    shortDesc: "Premium real estate showcase platform featuring large imagery, villa card grids, and interactive agent scheduling.",
    relatedService: "/services/software-development",
    features: [
      "Multi-column luxury villa listings showing price details and reserve actions.",
      "Custom geographic geofence search pins mapping locations via Google Maps.",
      "Responsive, SEO-optimized web templates designed for fast mobile loading."
    ]
  },
  {
    projectTitle: "Apex Mobile Banking & Card Wallet UI",
    src: "/gallery/software-development/mobile-banking-app.png",
    alt: "Apex Mobile Banking and Card Wallet UI developed by SkillForge Technology Erode showcasing credit card digital layout, active account statistics, and transfer forms",
    category: "Software Stacks",
    technologies: ["Flutter Framework", "Firebase Auth", "Stripe SDK", "Recharts", "Node.js API"],
    department: "Mobile Application Development",
    shortDesc: "Cross-platform banking application interface with secure biometric login, dynamic card widgets, and balance charts.",
    relatedService: "/services/software-development",
    features: [
      "Secure simulated credit card wallet UI displaying balance values.",
      "Interactive financial transactional telemetry logs showing spending categorizations.",
      "Biometric authentication flow templates securing online mobile transactions."
    ]
  },
  {
    projectTitle: "DevOps Pipeline Container Orchestration Console",
    src: "/gallery/software-development/devops-pipeline-console.png",
    alt: "DevOps Pipeline Container Orchestration Console created by SkillForge Technology Erode showcasing static builds compilation, pod telemetry graphs, and deploy status columns",
    category: "Software Stacks",
    technologies: ["AWS ECS", "Docker Containers", "Kubernetes", "GitHub Actions", "Datadog Logs"],
    department: "Cloud Operations & DevOps",
    shortDesc: "Automated software build runner showing container compilation status, deploy latency, and cluster health metrics.",
    relatedService: "/services/software-development",
    features: [
      "Real-time pipeline compilations monitoring staging to production deploys.",
      "Kubernetes cloud cluster pod tracking warning on memory leaks.",
      "Automated GitHub Actions workflow runners building static page assets."
    ]
  },
  {
    projectTitle: "Aurelia Dental Clinic Patient Hub",
    src: "/gallery/web-development/dentist-clinic-prototype.png",
    alt: "Aurelia Dental Clinic Patient Hub designed by SkillForge Technology Erode showcasing digital scheduling calendar widgets, treatment pages, and patient reviews",
    category: "Software Stacks",
    technologies: ["Next.js", "TypeScript", "React Calendar", "Tailwind CSS", "Framer Motion"],
    department: "Creative Web Development / Dental clinic",
    shortDesc: "High-conversion modern clinic landing page with integrated consultation schedules.",
    relatedService: "/services/web-development",
    features: [
      "Interactive calendar consultation schedule selecting dates and hour slots.",
      "Soft sage green and pearl gold premium palette offering a calming look.",
      "Responsive components adapting details perfectly for mobile viewing sizes."
    ]
  },
  {
    projectTitle: "Vertex Roofing Contractor Estimate Hub",
    src: "/gallery/web-development/roofing-contractor-prototype.png",
    alt: "Vertex Roofing Contractor Estimate Hub built by SkillForge Technology Erode showing bold slate design, instant quote selector, and project cards",
    category: "Software Stacks",
    technologies: ["Next.js", "React Form", "Tailwind CSS", "Lucide Icons", "Estimate Engine"],
    department: "Creative Web Development / Construction",
    shortDesc: "Bold contractor landing page integrating an automated instant estimation form.",
    relatedService: "/services/web-development",
    features: [
      "Multi-step estimate bidding form collecting roof sizes and materials choices.",
      "Slate and warm amber contrast highlights optimized for high lead conversions.",
      "Optimized image loading showcasing high-resolution project grids quickly."
    ]
  },
  {
    projectTitle: "AquaFlow Commercial Plumbing Dispatcher",
    src: "/gallery/web-development/plumbing-services-prototype.png",
    alt: "AquaFlow Commercial Plumbing Dispatcher designed by SkillForge Technology Erode showcasing emergency service scheduler and dispatcher modules",
    category: "Software Stacks",
    technologies: ["React", "Tailwind CSS", "Lucide Icons", "Node.js", "Real-Time DB"],
    department: "Creative Web Development / Maintenance",
    shortDesc: "Sleek plumbing service dispatch page featuring real-time schedule grids.",
    relatedService: "/services/web-development",
    features: [
      "High-contrast 24/7 hotline call-out section prioritizing emergency support.",
      "Dynamic booking date table with options selectors updating dispatch systems.",
      "Clean navy and copper corporate theme tailored for building client trust."
    ]
  },
  {
    projectTitle: "Apex Law Firm Legal Consultation Suites",
    src: "/gallery/web-development/law-firm-prototype.png",
    alt: "Apex Law Firm Legal Consultation Suites designed by SkillForge Technology Erode showcasing elite office study background, booking sidebar, and practice boxes",
    category: "Software Stacks",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Google Fonts"],
    department: "Creative Web Development / Professional Services",
    shortDesc: "Prestigious legal service website showcasing lawyer directory and meeting bookings.",
    relatedService: "/services/web-development",
    features: [
      "Secure legal booking sidebar scheduling meetings with target attorneys.",
      "Serif typography and royal navy theme conveying authority and prestige.",
      "Fully-accessible practice area cards built to meet WCAG design guidelines."
    ]
  },
  {
    projectTitle: "Crema Roast WordPress WooCommerce Storefront",
    src: "/gallery/wordpress-development/wordpress-coffee-woocommerce.png",
    alt: "Crema Roast WordPress WooCommerce Storefront developed by SkillForge Technology Erode showing espresso brown layouts, gourmet coffee bag grids, and subscription forms",
    category: "Software Stacks",
    technologies: ["WordPress", "WooCommerce", "PHP", "Tailwind CSS", "Stripe API"],
    department: "WordPress E-Commerce / CMS",
    shortDesc: "Artisanal coffee bean online storefront featuring warm custom subscription billing flows.",
    relatedService: "/services/wordpress-development",
    features: [
      "Custom WooCommerce subscription options integrating periodic coffee checkouts.",
      "Warm espresso theme with elegant product catalog hover card interactions.",
      "Database schema query optimisations speeding up WordPress checkout sequences."
    ]
  },
  {
    projectTitle: "Horizon Realty Premium Property Catalog",
    src: "/gallery/wordpress-development/wordpress-real-estate.png",
    alt: "Horizon Realty Premium Property Catalog developed by SkillForge Technology Erode showing clean light layout, property listings grid, and search filters",
    category: "Software Stacks",
    technologies: ["WordPress", "PHP", "ACF Pro", "MySQL", "Tailwind CSS", "Search Filter"],
    department: "WordPress E-Commerce / CMS",
    shortDesc: "Clean property listing portal featuring search filters, pricing, and agent cards.",
    relatedService: "/services/wordpress-development",
    features: [
      "ACF Pro custom fields rendering bedroom count, square footage, and prices.",
      "Search panel filtering properties dynamically based on local category indexes.",
      "Minimal light aesthetic utilizing luxury emerald accents driving user clicks."
    ]
  }
];
