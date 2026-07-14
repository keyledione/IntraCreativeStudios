// =====================================
// Services Accordion (Home Page)
// =====================================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  const header = card.querySelector(".service-header");

  if (!header) return;

  header.addEventListener("click", () => {
    const isActive = card.classList.contains("active");

    serviceCards.forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      card.classList.add("active");
    }
  });
});

// =====================================
// Portfolio Filter (Home Page)
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";

        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// =====================================
// Portfolio Gallery Switcher (Inner Pages)
// =====================================

const portfolioCards = document.querySelectorAll(".portfolio-service-card");
const galleries = document.querySelectorAll(".portfolio-gallery");

portfolioCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const galleryId = card.dataset.gallery;

    portfolioCards.forEach((item) => {
      item.classList.remove("active");
    });

    galleries.forEach((gallery) => {
      gallery.classList.remove("active-gallery");
    });

    setTimeout(() => {
      selectedGallery.classList.add("active-gallery");
    }, 250);

    card.classList.add("active");

    const selectedGallery = document.getElementById(galleryId);

    if (selectedGallery) {
      selectedGallery.classList.add("active-gallery");

      window.scrollTo({
        top: selectedGallery.offsetTop - 110,

        behavior: "smooth",
      });
    }
  });
});
/* ==================================
   SCROLL REVEAL
================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;

    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}
/* ==================================
   SCROLL PROGRESS BAR
================================== */

window.addEventListener("scroll", function () {
  const scrollProgress = document.querySelector(".scroll-progress");

  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  scrollProgress.style.width = scrollPercentage + "%";
});

/* ==================================
   CONTACT FORM SUBMIT BUTTON
================================== */

const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");

if (contactForm && submitButton) {
  contactForm.addEventListener("submit", function () {
    submitButton.disabled = true;

    submitButton.textContent = "Sending...";
  });
}

/* ==========================================
   WEBSITE LOADER
========================================== */

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(function () {
      loader.classList.add("loader-hidden");
    }, 500);
  }
});

/* ==================================
   IMAGE LIGHTBOX
================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

if (lightbox && lightboxImage && lightboxClose) {
  const galleryImages = document.querySelectorAll("img");

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      if (
        image.closest("header") ||
        image.closest("nav") ||
        image.closest("footer")
      ) {
        return;
      }

      lightbox.classList.add("active");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}
