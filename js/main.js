const WHATSAPP_NUMBERS = ["243803548088", "243991085865"];

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    const label = isDark ? "Activer le mode clair" : "Activer le mode sombre";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = isDark ? "#101722" : "#0b3d91";
}

const savedTheme = localStorage.getItem("jct-theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("jct-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

function whatsappUrl(message, number = WHATSAPP_NUMBERS[0]) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

function serviceMessage(service) {
  return `Bonjour JC Technology, je souhaite demander un devis pour le service : ${service}.`;
}

document.querySelectorAll(".service-quote").forEach((link) => {
  const service = link.dataset.service;
  link.href = whatsappUrl(serviceMessage(service));
});

document.addEventListener("pointerdown", (event) => {
  document.querySelectorAll(".contact-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});

const whatsappChooser = document.querySelector("#whatsapp-chooser");
const whatsappOptions = whatsappChooser?.querySelectorAll("[data-whatsapp-option]");
const whatsappClose = whatsappChooser?.querySelector(".whatsapp-chooser-close");

function openWhatsAppChooser(message) {
  if (!whatsappChooser || typeof whatsappChooser.showModal !== "function" || !whatsappOptions) {
    const whatsappWindow = window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    return Boolean(whatsappWindow);
  }

  whatsappOptions.forEach((option, index) => {
    option.href = whatsappUrl(message, WHATSAPP_NUMBERS[index]);
  });
  whatsappChooser.showModal();
  return true;
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href*="wa.me/"]');
  if (!link || link.matches("[data-whatsapp-option]")) return;

  event.preventDefault();
  const message = new URL(link.href, window.location.href).searchParams.get("text") || "";
  openWhatsAppChooser(message);
});

if (whatsappClose && whatsappChooser) {
  whatsappClose.addEventListener("click", () => whatsappChooser.close());
  whatsappChooser.addEventListener("click", (event) => {
    if (event.target === whatsappChooser) whatsappChooser.close();
  });
}

const serviceGallery = document.querySelector("#service-gallery");
const galleryImage = document.querySelector("#service-gallery-image");
const galleryTitle = document.querySelector("#service-gallery-title");
const galleryCount = document.querySelector("#service-gallery-count");
const galleryCaption = document.querySelector("#service-gallery-caption");
const galleryClose = serviceGallery?.querySelector(".service-gallery-close");
const galleryPrevious = serviceGallery?.querySelector(".service-gallery-prev");
const galleryNext = serviceGallery?.querySelector(".service-gallery-next");

const serviceGalleryContent = {
  gps: {
    title: "Suivi GPS",
    images: [
      { src: "assets/gps-alert-demo.jpeg", alt: "Alerte GPS reçue sur un téléphone", caption: "Exemple d’alerte GPS sur smartphone" },
      { src: "assets/jct-vehicle.jpe", alt: "Véhicule suivi par GPS sur la route", caption: "Suivi GPS d’un véhicule" },
      { src: "assets/camera-gallery-2.jpe", alt: "Autobus pouvant être équipé d’un système GPS", caption: "Suivi de véhicules de transport" },
      { src: "assets/camera-gallery-3.jpe", alt: "Tricycle de transport pouvant être suivi par GPS", caption: "Suivi de flotte et véhicules de proximité" }
    ]
  },
  camera: {
    title: "Caméras de surveillance",
    images: [
      { src: "Camera%20de%20surveillance.png", alt: "Caméra de surveillance installée en extérieur", caption: "Exemple d’installation extérieure" },
      { src: "photos/camera3.webp", alt: "Caméra dôme installée sur un mur en pierre", caption: "Caméra dôme extérieure" },
      { src: "photos/camera4.jpg", alt: "Caméra dôme de surveillance devant une maison", caption: "Caméra dôme pour une résidence" },
      { src: "photos/camera5.jpg", alt: "Gros plan d’une caméra dôme de vidéosurveillance", caption: "Caméra dôme pour la surveillance intérieure" },
      { src: "photos/camera6.jpg", alt: "Plusieurs caméras de surveillance installées sur un poteau", caption: "Installation de plusieurs caméras extérieures" }
    ]
  },
  solar: {
    title: "Énergie solaire",
    images: [
      { src: "assets/solaire-toiture-istock.jpg", alt: "Panneaux solaires installés sur une maison", caption: "Panneaux solaires sur toiture" },
      { src: "photos/solaire1.jpg", alt: "Rangées de panneaux solaires au coucher du soleil", caption: "Champ de panneaux photovoltaïques" },
      { src: "photos/solaire2.jpg", alt: "Panneaux solaires installés sur le toit d’une maison", caption: "Installation solaire sur toiture" },
      { src: "photos/solaire3.jpg", alt: "Panneaux solaires installés au sol", caption: "Installation photovoltaïque au sol" },
      { src: "photos/solaire4.jpg", alt: "Panneaux solaires sur le toit d’une maison sous un ciel bleu", caption: "Panneaux solaires résidentiels" }
    ]
  },
  air: {
    title: "Climatisation",
    images: [
      { src: "photos/clime%201.jpg", alt: "Unité extérieure de climatisation en cours d’installation", caption: "Installation de l’unité extérieure" },
      { src: "photos/clime%202.jpg", alt: "Unités intérieure et extérieure d’un système de climatisation", caption: "Unités intérieure et extérieure" },
      { src: "photos/clime%203.webp", alt: "Climatiseur mural installé dans une pièce", caption: "Climatiseur mural" },
      { src: "photos/clime%204.jpg", alt: "Outils et équipement de maintenance de climatisation", caption: "Entretien d’un système de climatisation" },
      { src: "photos/clime%205.avif", alt: "Équipement de climatisation", caption: "Équipement de climatisation" }
    ]
  }
};

let activeGallery = null;
let activeGalleryIndex = 0;
let galleryOpener = null;

function showGalleryImage(index) {
  if (!activeGallery) return;
  const images = activeGallery.images;
  activeGalleryIndex = (index + images.length) % images.length;
  const photo = images[activeGalleryIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryTitle.textContent = activeGallery.title;
  galleryCount.textContent = `Photo ${activeGalleryIndex + 1} sur ${images.length}`;
  galleryCaption.textContent = photo.caption;
}

function openServiceGallery(trigger) {
  if (!serviceGallery || typeof serviceGallery.showModal !== "function") return;
  activeGallery = serviceGalleryContent[trigger.dataset.serviceGallery];
  if (!activeGallery) return;
  galleryOpener = trigger;
  showGalleryImage(0);
  serviceGallery.showModal();
}

document.querySelectorAll("[data-service-gallery]").forEach((trigger) => {
  trigger.addEventListener("click", () => openServiceGallery(trigger));
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openServiceGallery(trigger);
    }
  });
});

galleryPrevious?.addEventListener("click", () => showGalleryImage(activeGalleryIndex - 1));
galleryNext?.addEventListener("click", () => showGalleryImage(activeGalleryIndex + 1));
galleryClose?.addEventListener("click", () => serviceGallery.close());
serviceGallery?.addEventListener("click", (event) => {
  if (event.target === serviceGallery) serviceGallery.close();
});
serviceGallery?.addEventListener("close", () => galleryOpener?.focus());
serviceGallery?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showGalleryImage(activeGalleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(activeGalleryIndex + 1);
});

if (menuToggle && mainNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    mainNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Fermer le menu");
      mainNav.classList.add("is-open");
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (menuToggle.getAttribute("aria-expanded") === "true"
      && !mainNav.contains(event.target)
      && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.querySelectorAll(".service-quote").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service");
    const matchingOption = Array.from(serviceSelect.options).find((option) => option.textContent === link.dataset.service);
    if (matchingOption) serviceSelect.value = matchingOption.value;
  });
});

const fieldRules = {
  name: {
    validate: (value) => value.trim().length >= 2,
    message: "Saisissez votre nom (au moins 2 caractères)."
  },
  phone: {
    validate: (value) => /^[+()\d\s.-]{7,20}$/.test(value.trim()) && value.replace(/\D/g, "").length >= 7,
    message: "Saisissez un numéro de téléphone valide."
  },
  city: {
    validate: (value) => value.trim().length > 0,
    message: "Indiquez votre ville."
  },
  service: {
    validate: (value) => value.trim().length > 0,
    message: "Choisissez le service qui vous intéresse."
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: "Décrivez votre besoin en 10 caractères minimum."
  }
};

function validateField(field) {
  const rule = fieldRules[field.name];
  const error = document.querySelector(`#${field.name}-error`);
  const isValid = rule.validate(field.value);
  field.setAttribute("aria-invalid", String(!isValid));
  error.textContent = isValid ? "" : rule.message;
  return isValid;
}

if (form) {
  const contactMemoryKey = "jct-contact-form-memory";
  const contactFields = Object.keys(fieldRules).map((name) => form.elements.namedItem(name));
  const clearContactMemory = document.querySelector("#clear-contact-memory");

  try {
    const savedContact = JSON.parse(localStorage.getItem(contactMemoryKey) || "null");
    if (savedContact && typeof savedContact === "object") {
      contactFields.forEach((field) => {
        if (typeof savedContact[field.name] === "string") field.value = savedContact[field.name];
      });
    }
  } catch (error) {
    console.warn("Les informations mémorisées du formulaire n’ont pas pu être restaurées.", error);
  }

  function saveContactMemory() {
    const savedContact = Object.fromEntries(contactFields.map((field) => [field.name, field.value]));
    try {
      localStorage.setItem(contactMemoryKey, JSON.stringify(savedContact));
    } catch (error) {
      console.warn("Les informations du formulaire n’ont pas pu être mémorisées.", error);
    }
  }

  Object.keys(fieldRules).forEach((name) => {
    const field = form.elements.namedItem(name);
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      saveContactMemory();
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      saveContactMemory();
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  clearContactMemory?.addEventListener("click", () => {
    try {
      localStorage.removeItem(contactMemoryKey);
    } catch (error) {
      console.warn("Les informations mémorisées n’ont pas pu être effacées.", error);
    }
    form.reset();
    contactFields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      document.querySelector(`#${field.name}-error`).textContent = "";
    });
    formStatus.textContent = "Les informations mémorisées ont été effacées.";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveContactMemory();
    formStatus.textContent = "";
    const fields = Object.keys(fieldRules).map((name) => form.elements.namedItem(name));
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      formStatus.textContent = "Veuillez corriger les champs indiqués avant de continuer.";
      fields.find((field) => field.getAttribute("aria-invalid") === "true").focus();
      return;
    }

    const data = new FormData(form);
    const message = `Bonjour JC Technology, je suis ${data.get("name").trim()} de ${data.get("city").trim()}. Service : ${data.get("service")}. Mon numéro : ${data.get("phone").trim()}. Message : ${data.get("message").trim()}`;
    if (!openWhatsAppChooser(message)) {
      formStatus.textContent = "WhatsApp n’a pas pu s’ouvrir. Vérifiez le blocage des fenêtres ou contactez-nous directement.";
      return;
    }
    formStatus.textContent = "Choisissez le numéro WhatsApp auquel envoyer votre demande.";
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const statCounters = document.querySelectorAll(".stat-count");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion && "IntersectionObserver" in window) {
  statCounters.forEach((counter) => {
    counter.textContent = `${counter.dataset.prefix || ""}0`;
  });
}

function setFinalStatValues() {
  statCounters.forEach((counter) => {
    counter.textContent = `${counter.dataset.prefix || ""}${counter.dataset.count}`;
  });
}

function animateStatCounter(counter) {
  const target = Number(counter.dataset.count);
  const prefix = counter.dataset.prefix || "";
  const duration = 1600;
  let startTime;

  function updateCount(timestamp) {
    if (startTime === undefined) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = 1 - (1 - progress) ** 4;
    counter.textContent = `${prefix}${Math.round(target * easedProgress)}`;

    if (progress < 1) window.requestAnimationFrame(updateCount);
  }

  window.requestAnimationFrame(updateCount);
}

if (statCounters.length) {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    setFinalStatValues();
  } else {
    const statsObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStatCounter(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    statCounters.forEach((counter) => statsObserver.observe(counter));
  }
}
