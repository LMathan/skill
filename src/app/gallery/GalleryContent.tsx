"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Brain, Layers, Laptop, Eye, X, ExternalLink, Cloud } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Prototype {
  id: string
  title: string
  category: "Web Platforms" | "Mobile Applications" | "IoT Hardware" | "Cloud & DevOps"
  image: string
  tags: string[]
  description: string
  caseStudyId?: string
}

const prototypesList: Prototype[] = [
  // WEB PLATFORMS
  {
    id: "saas-analytics",
    title: "SaaS Analytics Dashboard",
    category: "Web Platforms",
    image: "/gallery/software-development/saas_dashboard_mockup.png",
    tags: ["SaaS", "Analytics", "React"],
    description: "Real-time corporate performance intelligence dashboard.",
    caseStudyId: "ai-logistics"
  },
  {
    id: "law-firm",
    title: "Apex Law Firm Portal",
    category: "Web Platforms",
    image: "/gallery/web-development/law-firm-prototype.png",
    tags: ["Legal", "Next.js", "Web App"],
    description: "Corporate law site with case planners and document managers."
  },
  {
    id: "healthcare-erp",
    title: "Enterprise Healthcare ERP",
    category: "Web Platforms",
    image: "/gallery/enterprise-development/enterprise_erp_mockup.png",
    tags: ["Healthcare", "ERP", "React"],
    description: "Smart medical shifts and laboratory telemetry console."
  },
  {
    id: "ai-assistant",
    title: "AI Chat Assistant Studio",
    category: "Web Platforms",
    image: "/gallery/ai-solutions/ai_agent_mockup.jpeg",
    tags: ["AI solutions", "LLM", "Next.js"],
    description: "Intelligent support assistant with RAG document stores."
  },
  {
    id: "roofing-contractor",
    title: "Vertex Roofing Estimate Hub",
    category: "Web Platforms",
    image: "/gallery/web-development/roofing-contractor-prototype.png",
    tags: ["Contractor", "Tailwind CSS", "Next.js"],
    description: "High-converting contractor site with instant calculation tools.",
    caseStudyId: "virtual-staging-realestate"
  },
  {
    id: "plumbing-dispatcher",
    title: "AquaFlow Plumbing Dispatcher",
    category: "Web Platforms",
    image: "/gallery/web-development/plumbing-services-prototype.png",
    tags: ["Plumbing", "Web App", "Real-Time"],
    description: "Commercial technician scheduling and dispatcher hubs."
  },
  {
    id: "aura-wellness",
    title: "Aura Wellness Sanctuary",
    category: "Web Platforms",
    image: "/gallery/web-development/aura-wellness-sanctuary.png",
    tags: ["Wellness", "Web Design", "Creative"],
    description: "Aesthetic spa retreat booking portal with smooth fades."
  },
  {
    id: "dentist-clinic",
    title: "Dentist Clinic Portal",
    category: "Web Platforms",
    image: "/gallery/web-development/dentist-clinic-prototype.png",
    tags: ["Healthcare", "Web App", "Dental"],
    description: "Dental appointment schedules and visual service charts."
  },
  {
    id: "luxe-skincare",
    title: "Luxe Skincare Store",
    category: "Web Platforms",
    image: "/gallery/web-development/luxe-skincare-cosmetics-store.png",
    tags: ["E-Commerce", "Cosmetics", "Shopify"],
    description: "Premium product grid showcasing skin wellness blends."
  },
  {
    id: "quantum-portfolio",
    title: "Quantum Studio Portfolio",
    category: "Web Platforms",
    image: "/gallery/web-development/quantum-studio-portfolio.png",
    tags: ["Creative Portfolio", "Web Design", "Vue.js"],
    description: "Futuristic creative design agency showcase workspace."
  },
  {
    id: "terrene-travel",
    title: "Terrene Travel Villa",
    category: "Web Platforms",
    image: "/gallery/web-development/terrene-travel-villa.png",
    tags: ["Travel", "Real Estate", "Next.js"],
    description: "Luxury travel advisor villa rentals scheduling map."
  },
  {
    id: "vortex-dashboard",
    title: "Vortex Task Dashboard",
    category: "Web Platforms",
    image: "/gallery/web-development/vortex-task-dashboard.png",
    tags: ["SaaS", "Dashboard", "React"],
    description: "Team workflows, priority lists, and task telemetry."
  },
  {
    id: "web-landing",
    title: "Product Landing Mockup",
    category: "Web Platforms",
    image: "/gallery/web-development/web_landing_mockup.png",
    tags: ["Marketing", "Web App", "Landing Page"],
    description: "Clean product showcase and pricing grid presentation."
  },
  {
    id: "laravel-api-mockup",
    title: "Laravel Rest API Console",
    category: "Web Platforms",
    image: "/gallery/php-development/php_laravel_api_mockup.png",
    tags: ["PHP", "Laravel", "API"],
    description: "Multi-tenant routing database and JWT authorization logic."
  },
  {
    id: "ui-ux-design-board",
    title: "Corporate Design System Layout",
    category: "Web Platforms",
    image: "/gallery/ui-ux-design/design_board_mockup.png",
    tags: ["UI/UX", "Figma", "Design Deck"],
    description: "Global color tokens, responsive structures, and font grids."
  },
  {
    id: "figma-prototyping-canvas",
    title: "Interactive Prototyping Board",
    category: "Web Platforms",
    image: "/gallery/ui-ux-design/figma_design_mockup.png",
    tags: ["UI/UX", "Figma", "Prototyping"],
    description: "Interactive mockups mapping click triggers and vector assets."
  },
  {
    id: "real-estate-mls-portal",
    title: "Real Estate MLS Catalog",
    category: "Web Platforms",
    image: "/gallery/software-development/real-estate-listing-platform.png",
    tags: ["Real Estate", "Web App", "MLS Listing"],
    description: "Property filters, interactive maps, and agent scheduling grids."
  },
  {
    id: "healthcare-erp-dashboard",
    title: "Healthcare ERP Patient Board",
    category: "Web Platforms",
    image: "/gallery/software-development/healthcare-management-dashboard.png",
    tags: ["Healthcare", "ERP", "React"],
    description: "Unified dashboard coordinating patient queues and laboratory diagnostics."
  },
  {
    id: "enterprise-erp-dashboard",
    title: "Enterprise Core ERP Interface",
    category: "Web Platforms",
    image: "/gallery/software-development/enterprise-erp-dashboard.png",
    tags: ["ERP", "SaaS", "Enterprise"],
    description: "Corporate inventory, vendor workflows, and transaction logs."
  },
  {
    id: "ai-chat-assistant-page",
    title: "AI Chat Assistant Portal",
    category: "Web Platforms",
    image: "/gallery/software-development/ai-chat-assistant-page.png",
    tags: ["AI solutions", "Web App", "LLM Chat"],
    description: "Clean chatbot interface with prompt templates and memory buffers."
  },
  {
    id: "couture-atelier-workspace",
    title: "Couture Atelier Web Deck",
    category: "Web Platforms",
    image: "/gallery/software-development/couture-atelier-workspace.png",
    tags: ["Creative", "E-Commerce", "Shopify"],
    description: "Design-centric showcase for high-fashion boutique collections."
  },
  {
    id: "saas-business-platform",
    title: "SaaS Business Hub landing",
    category: "Web Platforms",
    image: "/gallery/saas-development/saas-business-platform.png",
    tags: ["SaaS", "Tailwind", "Next.js"],
    description: "Marketing landing page with pricing calculator and feature lists."
  },
  {
    id: "ai-agentic-dashboard",
    title: "AI Agentic Execution Console",
    category: "Web Platforms",
    image: "/gallery/software/ai-agentic-dashboard.png",
    tags: ["AI solutions", "LLM", "Automations"],
    description: "Workflow node runner tracking agent execution loops."
  },
  {
    id: "woocommerce-storefront-mockup",
    title: "WooCommerce Boutique Store",
    category: "Web Platforms",
    image: "/gallery/software/woocommerce-storefront.jpeg",
    tags: ["WordPress", "WooCommerce", "Boutique"],
    description: "High-converting boutique storefront design layout."
  },
  {
    id: "wordpress-portfolio-site",
    title: "Creative Grid Portfolio Theme",
    category: "Web Platforms",
    image: "/gallery/software/wordpress-portfolio-site.png",
    tags: ["WordPress", "Portfolio", "Grid"],
    description: "Highly aesthetic gallery theme for artists and agencies."
  },
  {
    id: "react-spa-mockup",
    title: "React Single Page Application",
    category: "Web Platforms",
    image: "/gallery/react-development/react_spa_mockup.png",
    tags: ["React", "SPA", "Dashboard"],
    description: "State-driven dashboard rendering real-time performance indicators."
  },
  {
    id: "wordpress-woocommerce-mockup",
    title: "WooCommerce Corporate Portal",
    category: "Web Platforms",
    image: "/gallery/wordpress-development/wordpress_woocommerce_mockup.png",
    tags: ["WordPress", "E-Commerce", "B2B"],
    description: "Comprehensive product inventory, shopping carts, and Stripe hooks."
  },
  {
    id: "ecommerce-store-mockup",
    title: "E-Commerce Lifestyle Store",
    category: "Web Platforms",
    image: "/gallery/wordpress-development/ecommerce_store_mockup.png",
    tags: ["WordPress", "WooCommerce", "Responsive"],
    description: "Grid layouts, discount alerts, and customer portal panels."
  },
  {
    id: "wordpress-real-estate",
    title: "WordPress Property Listings Portal",
    category: "Web Platforms",
    image: "/gallery/wordpress-development/wordpress-real-estate.png",
    tags: ["WordPress", "Real Estate", "Theme"],
    description: "Property listing grids with map sync and contact hooks."
  },
  {
    id: "wordpress-coffee-woocommerce",
    title: "Artisan Coffee E-Commerce shop",
    category: "Web Platforms",
    image: "/gallery/wordpress-development/wordpress-coffee-woocommerce.png",
    tags: ["WordPress", "WooCommerce", "Aesthetic"],
    description: "Warm, premium shopping layout for specialty coffee roasters."
  },

  // MOBILE APPLICATIONS
  {
    id: "saas-analytics-mobile",
    title: "SaaS Analytics Mobile App",
    category: "Mobile Applications",
    image: "/gallery/software-development/saas_analytics_mobile.png",
    tags: ["Mobile App", "React Native", "Analytics"],
    description: "On-the-go business telemetry and chart tracking app."
  },
  {
    id: "mobile-banking",
    title: "Mobile Banking Suite",
    category: "Mobile Applications",
    image: "/gallery/mobile-development/mobile_app_mockup.png",
    tags: ["Fintech", "Mobile App", "Flutter"],
    description: "Secure consumer banking portal with live transfers.",
    caseStudyId: "medvitals-mobile"
  },
  {
    id: "law-firm-mobile",
    title: "Apex Law Firm Mobile Portal",
    category: "Mobile Applications",
    image: "/gallery/web-development/law-firm_mobile.jpeg",
    tags: ["Legal", "Mobile Web", "Responsive"],
    description: "Mobile legal directories and shift booking consultation."
  },
  {
    id: "healthcare-erp-mobile",
    title: "Healthcare Patient Vitals App",
    category: "Mobile Applications",
    image: "/gallery/enterprise-development/healthcare_erp_mobile.png",
    tags: ["Healthcare", "BLE Vitals", "Flutter"],
    description: "Mobile patient vital logs syncing via BLE wearable links."
  },
  {
    id: "ai-assistant-mobile",
    title: "AI Chat Mobile Assistant",
    category: "Mobile Applications",
    image: "/gallery/ai-solutions/ai_agent_mobile.png",
    tags: ["AI solutions", "Mobile Chat", "Python"],
    description: "Responsive conversational threads and query search models."
  },
  {
    id: "roofing-mobile",
    title: "Vertex Roofing Mobile App",
    category: "Mobile Applications",
    image: "/gallery/web-development/roofing_mobile.png",
    tags: ["Contractor", "Mobile Web", "Tailwind"],
    description: "Responsive residential estimates and client scheduling board."
  },
  {
    id: "drone-telemetry-mobile",
    title: "IoT Drone Mobile Controller",
    category: "Mobile Applications",
    image: "/gallery/iot/telemetry_mobile.png",
    tags: ["IoT & Embedded", "Mobile Control", "React Native"],
    description: "Altitude gauge and telemetry flight console for tablets."
  },
  {
    id: "plumbing-mobile",
    title: "AquaFlow Plumbing Mobile dispatcher",
    category: "Mobile Applications",
    image: "/gallery/web-development/plumbing_mobile.png",
    tags: ["Plumbing", "Mobile Web", "Responsive"],
    description: "SMS technician alerts and active emergency jobs panel."
  },
  {
    id: "mobile-banking-app",
    title: "Vertex Mobile Banking App",
    category: "Mobile Applications",
    image: "/gallery/software-development/mobile-banking-app.png",
    tags: ["Fintech", "Mobile App", "React Native"],
    description: "Secure ledger dashboard and interactive charts."
  },
  {
    id: "flutter-app-mockup",
    title: "Cross-Platform Flutter Layout",
    category: "Mobile Applications",
    image: "/gallery/flutter-development/flutter_app_mockup.png",
    tags: ["Flutter", "Cross-Platform", "App Design"],
    description: "High-performance modular viewports running on iOS & Android."
  },

  // IOT HARDWARE
  {
    id: "drone-telemetry",
    title: "IoT Drone Telemetry Hub",
    category: "IoT Hardware",
    image: "/gallery/iot/quadcopter-drone-uav-outdoor-flight-test.jpeg",
    tags: ["IoT & Embedded", "Zephyr RTOS", "C++"],
    description: "Quadcopter flight sensor tracking and status dashboards.",
    caseStudyId: "smart-grid-iot"
  },
  {
    id: "remote-motor-laptops",
    title: "Remote Motor Status Telemetry",
    category: "IoT Hardware",
    image: "/gallery/iot/automatic-remote-motor-control-dashboard-laptops.jpeg",
    tags: ["IoT Dashboard", "Industrial", "STM32"],
    description: "Enterprise control station displaying motor power, thermal logs, and switches."
  },
  {
    id: "water-leakage-hardware",
    title: "Differential Flow Leakage Hardware",
    category: "IoT Hardware",
    image: "/gallery/iot/iot-water-leakage-detection-system-hardware.jpeg",
    tags: ["Hardware", "Sensors", "Arduino"],
    description: "Dual-meter physical pipeline setup verifying leak coordinates."
  },
  {
    id: "drone-assembly-uav",
    title: "UAV Quadcopter Hardware Board",
    category: "IoT Hardware",
    image: "/gallery/iot/f450-quadcopter-drone-uav-assembly.jpeg",
    tags: ["Robotics", "Hardware", "Drone"],
    description: "Physical assembly of F450 drone with flight boards and telemetry links."
  },
  {
    id: "waste-classification-dashboard",
    title: "Waste Classification Dashboard",
    category: "IoT Hardware",
    image: "/gallery/iot/ai-smart-waste-monitoring-system-dashboard.png",
    tags: ["AI IoT", "STM32", "Computer Vision"],
    description: "Real-time webcam image classifier counting recycled items."
  },
  {
    id: "obstacle-car-front",
    title: "Obstacle Avoidance Car (Front)",
    category: "IoT Hardware",
    image: "/gallery/iot/eye-blink-car-obstacle-avoidance-front-view.jpeg",
    tags: ["Robotics", "Hardware", "Sonar"],
    description: "Front view of Arduino buggy with sonar distance modules and motor drives."
  },
  {
    id: "obstacle-car-top",
    title: "Obstacle Avoidance Car (Top)",
    category: "IoT Hardware",
    image: "/gallery/iot/eye-blink-car-obstacle-avoidance-top-view.jpeg",
    tags: ["Robotics", "Hardware", "Arduino"],
    description: "Top layout view mapping battery packs, motor shields, and sensor shields."
  },
  {
    id: "alcohol-esp32-lock",
    title: "Alcohol Detection Ignition Lock",
    category: "IoT Hardware",
    image: "/gallery/iot/alcohol-detection-engine-locking-system-esp32.jpeg",
    tags: ["ESP32", "Sensors", "Safety"],
    description: "Breath analyzer node wired to an LCD status board and ignition motor relay."
  },
  {
    id: "iot-board-grid",
    title: "IoT Industrial Grid PCB",
    category: "IoT Hardware",
    image: "/gallery/iot/iot_board_mockup.png",
    tags: ["PCB Design", "Hardware", "Altium"],
    description: "High-density custom PCB schematic layout for RS-485 interfaces."
  },
  {
    id: "flow-hall-sensor",
    title: "Flow Rate Hall Sensor Hardware",
    category: "IoT Hardware",
    image: "/gallery/iot/smart-irrigation-system-water-flow-sensor-hardware.jpeg",
    tags: ["Hardware", "Sensors", "Flow Rate"],
    description: "Flow rate sensor plumbing pipeline wired to an ESP8266 controller."
  },
  {
    id: "motor-relay-switch",
    title: "Remote Motor Switch Relay Node",
    category: "IoT Hardware",
    image: "/gallery/iot/automatic-remote-motor-control-hardware-relay.jpeg",
    tags: ["Hardware", "Relays", "STM32"],
    description: "Subpanel relay wiring diagram connected to telemetry hardware."
  },
  {
    id: "smart-irrigation-esp8266",
    title: "Smart Irrigation Node ESP8266",
    category: "IoT Hardware",
    image: "/gallery/iot/smart-irrigation-system-esp8266-arduino-sensors.jpeg",
    tags: ["ESP8266", "Sensors", "Moisture"],
    description: "Wired prototyping board linking DHT11, soil probes, and relay drivers."
  },
  {
    id: "gps-tracker-node",
    title: "Live GPS Tracker Hardware Node",
    category: "IoT Hardware",
    image: "/gallery/iot/iot-gps-vehicle-tracking-system-hardware.jpeg",
    tags: ["Hardware", "GPS", "GSM Module"],
    description: "Microcontroller node coupled to NEO-6M GPS antenna and cellular SIM card."
  },
  {
    id: "smart-irrigation-mobile",
    title: "Smart Irrigation Mobile Dashboard",
    category: "IoT Hardware",
    image: "/gallery/iot/smart-irrigation-system-mobile-dashboard-iot.png",
    tags: ["Mobile IoT", "React Native", "Sensors"],
    description: "Active dashboard graphing soil wetness metrics and control valves."
  },
  {
    id: "solenoid-valve-board",
    title: "Solenoid Valve Control Board",
    category: "IoT Hardware",
    image: "/gallery/iot/iot-smart-drainage-system-hardware-solenoid-valve.png",
    tags: ["Hardware", "Relays", "Drainage"],
    description: "Hardware node triggering physical solenoid water valves on commands."
  },
  {
    id: "uav-ground-station",
    title: "UAV Ground Station Remote Setup",
    category: "IoT Hardware",
    image: "/gallery/iot/flysky-remote-controller-drone-ground-setup.jpeg",
    tags: ["Drone", "Transmitter", "Hardware"],
    description: "Calibration logs and telemetry screens matched with the physical remote transmitter."
  },
  {
    id: "industrial-iot-drone-software",
    title: "Industrial UAV Telemetry Simulator",
    category: "IoT Hardware",
    image: "/gallery/software/industrial-iot-drone.png",
    tags: ["IoT Software", "Dashboard", "ROS"],
    description: "Autonomous flight simulation software displaying sensor overlays."
  },

  // CLOUD & DEVOPS
  {
    id: "cloud-monitoring-dashboard",
    title: "Multi-Cloud Monitoring Dashboard",
    category: "Cloud & DevOps",
    image: "/gallery/cloud-devops/cloud_monitoring_mockup.jpeg",
    tags: ["DevOps", "Cloud", "Grafana"],
    description: "Distributed system latency, CPU, and network request graphs."
  },
  {
    id: "devops-pipeline-console",
    title: "CI/CD Pipeline Console",
    category: "Cloud & DevOps",
    image: "/gallery/cloud-devops/devops-pipeline-console.png",
    tags: ["DevOps", "CI/CD", "AWS"],
    description: "Deployment pipeline tracking compile logs and static audit checks."
  },
  {
    id: "semrush-seo-analytics",
    title: "SEMrush SEO Analytics Dashboard",
    category: "Cloud & DevOps",
    image: "/gallery/seo-marketing/seo_metrics_mockup.png",
    tags: ["SEO", "Marketing", "Analytics"],
    description: "Keyword ranking trackers, search impression grids, and site audits."
  },
  {
    id: "dotnet-enterprise-security",
    title: ".NET Core Security Registry",
    category: "Cloud & DevOps",
    image: "/gallery/dotnet-development/dotnet_security_mockup.png",
    tags: ["Security", ".NET Core", "Database"],
    description: "Access token logging panel auditing database connection attempts."
  },
  {
    id: "creative-hdr-after",
    title: "Creative Image Editing (HDR Bloom)",
    category: "Cloud & DevOps",
    image: "/gallery/real-estate-creative/hdr_after.jpg",
    tags: ["Retouching", "Creative", "Real Estate"],
    description: "High dynamic range rendering with balanced shadows and bright highlights."
  },
  {
    id: "sky-replacement-dusk",
    title: "Sky Replacement (Clear Blue Dusk)",
    category: "Cloud & DevOps",
    image: "/gallery/real-estate-creative/sky_after.jpg",
    tags: ["Twilight", "Retouching", "Real Estate"],
    description: "Overcast clouds replaced with a sunset dusk sky map."
  },
  {
    id: "digital-virtual-staging",
    title: "Digital Virtual Staging Render",
    category: "Cloud & DevOps",
    image: "/gallery/real-estate-creative/staging_after.jpg",
    tags: ["Staging", "3D Render", "Real Estate"],
    description: "Empty physical living room populated with virtual 3D Scandinavian furniture."
  },
  {
    id: "real-estate-mockup-creative",
    title: "Real Estate Retouching Catalog",
    category: "Cloud & DevOps",
    image: "/gallery/real-estate-creative/real_estate_mockup.png",
    tags: ["Creative", "Marketing", "Responsive"],
    description: "Finished property imagery dashboard designed for print and digital brochures."
  }
]

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const categories = [
    { id: "All", label: "All Projects", Icon: Layers },
    { id: "Web Platforms", label: "Web Platforms", Icon: Laptop },
    { id: "Mobile Applications", label: "Mobile Apps", Icon: Brain },
    { id: "IoT Hardware", label: "IoT & R&D", Icon: Cpu },
    { id: "Cloud & DevOps", label: "Cloud & DevOps", Icon: Cloud }
  ]

  const filtered = useMemo(() => {
    return prototypesList.filter(item => {
      if (activeCategory === "All") return true
      return item.category === activeCategory
    })
  }, [activeCategory])

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section with minimized text */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            DESIGN DECK
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Prototype <span className="text-gradient">Showroom</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Browse our full suite of premium layout wireframes, mobile apps, and IoT boards.
          </p>
        </div>

        {/* Toolbar category pills */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {categories.map((cat) => {
            const Icon = cat.Icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 select-none ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Grid Showroom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/80 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group backdrop-blur-md"
              >
                {/* Photo container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-105 border-b border-slate-150/40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    priority
                  />

                  {/* Dark hover glass overlay with action trigger */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => setLightboxImage(item.image)}
                      className="p-3 bg-white hover:bg-blue-600 hover:text-white rounded-full text-slate-800 shadow-lg transition-colors cursor-pointer"
                      title="Enlarge Prototype"
                    >
                      <Eye size={18} />
                    </button>
                    
                    {item.caseStudyId && (
                      <Link href={`/case-studies/${item.caseStudyId}`}>
                        <span className="p-3 bg-white hover:bg-blue-600 hover:text-white rounded-full text-slate-800 shadow-lg transition-colors cursor-pointer inline-flex items-center" title="Read Case Study">
                          <ExternalLink size={18} />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Content details with minimized text */}
                <div className="p-5 space-y-3.5 text-left flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-[11px] leading-relaxed font-sans line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-bold text-slate-400 bg-slate-50 border border-slate-200/50 rounded-md px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* High-Fidelity Lightbox Modal overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer border border-white/10"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Prototype zoom view"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
