export interface AgencyService {
  slug: string
  title: string
  tagline: string
  shortDesc: string
  longDesc: string
  icon: string
  features: string[]
  subServices: string[]
  techStack: string[]
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  projectType: "Technology Showcase" | "Engineering Demonstration" | "UI/UX Concept" | "Product Prototype" | "Concept Project"
  industry: string
  metric: string
  metricLabel: string
  summary: string
  challenge: string
  research: string
  planning: string
  architecture: string
  design: string
  development: string
  testing: string
  deployment: string
  result: string
  techStack: string[]
  gallery: string[]
  clientBenefits: string[]
  tags: string[]
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  industry: string
  tags: string[]
  problem: string
  solution: string
  outcome: string
  image: string
}

export interface CareerOpportunity {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  summary: string
  requirements: string[]
  benefits: string[]
}

export const agencyServices: AgencyService[] = [
  {
    slug: "software-development",
    title: "Software Development",
    tagline: "High-performance enterprise software & SaaS products built for scale.",
    shortDesc: "End-to-end custom software architecture, CRM/ERP integrations, desktop applications, and microservices API development designed to fit your unique operational workflows.",
    longDesc: "We design, build, and deploy premium enterprise-grade software and SaaS products. From microservices APIs to unified corporate ERP systems, our developers craft clean, maintainable code architectures that optimize your organizational workflows and support secure, high-throughput transactions.",
    icon: "Cpu",
    subServices: [
      "Custom Enterprise Software",
      "SaaS Product Engineering",
      "CRM & ERP Systems",
      "Desktop Applications",
      "Microservices & API Development",
      "Workflow Automation"
    ],
    features: [
      "Scalable REST/GraphQL API structures",
      "Secure multi-tenant database designs",
      "Cross-platform desktop deployments (Electron, Tauri)",
      "Legacy system modernization and migrations"
    ],
    techStack: ["Node.js", "Java", "Python", "Go", "PostgreSQL", "GraphQL", "Tauri"]
  },
  {
    slug: "enterprise-development",
    title: "Enterprise Development",
    tagline: "Bespoke high-performance core business platforms.",
    shortDesc: "Scalable architectural solutions, custom ERP modules, unified dashboards, and transaction processing engines designed for operational growth.",
    longDesc: "We help enterprises streamline operations by rebuilding legacy backbones, unifying disparate departments, and building secure database platforms that handle heavy loads with sub-second lag.",
    icon: "Layers",
    subServices: [
      "Enterprise ERP Platforms",
      "CRM Orchestration",
      "Database Modernization",
      "High-Throughput Middleware",
      "Enterprise Web Portals",
      "Distributed Architectures"
    ],
    features: [
      "Active Directory & SSO integration",
      "Advanced data migration pipelines",
      "24/7 post-deployment monitoring SLAs",
      "Compliance-ready data encryption (ISO 27001)"
    ],
    techStack: ["C# .NET Core", "Java Spring Boot", "PostgreSQL", "SQL Server", "Docker", "Kubernetes", "Azure"]
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    tagline: "Build, deploy, and scale multi-tenant SaaS products.",
    shortDesc: "Multi-tenant architectures, secure subscription billing pipelines, modular dashboard analytics, and clean REST/GraphQL APIs built to grow MRR.",
    longDesc: "From napkin sketch to global scale. We engineer premium multi-tenant SaaS systems, integrating robust billing configurations (Stripe, Adyen), usage-based metering, customized user roles, and beautiful analytical dashboards.",
    icon: "Cpu",
    subServices: [
      "Multi-Tenant Core Setup",
      "Subscription & Billing Flows",
      "Analytical Insights Dashboards",
      "Integrations Marketplace",
      "Usage Metering Systems",
      "SaaS API Architecting"
    ],
    features: [
      "Seamless Stripe Billing / Customer Portals",
      "Role-Based Access Control (RBAC)",
      "Real-time usage tracking infrastructure",
      "Clean component systems for fast feature rollouts"
    ],
    techStack: ["Next.js", "React", "Node.js", "GraphQL", "PostgreSQL", "Redis", "Stripe"]
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Beautiful, pixel-perfect, and ultra-fast web platforms.",
    shortDesc: "Next.js corporate websites, business applications, custom landing pages, E-Commerce platforms, and PWAs engineered for high conversion rates and perfect performance.",
    longDesc: "Your web presence is the storefront of your global brand. We build ultra-fast, responsive corporate websites, high-conversion landing pages, complex e-commerce engines, and Progressive Web Apps (PWAs) that load in milliseconds, leverage headless architectures, and drive organic conversions.",
    icon: "Globe",
    subServices: [
      "Corporate & Business Websites",
      "Custom Web Applications",
      "High-Conversion Landing Pages",
      "E-Commerce Solutions",
      "Progressive Web Apps (PWAs)",
      "Web Portal Maintenance"
    ],
    features: [
      "Headless CMS integration (Sanity, Contentful)",
      "Core Web Vitals optimized (100 Lighthouse goal)",
      "Fully responsive desktop-first layout adaptions",
      "Payment gateway integrations (Stripe, Adyen, PayPal)"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite", "Headless CMS", "Stripe"]
  },
  {
    slug: "mobile-development",
    title: "Mobile App Development",
    tagline: "Premium native & cross-platform applications.",
    shortDesc: "High-performance iOS and Android mobile solutions, MVP products, and enterprise applications powered by Flutter, React Native, and Swift.",
    longDesc: "We build intuitive, responsive mobile apps that clients love. Utilizing Flutter and React Native for efficient cross-platform execution, or Swift and Kotlin for deep hardware integrations, we help you launch feature-rich MVPs or scale secure enterprise mobile solutions.",
    icon: "Smartphone",
    subServices: [
      "Flutter Cross-Platform Development",
      "iOS Apps (Swift)",
      "Android Apps (Kotlin)",
      "Minimum Viable Products (MVP)",
      "Enterprise Mobile Portals",
      "App Store Optimization & Deployment"
    ],
    features: [
      "Biometric secure authentication integration",
      "Real-time notifications and geo-tracking",
      "Offline sync and local caching mechanisms",
      "Smooth micro-interactions and high-fidelity graphics"
    ],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Dart", "Firebase", "SQLite"]
  },
  {
    slug: "flutter-development",
    title: "Flutter Development",
    tagline: "Stunning, single-codebase iOS & Android mobile applications.",
    shortDesc: "Cross-platform mobile apps, native sensor integrations, local SQLite caching, and beautiful micro-animations using Google's UI toolkit.",
    longDesc: "Deliver a native-quality feel on both iOS and Android from a single codebase. We build custom Flutter apps with customized widget libraries, lightweight local caching, background sync mechanisms, and smooth transitions.",
    icon: "Smartphone",
    subServices: [
      "Flutter Multiplatform App Build",
      "Custom Widget Library Design",
      "Local SQLite & Realm Sync",
      "Device Hardware & BLE Integration",
      "App Store & Play Store Submissions",
      "Flutter Web & Desktop Builds"
    ],
    features: [
      "Ultra-smooth 60fps rendering layouts",
      "Offline data persistence protocols",
      "Biometric and keychain security parameters",
      "Google Maps and Geolocation APIs"
    ],
    techStack: ["Flutter", "Dart", "Firebase", "SQLite", "Realm", "REST APIs", "BLoC / Provider"]
  },
  {
    slug: "react-development",
    title: "React Development",
    tagline: "Fast, modular, and dynamic front-end web systems.",
    shortDesc: "State-managed web applications, custom component libraries, virtual DOM optimizations, and responsive admin dashboard panels.",
    longDesc: "Harness the full power of React. We engineer component-driven user interfaces, complex state management architectures (Redux, Zustand), and optimize rendering pathways to ensure lag-free interactions.",
    icon: "Code",
    subServices: [
      "React Single Page Apps (SPA)",
      "SaaS Dashboard Front-Ends",
      "State Management Orchestration",
      "React Component Library Engineering",
      "Next.js Web Systems",
      "Performance Auditing & Fixes"
    ],
    features: [
      "Zustand / Redux Toolkit state configurations",
      "Modular code splitting and bundle optimizing",
      "Rigid TypeScript type protections",
      "High-fidelity micro-interactions and animations"
    ],
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Zustand", "Framer Motion"]
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    tagline: "Scalable corporate WordPress & WooCommerce storefronts.",
    shortDesc: "Custom WordPress plugin development, bespoke themes, WooCommerce shops, performance optimizations, and site migrations.",
    longDesc: "Get the content flexibility of WordPress paired with enterprise-level security and loading speeds. We develop custom WordPress themes and plugins from scratch, build WooCommerce setups, and optimize database architectures to keep pages loading instantly.",
    icon: "Code",
    subServices: [
      "Bespoke Theme Development",
      "Custom Plugin Engineering",
      "WooCommerce E-Commerce Stores",
      "Speed & Core Web Vitals Optimization",
      "Secure Hosting Migrations",
      "API & CRM Integrations"
    ],
    features: [
      "Lightweight custom block Gutenberg integrations",
      "WP Rest API and headless setups",
      "Database cleaning and caching setups",
      "Robust malware scans and firewall parameters"
    ],
    techStack: ["WordPress", "PHP", "MySQL", "WooCommerce", "ACF Pro", "JavaScript", "Tailwind CSS"]
  },
  {
    slug: "php-development",
    title: "PHP & Laravel Development",
    tagline: "Robust backend engines & modern Laravel platforms.",
    shortDesc: "Custom admin portals, secure database APIs, CRM integrations, and ERP management systems built on Laravel.",
    longDesc: "We build secure, robust backend systems and administrative platforms using Laravel. Our PHP engineering team writes PSR-compliant code, structures reliable relational databases, and builds secure APIs to support your business portals.",
    icon: "Layers",
    subServices: [
      "Laravel Custom Web Applications",
      "Admin Control Panels & Portals",
      "RESTful API Development",
      "CRM & ERP Custom Systems",
      "Database Refactoring & Optimization",
      "Payment & SaaS Billing Integrations"
    ],
    features: [
      "MVC clean code conventions and testing (Pest/PHPUnit)",
      "Secure token-based auth (Sanctum/Passport)",
      "Queue queue-job queues for asynchronous tasks",
      "Optimized Eloquent queries and SQL indexes"
    ],
    techStack: ["PHP", "Laravel", "MySQL", "Redis", "Docker", "REST API", "Tailwind CSS"]
  },
  {
    slug: "dotnet-development",
    title: ".NET Development",
    tagline: "Enterprise-grade backend architectures by Microsoft.",
    shortDesc: "High-performance ASP.NET Core web systems, MVC portals, Blazor applications, and secure Azure integrations.",
    longDesc: "Leverage Microsoft's flagship technology stack for your enterprise. We engineer ASP.NET Core microservices, MVC web portals, interactive Blazor client dashboards, and secure integrations with Azure Active Directory.",
    icon: "ShieldAlert",
    subServices: [
      "ASP.NET Core Web Applications",
      "Blazor Interactive Dashboards",
      "MVC Enterprise Management Portals",
      "Secure SQL Server Databases",
      "Azure Enterprise Cloud Integrations",
      "WPF & WinForms Modernizations"
    ],
    features: [
      "Clean architecture with dependency injection",
      "Entity Framework Core query optimization",
      "Highly secure JWT token authorizations",
      "Asynchronous background worker services"
    ],
    techStack: ["C#", ".NET Core", "ASP.NET Core", "SQL Server", "Azure", "Entity Framework", "Blazor"]
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    tagline: "Premium product design systems & prototypes.",
    shortDesc: "Stunning user interfaces, modern SaaS dashboard wireframes, mobile app interactions, and unified Figma design systems.",
    longDesc: "We design websites and apps that are as intuitive to use as they are beautiful. From rapid wireframing to high-fidelity interactive prototypes in Figma and comprehensive design systems, we focus on user-centric paths that optimize conversion rates.",
    icon: "Layout",
    subServices: [
      "SaaS Dashboard & Interface Design",
      "Mobile App UI/UX Layouts",
      "Interactive Wireframing & User Flows",
      "Figma Design Systems Creation",
      "High-Fidelity Interactive Prototypes",
      "A/B Testing & Usability Audits"
    ],
    features: [
      "Custom components design library in Figma",
      "Responsive layout grids for all break-points",
      "Micro-animations specs and interactive paths",
      "High contrast colors and WCAG accessibility standards"
    ],
    techStack: ["Figma", "Adobe CC", "Framer", "Prototyping", "Design Systems", "Usability Testing"]
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    tagline: "Intelligent AI agents & custom LLM integrations.",
    shortDesc: "Empower your workflows with custom chatbots, AI agents, document parsing, OCR pipelines, computer vision systems, and GPT integrations.",
    longDesc: "Supercharge your business efficiency with modern Artificial Intelligence. We build custom retrieval-augmented generation (RAG) models, automated document processing (OCR), computer vision pipelines (YOLO, OpenCV), and orchestrate intelligent AI agents that automate complex tasks.",
    icon: "Brain",
    subServices: [
      "AI Agents & Copilots",
      "Conversational Chatbots",
      "Document AI & Intelligent OCR",
      "Computer Vision & Object Detection",
      "LLM & GPT Integrations",
      "Predictive Analytics Models"
    ],
    features: [
      "Custom LLM fine-tuning and RAG pipelines",
      "High-accuracy camera object/face classification",
      "Automated PDF invoice data extracting models",
      "Secure hosting of private data for enterprise compliance"
    ],
    techStack: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI", "Hugging Face", "OpenCV"]
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Secure, reliable, and automated infrastructure deployment.",
    shortDesc: "AWS/Azure cloud architecture, Docker and Kubernetes container orchestration, automated CI/CD pipelines, and cloud migrations.",
    longDesc: "We keep your applications online 24/7/355. Our DevOps engineers automate infrastructure provisioning via Terraform, manage secure container systems with Kubernetes, build automated testing/delivery pipelines, and execute seamless cloud migrations.",
    icon: "Cloud",
    subServices: [
      "AWS / Azure / GCP Architectures",
      "Docker & Kubernetes Containerization",
      "CI/CD Pipeline Automation",
      "Infrastructure as Code (IaC)",
      "24/7 Infrastructure Monitoring",
      "Seamless Cloud Migrations"
    ],
    features: [
      "Zero-downtime rolling updates execution",
      "Robust firewalls and secure VPC parameters",
      "Automated server resource autoscaling",
      "Cost-optimization audits for cloud expenditures"
    ],
    techStack: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"]
  },
  {
    slug: "seo-marketing",
    title: "SEO & Digital Marketing",
    tagline: "Drive organic traffic & search engine dominance.",
    shortDesc: "Technical and international SEO campaigns, local optimization, Google and Meta Ads, and comprehensive web analytics.",
    longDesc: "Rank #1 for your target industry search keywords globally. We deploy enterprise-grade search engine optimization (SEO), design custom schema metadata schemas, perform site audits, and manage high-ROI Google and Meta advertising campaigns to maximize inquiries.",
    icon: "TrendingUp",
    subServices: [
      "Technical & Core Web Vitals Audits",
      "International SEO Campaigns",
      "Search Engine Schema Implementation",
      "Google & Meta Paid Ad Management",
      "SEO Content Marketing",
      "Analytics & Conversion Audits"
    ],
    features: [
      "Advanced structured JSON-LD schema generation",
      "Multilingual translation alternate tags setups",
      "High-converting landing page optimization",
      "Accurate lead-attribution tracking models"
    ],
    techStack: ["Google Analytics", "GTM", "SEMrush", "Ahrefs", "Google Ads", "Meta Business Manager"]
  },
  {
    slug: "iot-embedded",
    title: "IoT & Embedded Systems",
    tagline: "Hardware prototyping, custom PCBs & firmware engineering.",
    shortDesc: "Industrial IoT microcontrollers, STM32 and ESP32 programming, custom schematics, PCB routing, Zephyr RTOS firmware, and smart device engineering.",
    longDesc: "Bring physical hardware to life. We engineer custom schematics, layout multi-layer printed circuit boards (PCBs), write highly optimized firmware in C/C++ or Zephyr RTOS, and integrate wireless protocols (MQTT, BLE, LoRa) to connect your devices to the cloud.",
    icon: "Activity",
    subServices: [
      "ESP32 & STM32 Firmware Programming",
      "Custom Schematic Capture & Multi-layer PCB Layout",
      "Industrial IoT (IIoT) Sensor Networks",
      "Zephyr RTOS & FreeRTOS Architectures",
      "Wireless Protocols Integration (MQTT, BLE, LoRaWAN)",
      "Smart Device Casing & Prototyping"
    ],
    features: [
      "Altium Designer & EasyEDA schematic capture",
      "Power consumption optimization for batteries",
      "Secure over-the-air (OTA) firmware update pathways",
      "Signal integrity and EMI noise testing compliance"
    ],
    techStack: ["Embedded C/C++", "STM32", "ESP32", "Zephyr RTOS", "Altium", "Proteus", "MQTT", "BLE"]
  },
  {
    slug: "real-estate-creative",
    title: "Real Estate Creative Services",
    tagline: "Premium photo editing, staging & property marketing assets.",
    shortDesc: "Transform residential and commercial property assets with high-end HDR photo blending, virtual home staging, day-to-dusk sky conversions, and 2D/3D floor plans.",
    longDesc: "Accelerate property listings and maximize sale valuations. Far different from software engineering, our creative media division employs professional graphic editors to edit HDR photos, digitally place furniture inside vacant rooms, replace gray overcast skies, and redraw clean floor plans for real estate agents worldwide.",
    icon: "Home",
    subServices: [
      "HDR Real Estate Photo Blending",
      "Virtual Home Staging (Furniture Insertion)",
      "Overcast Sky to Dusk Replacement",
      "2D & 3D Floor Plan Redrawing",
      "Object & Powerline Removal",
      "Virtual Renovation & Remodeling",
      "Property Marketing Brochures & Layouts"
    ],
    features: [
      "24-hour turnaround guarantees for listings",
      "Photorealistic 3D furniture matching modern trends",
      "Perfect lighting correction & color balancing",
      "High-resolution vector assets for print brochures"
    ],
    techStack: ["Adobe Photoshop", "Lightroom", "3ds Max", "AutoCAD", "V-Ray", "Illustrator"]
  }
]

export const agencyCaseStudies: CaseStudy[] = [
  {
    id: "ai-logistics",
    title: "AI-Powered Fleet Route Optimization Platform",
    client: "TransitVelo International",
    projectType: "Technology Showcase",
    industry: "Logistics & Supply Chain",
    metric: "28%",
    metricLabel: "Reduction in Fuel Costs",
    summary: "Built a customized route orchestration engine using integrated AI agents and Google Cloud mapping pipelines to coordinate 400+ vehicles.",
    challenge: "TransitVelo was suffering from skyrocketing fuel costs and manual dispatch delays due to legacy routing systems that couldn't adapt to live traffic congestion.",
    research: "We analyzed 6 months of GPS tracking logs and dispatch sheets, uncovering that 35% of routes had redundant paths and that drivers frequently encountered sudden urban blocks.",
    planning: "Our solution design architects planned a serverless routing scheduler that isolates scheduling requests from live telemetry data streams, guaranteeing high throughput.",
    architecture: "Designed a multi-layered microservices system utilizing an API gateway, a Redis event queue, and dynamic Python optimization services.",
    design: "Created an interactive dispatcher dashboard with high contrast metrics, live map clusters, and visual progress grids that simplify alert resolutions in three clicks.",
    development: "Written with a Next.js frontend, an ASP.NET Core microservices backend, and custom Python AI models that dynamically re-order route waypoints using real-time coordinates.",
    testing: "Enforced 90% unit test coverage for optimization algorithms and ran automated end-to-end simulation suites using Cypress.",
    deployment: "Deployed using Docker containers on AWS ECS with automated GitHub Actions. Setting up Prometheus and Grafana for server alerts.",
    result: "Slashed dispatcher planning times from 2 hours to 8 minutes, reduced fleet fuel expenses by 28%, and improved customer package delivery window compliance to 98.4%.",
    techStack: ["Next.js", "React", "Python", "ASP.NET Core", "Redis", "Docker", "AWS ECS"],
    gallery: ["/gallery/software-development/devops-pipeline-console.png", "/gallery/software-development/saas_dashboard_mockup.png"],
    clientBenefits: ["Sub-second route re-optimization", "Comprehensive dashboard analytics", "Reduced fleet overhead costs"],
    tags: ["AI solutions", "Web Development", "Cloud & DevOps"]
  },
  {
    id: "smart-grid-iot",
    title: "Enterprise IoT Industrial Energy Management",
    client: "Solarex Manufacturers",
    projectType: "Engineering Demonstration",
    industry: "Renewable Energy & Manufacturing",
    metric: "1.8M",
    metricLabel: "Annual Energy Savings ($)",
    summary: "Engineered a custom STM32 hardware grid and AWS cloud dashboard to track power consumption and prevent heavy machinery motor failures.",
    challenge: "Unplanned factory downtime from machine overloads cost Solarex thousands of dollars hourly, compounded by a lack of telemetry data on sensor nodes.",
    research: "Our hardware architects audited factory subpanels, identifying critical EMF spikes and designing sensor placements to capture thermal and current telemetry.",
    planning: "Planned a hybrid edge-cloud telemetry pipeline. Edge nodes collect high-frequency current sensors and summarize metrics to reduce cloud bandwidth.",
    architecture: "Designed a secure IoT topology: STM32 microcontroller nodes connect via RS-485 to an ESP32 gateway, which acts as the MQTT publisher to AWS IoT Core.",
    design: "Designed a multi-layer custom PCB using Altium Designer and built a real-time React analytics control center dashboard with secure authentication parameters.",
    development: "Developed firmware in Embedded C using Zephyr RTOS on STM32 microchips, transmitting packet streams via MQTT to an AWS IoT Core database.",
    testing: "Executed thermal chamber debugging for edge PCBs, verified ESP32 EMI shields, and tested firmware memory leaks under a 72-hour continuous run.",
    deployment: "Connected telemetry to an AWS Timestream database, managing the system infrastructure via Terraform and setting up instant alert configurations.",
    result: "Predicted motor overloads 4 hours before failure, eliminated critical downtime, and reduced total manufacturing energy consumption by 18%.",
    techStack: ["STM32", "ESP32", "Embedded C", "Zephyr RTOS", "AWS IoT Core", "React", "Terraform"],
    gallery: ["/gallery/iot/iot_board_mockup.png", "/gallery/iot/smart-irrigation-system-mobile-dashboard-iot.png"],
    clientBenefits: ["Real-time electrical signature analysis", "Predictive maintenance alerts", "Remote equipment shutdown safety features"],
    tags: ["IoT & Embedded", "Cloud & DevOps", "Web Development"]
  },
  {
    id: "virtual-staging-realestate",
    title: "Scale Virtual Staging Platform for Global Real Estate",
    client: "Apex Properties Group",
    projectType: "UI/UX Concept",
    industry: "Real Estate Marketing",
    metric: "3.5x",
    metricLabel: "Listing Engagement Boost",
    summary: "Designed an automated editing pipeline for property photo editing, digital staging, and sky replacement with a 24-hour turnaround.",
    challenge: "Apex Properties struggled with long listing delays while waiting for physical staging and manual, inconsistent local photo editing services.",
    research: "Evaluated 1,000+ real estate photos to map out lighting adjustments, sky replacement criteria, and standard 3D furniture orientations.",
    planning: "Defined a split workflow: Web portals handle image uploads, queue them into background tasks, and distribute them to creative editors with automated quality control checks.",
    architecture: "Architected a secure image routing and processing platform using Laravel, utilizing AWS S3 buckets and CloudFront distributions for raw asset caching.",
    design: "Established a creative styling system for HDR blends, overcast sky conversions, and clean day-to-dusk visual transitions.",
    development: "Created a dedicated web portal using Laravel and Vue.js where agents upload photos, select staging themes (Modern, Industrial, Scandinavian), and receive high-res assets.",
    testing: "Conducted automated image loading speed checks, optimized Vue layouts for layout shifts, and verified checkout flow compatibility.",
    deployment: "Hosted on AWS with secure CloudFront distribution, optimizing loading speeds for raw image assets.",
    result: "Delivered 10,000+ edited images annually with a 99.1% satisfaction rate, driving a 3.5x increase in online listing engagement and saving thousands in staging costs.",
    techStack: ["Laravel", "Vue.js", "MySQL", "AWS S3", "CloudFront", "Tailwind CSS"],
    gallery: ["/gallery/software-development/real-estate-listing-platform.png", "/gallery/software-development/couture-atelier-workspace.png"],
    clientBenefits: ["Fast 24-hour turnaround", "Granular QA editing console", "Lower cost than physical staging"],
    tags: ["Real Estate Creative Services", "Web Development"]
  },
  {
    id: "medvitals-mobile",
    title: "MedVitals Cross-Platform Mobile Suite",
    client: "MedVitals Systems",
    projectType: "Product Prototype",
    industry: "Healthcare & Life Sciences",
    metric: "99.9%",
    metricLabel: "Telemetry Sync Success Rate",
    summary: "Built a secure Flutter app with custom BLE plugins that connects to wearable sensors and encrypts data streams locally.",
    challenge: "Patients lacked a secure and reliable way to sync blood sugar and heart rate data from wearable sensors to their physician portals without connection dropouts.",
    research: "We audited Bluetooth packet queues, identifying dropouts during high-frequency sync bursts and designing a local SQLite retry buffer.",
    planning: "Designed a secure mobile client database model and a token-authenticated API gateway to isolate patient telemetry.",
    architecture: "Formulated a secure local-first architecture: mobile app caches metrics to local encrypted SQLite, syncing via background workers whenever secure TLS is available.",
    design: "Constructed high-contrast, accessibility-compliant user interfaces in Figma following WCAG guidelines.",
    development: "Compiled a cross-platform Flutter application with custom BLE integration plugins and background sync workers.",
    testing: "Ran unit test suites on Dart models, performed automated BLE pairing tests, and validated patient dataset encryption layers.",
    deployment: "Automated distribution profiles to App Store Connect and Google Play Console using Fastlane pipelines.",
    result: "Successfully synced 25,000+ active wearers with 99.9% transmission reliability, reducing physician data collection overhead by 40%.",
    techStack: ["Flutter", "Dart", "SQLite", "Firebase", "BLE Sensors"],
    gallery: ["/gallery/software-development/healthcare-management-dashboard.png", "/gallery/software-development/ai-chat-assistant-page.png"],
    clientBenefits: ["Instant real-time vitals tracking", "Offline caching capability", "Secure physician data share portal"],
    tags: ["Mobile App Development", "IoT & Embedded"]
  },
  {
    id: "velofintech-headless",
    title: "VeloFinTech Headless PWA Platform",
    client: "VeloFinTech",
    projectType: "Concept Project",
    industry: "FinTech & Banking",
    metric: "350ms",
    metricLabel: "Average Page Load Time",
    summary: "Designed and engineered a headless Next.js PWA, using static page generation and Stripe payment integrations.",
    challenge: "A financial portal suffered from high mobile bounce rates due to a slow-loading, non-responsive legacy interface.",
    research: "Audited web vitals, identifying that legacy SQL queries and heavy script files delayed time-to-interactive by over 4 seconds.",
    planning: "Planned a serverless architecture using ISR (Incremental Static Regeneration) on Next.js to cache static assets at edge nodes.",
    architecture: "Architected a headless web solution using Next.js client modules calling unified GraphQL endpoints, bypassing legacy backend render overhead.",
    design: "Designed a clean, dark-mode financial dashboard layout focusing on layout shifts (CLS) mitigation.",
    development: "Built a fully type-safe Next.js platform using TypeScript and GraphQL APIs to fetch transaction feeds.",
    testing: "Conducted automated Lighthouse checks, verified accessibility compliance, and tested Stripe payment webhooks.",
    deployment: "Deployed to Vercel edge networks, routing API requests through a secure Cloudflare gateway.",
    result: "Reduced page load speeds from 4.2s to 350ms, resulting in a 45% increase in mobile credit applications.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Vercel", "Stripe"],
    gallery: ["/gallery/software-development/mobile-banking-app.png", "/gallery/software-development/enterprise-erp-dashboard.png"],
    clientBenefits: ["Ultra-fast page loads", "Enhanced mobile responsiveness", "Stripe payment compliance integration"],
    tags: ["Web Development", "UI/UX Design"]
  },
  {
    id: "warehouse-automation",
    title: "Warehouse Automation IoT Gateway",
    client: "Warehouse Logix",
    projectType: "Technology Showcase",
    industry: "Logistics & Supply Chain",
    metric: "22%",
    metricLabel: "Increase in Routing Efficiency",
    summary: "Designed a custom multi-sensor ESP32 PCB tracking node utilizing LoRaWAN for long-range, low-power data transmission.",
    challenge: "Forklift and parcel tracking inside a 50,000 sq ft warehouse was failing due to poor Wi-Fi coverage and metallic obstructions.",
    research: "Conducted RF signal audits, discovering that Wi-Fi signals suffered heavy attenuation through metal racks.",
    planning: "Engineered a LoRaWAN topology with local gateways to transmit sensor telemetry at sub-GHz frequencies.",
    architecture: "Formulated a low-power star network where custom ESP32 tracker tags publish coordinate bursts to local LoRa gateways connected to AWS IoT Core.",
    design: "Designed a multi-layer custom PCB using Altium Designer, ensuring appropriate impedance matching and power rails.",
    development: "Compiled optimized C++ firmware on ESP32 microchips, employing low-power sleep loops to preserve battery life.",
    testing: "Conducted drop testing on node casing, verified battery drain schedules, and tested coordinate tracking algorithms.",
    deployment: "Provisioned gateways on AWS IoT Core using Terraform, tracking telemetry coordinates in real time.",
    result: "Eliminated tracking dead zones entirely and increased inventory routing efficiency by 22%.",
    techStack: ["ESP32", "Embedded C++", "Altium", "LoRaWAN", "AWS IoT Core"],
    gallery: ["/gallery/iot/ai-smart-waste-monitoring-system-dashboard.png", "/gallery/iot/iot_board_mockup.png"],
    clientBenefits: ["Complete RF coverage in warehouses", "Battery life up to 18 months", "Seamless AWS IoT backend synchronization"],
    tags: ["IoT & Embedded", "Cloud & DevOps"]
  }
]

export const agencyPortfolio: PortfolioItem[] = []

export const agencyIndustries = [
  {
    name: "FinTech & Banking",
    desc: "Secure, compliant web applications, custom API integrations, and robust payment gateways designed for financial institutions.",
    icon: "ShieldAlert"
  },
  {
    name: "Healthcare & Life Sciences",
    desc: "HIPAA-compliant client portals, cross-platform mobile trackers, and AI-enabled document parsing.",
    icon: "Activity"
  },
  {
    name: "E-Commerce & Retail",
    desc: "Headless e-commerce stores, WooCommerce setups, high-conversion landing pages, and Stripe checkout systems.",
    icon: "Globe"
  },
  {
    name: "Logistics & Supply Chain",
    desc: "Real-time GPS tracking gateways, IoT sensor boards, and route optimization AI agent platforms.",
    icon: "TrendingUp"
  },
  {
    name: "Real Estate Marketing",
    desc: "Visual HDR blending, day-to-dusk sky replacement, virtual staging, and redrawn floor plans.",
    icon: "Home"
  },
  {
    name: "EdTech & Learning Platforms",
    desc: "Interactive dashboards, corporate learning portals, custom LMS setups, and automated progress analytics.",
    icon: "Layout"
  }
]

export const agencyCareers: CareerOpportunity[] = [
  {
    id: "sr-backend",
    title: "Senior Backend Engineer (.NET / Core)",
    department: "Engineering",
    location: "Remote / Hybrid (New York / Amsterdam / London)",
    type: "Full-Time",
    experience: "5+ Years",
    summary: "We are seeking a Senior Backend Engineer to lead the design of microservice APIs, enterprise billing engines, and Azure cloud integrations.",
    requirements: [
      "Strong proficiency in C#, .NET Core, ASP.NET Core, and Entity Framework",
      "Experience designing relational databases (SQL Server, PostgreSQL) and Redis caching layers",
      "Proficiency with Docker, Kubernetes, and automated CI/CD configurations",
      "Solid understanding of software design patterns and microservices architecture"
    ],
    benefits: [
      "Competitive global salary packages + annual performative bonuses",
      "Comprehensive medical, dental, and vision insurance coverage plans",
      "Flexible working hours and annual educational training budgets",
      "Home office setup equipment allowance ($2,000)"
    ]
  },
  {
    id: "lead-ui-designer",
    title: "Lead UI / UX Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "6+ Years",
    summary: "Join us to lead design systems, interactive wireframe prototypes, and style layouts for enterprise SaaS client platforms.",
    requirements: [
      "Stunning portfolio showcasing modern, minimal SaaS UI styling and design systems",
      "Complete expertise in Figma (components, autolayout, responsive properties)",
      "Strong understanding of user testing, conversion optimization, and WCAG accessibility standards",
      "Excellent client-facing presentation and verbal coordination skills"
    ],
    benefits: [
      "Work from anywhere in the world on a fully remote contract",
      "Paid annual leaves (28 days) + local public holidays",
      "Bi-annual team retreats in tropical locations",
      "Figma enterprise license and access to premier software suites"
    ]
  }
]
