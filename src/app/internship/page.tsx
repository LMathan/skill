import { Metadata } from "next"
import InternshipContent from "./InternshipContent"

export const metadata: Metadata = {
  title: "Internship & Technical Workshops | Hands-on Labs",
  description: "Get industry-ready with hands-on internships and technical workshops in IoT, Embedded Systems, and AI & ML. Accelerate your career at our Perundurai lab center.",
  keywords: [
    "IoT Internship Erode",
    "Embedded Systems Workshops Tamil Nadu",
    "Robotics training engineering students",
    "Arduino ESP32 programming course",
    "Edge AI computer vision bootcamps",
    "Certified electronics internship"
  ],
  alternates: {
    canonical: "/internship"
  }
}

export default function InternshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": "IoT & Cloud Protocols Pathway",
        "description": "Build cloud-connected IoT systems with real-time dashboards and edge integration utilizing ESP32, MQTT, and AWS.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "SkillForge Technology",
          "url": "https://skillforgetechnology.app"
        }
      },
      {
        "@type": "Course",
        "name": "Embedded Systems & Firmware Pathway",
        "description": "Write optimized Embedded C/C++ firmware, simulate hardware, and design custom schematic PCB circuits using Altium and Proteus.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "SkillForge Technology",
          "url": "https://skillforgetechnology.app"
        }
      },
      {
        "@type": "Course",
        "name": "Edge AI & Computer Vision Pathway",
        "description": "Deploy OpenCV, YOLO tracking, and TinyML neural networks directly onto edge hardware units like Raspberry Pi.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "SkillForge Technology",
          "url": "https://skillforgetechnology.app"
        }
      },
      {
        "@type": "Course",
        "name": "Robotics & Kinetic Systems Pathway",
        "description": "Integrate motor drivers, gyroscopic IMU sensor fusion, and wireless drivetrains for rovers and arms.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "SkillForge Technology",
          "url": "https://skillforgetechnology.app"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InternshipContent />
    </>
  )
}
