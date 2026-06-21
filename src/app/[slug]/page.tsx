import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Sparkles, ArrowRight, CheckCircle, Cpu, Brain, Award, ShieldAlert, GraduationCap, MapPin } from "lucide-react"
import LocalLandingClient from "./LocalLandingClient"
import { projectsData } from "@/data/siteData"

// Static definition of supported SEO routes and their content properties
export interface SEOPageData {
  title: string
  description: string
  h1: string
  h2: string
  h3: string
  city: string
  category: string
  colleges: string[]
  keywords: string[]
  faqs: { question: string; answer: string }[]
  projects: string[]
}

export const seoPagesContent: Record<string, SEOPageData> = {
  "final-year-project-center-erode": {
    title: "Final Year Project Center in Erode | SkillForge Technology",
    description: "Looking for the best final year project center in Erode? We offer 100% working hardware prototypes, code explanations, and viva support for ECE, CSE & EEE.",
    h1: "Premium Final Year Project Center in Erode",
    h2: "Custom Engineering Prototypes & Laboratory Mentorship",
    h3: "Supporting Budding Electronics & Software Engineers",
    city: "Erode",
    category: "Final Year Projects",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering and Technology (VCET)",
      "Nandha Engineering College (NEC)",
      "Erode Sengunthar Engineering College (ESEC)",
      "M.Kumarasamy College of Engineering"
    ],
    keywords: ["Final Year Project Center Erode", "Engineering Projects Erode", "Project Center Perundurai", "ECE Projects Erode", "CSE Projects Erode"],
    faqs: [
      {
        question: "Do you offer full hardware explanation for final year reviews?",
        answer: "Yes, every final year project comes with a detailed video session explaining the microcontroller connections, component logic, and step-by-step code execution."
      },
      {
        question: "Can we modify an existing project block diagram?",
        answer: "Absolutely. Our local lab engineers in Erode can add sensors, modify GSM/GPS alert pathways, or change the cloud server configuration based on your syllabus."
      }
    ],
    projects: ["Eye Blink Controlled Wheelchair", "Smart Farm Security System", "Smart Emergency Vehicle Traffic Control"]
  },
  "iot-project-center-erode": {
    title: "IoT Project Center in Erode | ESP32 & Arduino Prototypes",
    description: "Ranked #1 IoT project center in Erode. Get hands-on guidance for cloud telemetry, Node-RED dashboards, and ESP32 programming near Perundurai.",
    h1: "Leading IoT Project Center in Erode",
    h2: "Cloud Dashboards, MQTT, & Microcontroller Prototyping",
    h3: "Hardware Internals & Live Server Integrations",
    city: "Erode",
    category: "IoT Projects",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering and Technology (VCET)",
      "Nandha College of Technology",
      "K.S. Rangasamy College of Technology (KSR)"
    ],
    keywords: ["IoT Project Center Erode", "ESP32 Projects Erode", "IoT Lab Training Erode", "Cloud Dashboard Projects Erode"],
    faqs: [
      {
        question: "Which IoT platforms do you utilize for data visualization?",
        answer: "We develop cloud dashboards using Google Firebase Streams, AWS IoT Core, Blynk Web Console, Node-RED, and custom React panels."
      },
      {
        question: "Is source code provided for ESP32 and ESP8266 controllers?",
        answer: "Yes, we provide fully annotated Arduino C++ or MicroPython source codes along with libraries and circuit schematics."
      }
    ],
    projects: ["Smart Drainage Monitoring System", "IoT Based Smart Home Automation", "Smart Water Tank Level Monitoring System"]
  },
  "ieee-project-center-erode": {
    title: "IEEE Project Center in Erode | Research Paper Implementation",
    description: "Verified IEEE project center in Erode. We implement IEEE conference and journal papers in IoT, AI, ML, & Cloud with complete thesis documents.",
    h1: "Professional IEEE Project Center in Erode",
    h2: "Implementing Complex IEEE Transactions & Journal Blueprints",
    h3: "MATLAB Simulation & Physical Working Prototypes",
    city: "Erode",
    category: "IEEE Projects",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering",
      "Nandha Engineering College",
      "Sengunthar Engineering College"
    ],
    keywords: ["IEEE Project Center Erode", "IEEE IoT Projects Erode", "IEEE AI Projects Erode", "MATLAB Simulation Erode"],
    faqs: [
      {
        question: "Do you write project reports in IEEE format?",
        answer: "Yes, we draft complete documentation including synopses, system block diagrams, algorithm flowcharts, and references following standard IEEE guidelines."
      },
      {
        question: "Do you assist with plagiarism check and publication parameters?",
        answer: "We focus on project design, mathematical models, and report layout documentation to support your publication goals."
      }
    ],
    projects: ["Drone Based Noise Pollution Monitoring", "Smart Emergency Vehicle Traffic Control", "AI Object Detection Security System"]
  },
  "embedded-project-center-erode": {
    title: "Embedded Systems Project Center in Erode | Arduino & STM32",
    description: "Premium embedded systems project center in Erode. Learn schematic capture, PCB layout, and C/C++ firmware coding at our Perundurai lab.",
    h1: "Embedded Systems Project Center in Erode",
    h2: "Custom PCB Fabrication, Firmware Optimization & Circuit Routing",
    h3: "Hands-On Laboratory Guidance with Core Hardware",
    city: "Erode",
    category: "Embedded Systems",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering and Technology (VCET)",
      "KSR College of Engineering",
      "M.Kumarasamy College of Engineering"
    ],
    keywords: ["Embedded Systems Projects Erode", "STM32 Projects Erode", "PCB Design Course Erode", "Arduino Projects Erode"],
    faqs: [
      {
        question: "Do you teach PCB design software as part of the project guidance?",
        answer: "Yes, we show schematic capture and routing layouts in EasyEDA, Proteus, or Altium to help students design custom circuit boards."
      },
      {
        question: "Can you implement projects using 8-bit PIC or 16-bit MSP430?",
        answer: "We support Arduino AVR, STM32 ARM Cortex, PIC microchip families, and MSP430 depending on academic rules."
      }
    ],
    projects: ["Eye Blink Controlled Wheelchair", "Automatic Railway Gate Control System", "Smart Blind Stick for Visually Impaired"]
  },
  "ai-project-center-erode": {
    title: "AI Project Center in Erode | Machine Learning & Edge AI",
    description: "Best AI project center in Erode. Build computer vision, YOLO models, and TensorFlow Edge ML systems with real-time OpenCV cameras.",
    h1: "Advanced AI Project Center in Erode",
    h2: "Edge ML, Deep Learning & High-Performance Computer Vision",
    h3: "Deploying Neural Networks to Edge Devices",
    city: "Erode",
    category: "AI & Machine Learning",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering",
      "Nandha Engineering College",
      "J.K.K. Nattraja College of Engineering"
    ],
    keywords: ["AI Project Center Erode", "Machine Learning Projects Erode", "OpenCV Projects Erode", "YOLO Object Detection Erode"],
    faqs: [
      {
        question: "Do we need heavy GPU servers to execute the AI projects?",
        answer: "No, we train models using Google Colab and optimize them to run locally on Raspberry Pi boards or Edge accelerators (TinyML)."
      },
      {
        question: "Which programming languages do you support for ML?",
        answer: "We develop machine learning and deep neural networks using Python (TensorFlow, PyTorch, Scikit-Learn) and Embedded C++."
      }
    ],
    projects: ["AI Based Face Recognition Attendance System", "AI Object Detection Security System", "AI Based Driver Drowsiness Detection System"]
  },
  "internship-training-erode": {
    title: "Best Technical Internship Training in Erode | SkillForge",
    description: "Enroll for certified hands-on internship training in Erode (Perundurai). Work on IoT, Embedded Stacks, AI, and Web Development inside our lab.",
    h1: "Certified Internship Training in Erode",
    h2: "100% Practical Laboratory Training on Embedded, IoT & Python",
    h3: "Boost Your Tech Resume with Verified Core Credentials",
    city: "Erode",
    category: "Internship Training",
    colleges: [
      "Kongu Engineering College (KEC)",
      "Velalar College of Engineering",
      "Nandha Engineering College",
      "K.S. Rangasamy College of Technology"
    ],
    keywords: ["Internship Training Erode", "Web Development Internship Erode", "Embedded Systems Training Perundurai", "IoT Workshop Erode"],
    faqs: [
      {
        question: "Is physical lab space available in Erode for internship training?",
        answer: "Yes, our lab is situated near Perundurai (Erode), fully equipped with soldering setups, test instruments, and microcontroller kits."
      },
      {
        question: "Do you issue ISO-compliant certificates after completion?",
        answer: "Yes, all students receive a verified internship completion certificate, a technical project badge, and industrial reference recommendations."
      }
    ],
    projects: ["Smart Irrigation System", "IoT Based Smart Home Automation", "AI Based Face Recognition Attendance System"]
  },
  "project-center-erode": {
    title: "Engineering Project Center in Erode | SkillForge Technology",
    description: "Looking for an engineering project center in Erode? Visit our lab for working prototype implementations in IoT, Robotics, & AI with full reports.",
    h1: "Leading Engineering Project Center in Erode",
    h2: "Developing Functional Electronic Prototypes & Real-Time Dashboards",
    h3: "Academic Review Support & Detailed Viva Preparation Guides",
    city: "Erode",
    colleges: ["Kongu Engineering College", "Velalar College of Engineering", "Nandha Engineering College", "Erode Sengunthar Engineering College"],
    category: "Engineering Projects",
    keywords: ["Project Center Erode", "Best Project Center Erode", "IEEE Projects Perundurai", "IEEE ECE Projects Erode"],
    faqs: [
      {
        question: "Where is your center located in Erode?",
        answer: "We are located along Perundurai Road, Erode, making it easily accessible for students from Kongu, Velalar, and Nandha campuses."
      },
      {
        question: "Do you provide code explanation sessions before reviews?",
        answer: "Yes, we host mock reviews in our lab where we walk you through the connections, code logic, and possible panel questions."
      }
    ],
    projects: ["Eye Blink Controlled Wheelchair", "Drone Based Noise Pollution Monitoring", "AI Based Face Recognition Attendance System"]
  },
  "project-center-salem": {
    title: "Best Project Center in Salem | IEEE, IoT & AI Prototypes",
    description: "Looking for an engineering project center in Salem? SkillForge Technology offers fully functional models in IoT, Robotics, & AI with report files.",
    h1: "Top Engineering Project Center in Salem",
    h2: "Real-Time Cloud Dashboards & Embedded C++ Firmware",
    h3: "Mentoring Salem Engineering Students with Working Hardware",
    city: "Salem",
    colleges: [
      "Sona College of Technology",
      "Government College of Engineering (GCE) Salem",
      "Knowledge Institute of Technology (KIOT)",
      "AVS Engineering College",
      "Vyasya College of Engineering"
    ],
    category: "Engineering Projects",
    keywords: ["Project Center Salem", "Best Project Center Salem", "IEEE Projects Salem", "Sona College Project Center"],
    faqs: [
      {
        question: "Can Salem students coordinate online for reviews?",
        answer: "Yes, we support remote students via online Zoom calls, code sharing, and progressive video logs, delivering the finished model securely."
      },
      {
        question: "Are report documents included with the delivery?",
        answer: "Yes, we provide complete abstract, block diagrams, component connections list, flowcharts, source code, and powerpoint files."
      }
    ],
    projects: ["Smart Farm Security System", "Smart Emergency Vehicle Traffic Control", "IoT Based Energy Monitoring System"]
  },
  "project-center-coimbatore": {
    title: "Best Project Center in Coimbatore | IEEE & IoT Prototypes",
    description: "Premium project center in Coimbatore for final year B.E., B.Tech & M.E. candidates. Certified prototypes in IoT, Embedded Stacks, & AI/ML.",
    h1: "Premier Project Center in Coimbatore",
    h2: "Advanced AI Inference & Certified Hardware Assemblies",
    h3: "Supporting Research Scholars & Engineering Startups",
    city: "Coimbatore",
    colleges: [
      "PSG College of Technology (PSG Tech)",
      "Coimbatore Institute of Technology (CIT)",
      "Kumaraguru College of Technology (KCT)",
      "Sri Krishna College of Engineering and Technology (SKCET)",
      "Government College of Technology (GCT) Coimbatore"
    ],
    category: "Engineering Projects",
    keywords: ["Project Center Coimbatore", "Best Project Center Coimbatore", "IEEE Projects Coimbatore", "IoT Projects Coimbatore"],
    faqs: [
      {
        question: "Do you design custom multi-layer PCBs for research scholars?",
        answer: "Yes, we simulate and route complex circuit designs and fabricate custom PCBs for IEEE publications and PG theses."
      },
      {
        question: "Is Edge ML hardware like Raspberry Pi Coral supported?",
        answer: "Yes, we implement advanced neural networks on Coral TPUs and Nvidia Jetson nano nodes for machine learning prototypes."
      }
    ],
    projects: ["Drone Based Noise Pollution Monitoring", "AI Object Detection Security System", "Smart Emergency Vehicle Traffic Control"]
  },
  "project-center-tiruppur": {
    title: "Best Project Center in Tiruppur | Electronics & IoT Prototypes",
    description: "Engineering project center in Tiruppur. We develop working systems in IoT, Embedded Stacks, AI, and Robotics for CSE, ECE & EEE.",
    h1: "Top Project Center in Tiruppur",
    h2: "Developing Functional Prototypes with Embedded Circuits",
    h3: "Academic Review Support & Detailed Reports",
    city: "Tiruppur",
    colleges: [
      "Professional Group of Institutions",
      "Sasurie College of Engineering",
      "Park College of Engineering and Technology",
      "Builder Engineering College"
    ],
    category: "Engineering Projects",
    keywords: ["Project Center Tiruppur", "Best Project Center Tiruppur", "IEEE Projects Tiruppur", "Electronics Projects Tiruppur"],
    faqs: [
      {
        question: "Do you support Tiruppur engineering scholars with simulation codes?",
        answer: "Yes, we run simulation designs in MATLAB, Proteus, and Multisim alongside physical hardware deliveries."
      },
      {
        question: "How is the project delivered to Tiruppur?",
        answer: "We support shipping options or students can visit our main Erode lab (under 1 hour transit) for a hands-on review."
      }
    ],
    projects: ["Eye Blink Controlled Wheelchair", "Smart Drainage Monitoring System", "Gesture Controlled Robot"]
  },
  "project-center-namakkal": {
    title: "Best Project Center in Namakkal | IEEE, IoT & AI Prototypes",
    description: "Best final year project center in Namakkal. Custom prototypes in IoT, Embedded Stacks, AI, and Robotics with complete reports & viva guides.",
    h1: "Top Project Center in Namakkal",
    h2: "Real-Time Cloud Dashboards & Embedded C++ Firmware",
    h3: "Mentoring Namakkal Engineering Students with Working Hardware",
    city: "Namakkal",
    colleges: [
      "Gnanamani College of Technology",
      "Excel Engineering College",
      "Mahendra Engineering College",
      "Sengunthar College of Engineering",
      "Paavai Engineering College"
    ],
    category: "Engineering Projects",
    keywords: ["Project Center Namakkal", "Best Project Center Namakkal", "IEEE Projects Namakkal", "Excel Engineering Project Center"],
    faqs: [
      {
        question: "Can Namakkal students coordinate online for reviews?",
        answer: "Yes, we support remote students via online Zoom calls, code sharing, and progressive video logs, delivering the finished model securely."
      },
      {
        question: "Are report documents included with the delivery?",
        answer: "Yes, we provide complete abstract, block diagrams, component connections list, flowcharts, source code, and powerpoint files."
      }
    ],
    projects: ["Smart Farm Security System", "Smart Emergency Vehicle Traffic Control", "IoT Based Energy Monitoring System"]
  },
  "project-center-karur": {
    title: "Best Project Center in Karur | Electronics & IoT Prototypes",
    description: "Premium project center in Karur. We design and build working models in IoT, Embedded Stacks, AI, and Robotics for final year engineering students.",
    h1: "Top Project Center in Karur",
    h2: "Developing Functional Prototypes with Embedded Circuits",
    h3: "Academic Review Support & Detailed Reports",
    city: "Karur",
    colleges: [
      "M.Kumarasamy College of Engineering (MKCE)",
      "VSB Engineering College",
      "Karur College of Engineering"
    ],
    category: "Engineering Projects",
    keywords: ["Project Center Karur", "Best Project Center Karur", "IEEE Projects Karur", "Electronics Projects Karur"],
    faqs: [
      {
        question: "Do you support Karur engineering scholars with simulation codes?",
        answer: "Yes, we run simulation designs in MATLAB, Proteus, and Multisim alongside physical hardware deliveries."
      },
      {
        question: "How is the project delivered to Karur?",
        answer: "We support secure shipping or students can visit our main Perundurai lab (1.5 hours transit) for physical hands-on verification."
      }
    ],
    projects: ["Eye Blink Controlled Wheelchair", "Smart Drainage Monitoring System", "Gesture Controlled Robot"]
  }
}

// Precompile pages at build time
export async function generateStaticParams() {
  return Object.keys(seoPagesContent).map((slug) => ({
    slug: slug
  }))
}

// Dynamic Meta Generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const content = seoPagesContent[params.slug]
  if (!content) return notFound()

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `/${params.slug}`
    }
  }
}

export default function SEOPage({ params }: { params: { slug: string } }) {
  const content = seoPagesContent[params.slug]
  if (!content) return notFound()

  // Generate Schemas (FAQ & Breadcrumb)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skillforgetechnology.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": content.category,
        "item": `https://skillforgetechnology.app/${params.slug}`
      }
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.h1,
    "description": content.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SkillForge Technology",
      "telephone": "+919345518760",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perundurai Road",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": content.city
      }
    ]
  }

  const listSchema = [faqSchema, breadcrumbSchema, serviceSchema]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <LocalLandingClient content={content} slug={params.slug} />
    </>
  )
}
