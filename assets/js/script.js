const firebaseState = {
  isReady: false,
  db: null,
  collection: null,
  addDoc: null,
  getDocs: null,
  query: null,
  serverTimestamp: null
};

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

async function initFirebase() {
  try {
    const [{ initializeApp }, firestoreModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js")
    ]);

    const app = initializeApp(FIREBASE_CONFIG);
    firebaseState.db = firestoreModule.getFirestore(app);
    firebaseState.collection = firestoreModule.collection;
    firebaseState.addDoc = firestoreModule.addDoc;
    firebaseState.getDocs = firestoreModule.getDocs;
    firebaseState.query = firestoreModule.query;
    firebaseState.serverTimestamp = firestoreModule.serverTimestamp;
    firebaseState.isReady = true;
  } catch (error) {
    firebaseState.isReady = false;
    console.error("Firebase initialization failed. Falling back to local storage.", error);
  }
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

function sortFeedbacksByCreatedTime(feedbacks) {
  return [...feedbacks].sort((first, second) => {
    const firstTime = first.createdAt?.seconds || 0;
    const secondTime = second.createdAt?.seconds || 0;
    return secondTime - firstTime;
  });
}

async function getFeedbacks() {
  if (!firebaseState.isReady) {
    return getStoredFeedbacks();
  }

  try {
    const feedbackCollection = firebaseState.collection(firebaseState.db, "feedbacks");
    const snapshot = await firebaseState.getDocs(firebaseState.query(feedbackCollection));
    const feedbacks = snapshot.docs.map((documentRef) => {
      const data = documentRef.data();
      return {
        customerName: data.customerName || "Anonymous",
        projectName: data.projectName || "Project",
        message: data.message || "",
        rating: Number(data.rating) || 5,
        createdAt: data.createdAt || null
      };
    });

    if (!feedbacks.length) {
      return [...defaultFeedbacks];
    }

    return sortFeedbacksByCreatedTime(feedbacks);
  } catch (error) {
    console.error("Failed to fetch feedbacks from Firestore. Falling back to local storage.", error);
    return getStoredFeedbacks();
  }
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
  const assetPrefix = window.location.pathname.toLowerCase().includes("/pages/") ? "../assets" : "assets";
  return `${assetPrefix}/images/projects/${slugifyProjectTitle(title)}.svg`;
}

async function renderTestimonials() {
  const container = document.getElementById("testimonialsContainer");
  if (!container) {
    return;
  }

  const feedbacks = await getFeedbacks();
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

  form.addEventListener("submit", async (event) => {
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

    if (firebaseState.isReady) {
      try {
        const feedbackCollection = firebaseState.collection(firebaseState.db, "feedbacks");
        await firebaseState.addDoc(feedbackCollection, {
          customerName,
          projectName,
          message,
          rating,
          createdAt: firebaseState.serverTimestamp()
        });
      } catch (error) {
        console.error("Failed to submit feedback to Firestore. Saving locally.", error);
        const localFeedbacks = getStoredFeedbacks();
        localFeedbacks.unshift({ customerName, projectName, message, rating });
        saveFeedbacks(localFeedbacks);
      }
    } else {
      const localFeedbacks = getStoredFeedbacks();
      localFeedbacks.unshift({ customerName, projectName, message, rating });
      saveFeedbacks(localFeedbacks);
    }

    await renderTestimonials();

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
  initFirebase().then(() => {
    setYear();
    initScrollReveal();
    animateStats();
    renderProjects();
    renderTestimonials();
    initFeedbackForm();
    initContactForm();
  });
});
