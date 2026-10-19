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
const whatsappClose = whatsappChooser?.querySelector(".whatsapp-chooser-close");
const whatsappTargets = whatsappChooser?.querySelectorAll('input[name="whatsapp-target"]');
const whatsappPrepareButton = document.querySelector("#whatsapp-prepare-button");
const whatsappPrepareStatus = document.querySelector("#whatsapp-prepare-status");
const whatsappPrepared = document.querySelector("#whatsapp-prepared");
const whatsappPreparedLinks = document.querySelector("#whatsapp-prepared-links");
let pendingWhatsAppMessage = "";

function openWhatsAppChooser(message) {
  if (!whatsappChooser || typeof whatsappChooser.showModal !== "function" || !whatsappTargets) {
    const whatsappWindow = window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    return Boolean(whatsappWindow);
  }

  pendingWhatsAppMessage = message;
  whatsappTargets.forEach((target) => {
    target.checked = false;
  });
  whatsappPrepared.hidden = true;
  whatsappPreparedLinks.replaceChildren();
  whatsappPrepareStatus.textContent = "";
  whatsappChooser.showModal();
  return true;
}

whatsappTargets?.forEach((target) => {
  target.addEventListener("change", () => {
    whatsappPrepared.hidden = true;
    whatsappPrepareStatus.textContent = "";
  });
});

whatsappPrepareButton?.addEventListener("click", () => {
  const selectedTargets = Array.from(whatsappTargets || []).filter((target) => target.checked);
  if (!selectedTargets.length) {
    whatsappPrepareStatus.textContent = "Sélectionnez au moins un numéro.";
    return;
  }

  whatsappPreparedLinks.replaceChildren();
  selectedTargets.forEach((target) => {
    const number = WHATSAPP_NUMBERS[Number(target.value)];
    const link = document.createElement("a");
    link.className = "whatsapp-option";
    link.dataset.whatsappOption = "";
    link.href = whatsappUrl(pendingWhatsAppMessage, number);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append("Ouvrir WhatsApp ");
    const phone = document.createElement("strong");
    phone.textContent = `+${number}`;
    link.append(phone);
    whatsappPreparedLinks.append(link);
  });

  whatsappPrepared.hidden = false;
  whatsappPrepareStatus.textContent = selectedTargets.length === 2
    ? "Les deux conversations sont prêtes. Ouvrez-les une par une."
    : "La conversation sélectionnée est prête.";
});

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
  Object.keys(fieldRules).forEach((name) => {
    const field = form.elements.namedItem(name);
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
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
    formStatus.textContent = "Sélectionnez un ou deux numéros WhatsApp pour préparer votre demande.";
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
