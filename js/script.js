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
// Portfolio Gallery Switcher
// Inner Pages
// =====================================

const portfolioCards = document.querySelectorAll(".portfolio-service-card");

const galleries = document.querySelectorAll(".portfolio-gallery");

portfolioCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const galleryId = card.dataset.gallery;

    // Find the gallery BEFORE using it
    const selectedGallery = document.getElementById(galleryId);

    // If the gallery doesn't exist, stop here
    if (!selectedGallery) {
      console.warn(`Gallery with ID "${galleryId}" was not found.`);
      return;
    }

    // Remove active state from all cards
    portfolioCards.forEach((item) => {
      item.classList.remove("active");
    });

    // Hide all galleries
    galleries.forEach((gallery) => {
      gallery.classList.remove("active-gallery");
    });

    // Activate selected card
    card.classList.add("active");

    // Show selected gallery
    selectedGallery.classList.add("active-gallery");

    // Scroll to selected gallery
    setTimeout(() => {
      window.scrollTo({
        top: selectedGallery.offsetTop - 110,
        behavior: "smooth",
      });
    }, 100);
  });
});

// =====================================
// SCROLL REVEAL
// =====================================

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

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// =====================================
// SCROLL PROGRESS BAR
// =====================================

window.addEventListener("scroll", function () {
  const scrollProgress = document.querySelector(".scroll-progress");

  // Stop if this element doesn't exist on the page
  if (!scrollProgress) return;

  const scrollTop = document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // Avoid division by zero
  if (scrollHeight <= 0) return;

  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  scrollProgress.style.width = scrollPercentage + "%";
});

// =====================================
// CONTACT FORM SUBMIT BUTTON
// =====================================

const contactForm = document.getElementById("contact-form");

const submitButton = document.getElementById("submit-button");

if (contactForm && submitButton) {
  contactForm.addEventListener("submit", function () {
    submitButton.disabled = true;

    submitButton.textContent = "Sending...";
  });
}

// =====================================
// WEBSITE LOADER
// =====================================

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(function () {
      loader.classList.add("loader-hidden");
    }, 500);
  }
});

// =====================================
// IMAGE LIGHTBOX
// =====================================

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxClose = document.getElementById("lightbox-close");

// Only run lightbox code if all required
// elements exist on the page

if (lightbox && lightboxImage && lightboxClose) {
  const galleryImages = document.querySelectorAll(".gallery-item img");

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      lightbox.classList.add("active");

      lightboxImage.src = image.src;

      lightboxImage.alt = image.alt;

      document.body.style.overflow = "hidden";
    });
  });

  // Close button

  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  });

  // Click outside image

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      lightbox.classList.remove("active");

      document.body.style.overflow = "";
    }
  });

  // Escape key

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      lightbox.classList.remove("active");

      document.body.style.overflow = "";
    }
  });
}
