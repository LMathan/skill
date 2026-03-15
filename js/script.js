const FEEDBACK_STORAGE_KEY = "skillforge_feedbacks_v1";

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
    image: "images/project-wheelchair.svg"
  },
  {
    title: "Smart Drainage Monitoring System",
    description: "Real-time water-level and blockage alerts with predictive maintenance indicators.",
    technologies: ["ESP8266", "IoT", "Cloud Dashboard"],
    image: "images/project-drainage.svg"
  },
  {
    title: "Drone Based Noise Pollution Monitoring",
    description: "Aerial acoustic data collection system for city-scale environmental intelligence.",
    technologies: ["Drone Tech", "AI", "IoT"],
    image: "images/project-drone.svg"
  },
  {
    title: "Smart Farm Security System",
    description: "Remote farm perimeter monitoring with motion alerts and surveillance analytics.",
    technologies: ["ESP32", "IoT", "Computer Vision"],
    image: "images/project-farm.svg"
  },
  {
    title: "Smart Emergency Vehicle Traffic Control",
    description: "Adaptive traffic signal orchestration to prioritize ambulances and emergency fleets.",
    technologies: ["AI", "Edge ML", "Smart City IoT"],
    image: "images/project-traffic.svg"
  },
  {
    title: "IoT Based Smart Home Automation",
    description: "Unified control for lighting, appliances, and security with mobile access.",
    technologies: ["ESP32", "IoT", "Mobile App"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "Smart Parking System using IoT",
    description: "Real-time parking occupancy detection and reservation assistance platform.",
    technologies: ["Ultrasonic Sensors", "IoT", "Dashboard"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "Smart Dustbin with Garbage Level Detection",
    description: "Automated fill-level alerts for efficient waste collection and route optimization.",
    technologies: ["Arduino", "IoT", "Sensor Network"],
    image: "images/project-drainage.svg"
  },
  {
    title: "Automatic Plant Watering System",
    description: "Soil-moisture based autonomous irrigation with threshold control and alerts.",
    technologies: ["Arduino", "Embedded", "Automation"],
    image: "images/project-farm.svg"
  },
  {
    title: "AI Based Face Recognition Attendance System",
    description: "Computer vision attendance platform with identity matching and attendance logs.",
    technologies: ["Python", "OpenCV", "AI"],
    image: "images/project-ai-vision.svg"
  },
  {
    title: "Gesture Controlled Robot",
    description: "Hand-gesture driven robotic control using onboard sensors and wireless communication.",
    technologies: ["Robotics", "Arduino", "IMU"],
    image: "images/project-robotics.svg"
  },
  {
    title: "Fire and Gas Leakage Detection System",
    description: "Early-warning safety system with multi-sensor detection and emergency notifications.",
    technologies: ["MQ Sensors", "IoT", "Alert System"],
    image: "images/project-traffic.svg"
  },
  {
    title: "Smart Weather Monitoring System",
    description: "Live weather telemetry platform for temperature, humidity, pressure, and rainfall.",
    technologies: ["ESP8266", "IoT", "Cloud"],
    image: "images/project-drainage.svg"
  },
  {
    title: "Water Quality Monitoring System",
    description: "Continuous water quality sensing for pH, turbidity, and contamination levels.",
    technologies: ["IoT", "Sensors", "Analytics"],
    image: "images/project-drainage.svg"
  },
  {
    title: "RFID Based Smart Door Lock",
    description: "Secure access control with RFID authentication and event logs.",
    technologies: ["RFID", "Embedded", "Security"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "IoT Based Energy Monitoring System",
    description: "Power consumption tracking with anomaly alerts and energy-saving insights.",
    technologies: ["IoT", "Energy Analytics", "ESP32"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "AI Object Detection Security System",
    description: "AI-enabled perimeter monitoring with object classification and intrusion alerts.",
    technologies: ["YOLO", "Computer Vision", "AI"],
    image: "images/project-ai-vision.svg"
  },
  {
    title: "Smart Blind Stick for Visually Impaired",
    description: "Obstacle detection and guidance support for safe mobility assistance.",
    technologies: ["Ultrasonic", "Embedded", "Assistive Tech"],
    image: "images/project-wheelchair.svg"
  },
  {
    title: "Smart Helmet with Accident Detection",
    description: "Helmet-integrated impact sensing with emergency alert transmission.",
    technologies: ["IoT", "GPS", "Safety Systems"],
    image: "images/project-traffic.svg"
  },
  {
    title: "Vehicle Accident Alert System with GPS",
    description: "Accident detection with instant location sharing to emergency contacts.",
    technologies: ["GPS", "GSM", "IoT"],
    image: "images/project-traffic.svg"
  },
  {
    title: "IoT Based Smart Street Light System",
    description: "Adaptive streetlight control based on motion, daylight, and traffic patterns.",
    technologies: ["IoT", "Automation", "Smart City"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "Wireless Notice Board using IoT",
    description: "Remote message publishing board for institutions and organizations.",
    technologies: ["ESP8266", "IoT", "Display Control"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "AI Based Mask Detection System",
    description: "Real-time compliance monitoring using camera-based AI detection.",
    technologies: ["AI", "Computer Vision", "Python"],
    image: "images/project-ai-vision.svg"
  },
  {
    title: "Smart Irrigation System",
    description: "Data-driven irrigation scheduling for efficient water management in agriculture.",
    technologies: ["IoT", "Soil Sensors", "Automation"],
    image: "images/project-farm.svg"
  },
  {
    title: "IoT Based Patient Health Monitoring System",
    description: "Remote monitoring of vitals with threshold alerts for healthcare teams.",
    technologies: ["IoT", "Healthcare", "Cloud"],
    image: "images/project-wheelchair.svg"
  },
  {
    title: "Bluetooth Controlled Robot Car",
    description: "Wireless robotic car control with responsive drive and obstacle handling.",
    technologies: ["Bluetooth", "Arduino", "Robotics"],
    image: "images/project-robotics.svg"
  },
  {
    title: "Voice Controlled Home Automation",
    description: "Natural-language based control of home devices and routines.",
    technologies: ["NLP", "IoT", "Home Automation"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "AI Based Crowd Detection System",
    description: "Population density estimation with AI for safety and event management.",
    technologies: ["AI", "Computer Vision", "Analytics"],
    image: "images/project-ai-vision.svg"
  },
  {
    title: "Smart Water Tank Level Monitoring System",
    description: "Continuous tank level tracking with overflow and low-level alerts.",
    technologies: ["IoT", "Ultrasonic", "Automation"],
    image: "images/project-drainage.svg"
  },
  {
    title: "Automatic Railway Gate Control System",
    description: "Sensor-triggered railway gate operation to improve crossing safety.",
    technologies: ["Embedded", "Automation", "Safety"],
    image: "images/project-traffic.svg"
  },
  {
    title: "AI Based Fire Detection System",
    description: "Visual flame and smoke detection model for rapid incident response.",
    technologies: ["AI", "Computer Vision", "Safety"],
    image: "images/project-ai-vision.svg"
  },
  {
    title: "Smart Energy Saving System",
    description: "Energy optimization framework using occupancy and load intelligence.",
    technologies: ["IoT", "Energy", "Automation"],
    image: "images/project-smart-home.svg"
  },
  {
    title: "IoT Based Pollution Monitoring System",
    description: "Air quality monitoring solution for PM, CO2, and toxic gas analytics.",
    technologies: ["IoT", "Environmental Sensors", "Cloud"],
    image: "images/project-drone.svg"
  },
  {
    title: "Smart Garbage Collection System",
    description: "Smart waste tracking and optimized collection route management.",
    technologies: ["IoT", "Routing", "Urban Tech"],
    image: "images/project-drainage.svg"
  },
  {
    title: "AI Based Driver Drowsiness Detection System",
    description: "Driver alertness monitoring with eye-state and head-pose detection.",
    technologies: ["AI", "Computer Vision", "Automotive Safety"],
    image: "images/project-ai-vision.svg"
  }
];

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
  }
}

function setYear() {
  const yearElements = document.querySelectorAll("#year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

function animateStats() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) {
    return;
  }

  const runCounter = (counter) => {
    const target = Number(counter.getAttribute("data-target")) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target).toString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) {
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

function getStoredFeedbacks() {
  const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  if (!data) {
    return [...defaultFeedbacks];
  }

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultFeedbacks];
  } catch {
    return [...defaultFeedbacks];
  }
}

function saveFeedbacks(feedbacks) {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));
}

function getStars(rating) {
  const safeRating = Number(rating);
  const filled = "★".repeat(Math.max(0, Math.min(5, safeRating)));
  const empty = "☆".repeat(5 - Math.max(0, Math.min(5, safeRating)));
  return `${filled}${empty}`;
}

function slugifyProjectTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProjectImagePath(title) {
  return `images/projects/${slugifyProjectTitle(title)}.svg`;
}

function renderTestimonials() {
  const container = document.getElementById("testimonialsContainer");
  if (!container) {
    return;
  }

  const feedbacks = getStoredFeedbacks();
  container.innerHTML = feedbacks
    .map((entry) => `
      <div class="col-md-6 col-lg-4 reveal active">
        <article class="testimonial-card">
          <h3 class="h6 mb-1">${entry.customerName}</h3>
          <p class="mb-1 text-info-emphasis">${entry.projectName}</p>
          <p class="mb-2">${entry.message}</p>
          <p class="rating-stars mb-0" aria-label="${entry.rating} star rating">${getStars(entry.rating)}</p>
        </article>
      </div>
    `)
    .join("");
}

function renderProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = projectsData
    .map(
      (project) => `
        <div class="col-md-6 col-lg-4 reveal active">
          <article class="project-card h-100">
            <img src="${getProjectImagePath(project.title)}" class="img-fluid" alt="${project.title}" loading="lazy" />
            <div class="p-3">
              <h2 class="h5">${project.title}</h2>
              <p>${project.description}</p>
              <p class="tech-tags">
                ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
              </p>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  const notice = document.getElementById("feedbackNotice");

  if (!form || !notice) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customerName")?.value.trim();
    const projectName = document.getElementById("projectName")?.value.trim();
    const rating = Number(document.getElementById("rating")?.value);
    const message = document.getElementById("feedbackMessage")?.value.trim();

    if (!customerName || !projectName || !message || !rating) {
      notice.textContent = "Please complete all fields before submitting.";
      notice.className = "text-warning mb-0";
      return;
    }

    const feedbacks = getStoredFeedbacks();
    feedbacks.unshift({ customerName, projectName, message, rating });
    saveFeedbacks(feedbacks);
    renderTestimonials();

    form.reset();
    notice.textContent = "Thank you! Your feedback has been submitted successfully.";
    notice.className = "text-success mb-0";
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const notice = document.getElementById("contactNotice");

  if (!form || !notice) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    notice.textContent = "Message sent. Our team will contact you shortly.";
    notice.className = "text-success mb-0";
    form.reset();
  });
}

window.addEventListener("load", hidePreloader);

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initScrollReveal();
  animateStats();
  renderProjects();
  renderTestimonials();
  initFeedbackForm();
  initContactForm();
});