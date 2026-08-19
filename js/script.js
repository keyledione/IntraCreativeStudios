/**
 * Intra Creative Studios - Main JavaScript
 * All interactive features bundled in one file
 */

(function () {
  "use strict";

  // ============================================================
  // DOM REFS
  // ============================================================
  const header = document.getElementById("site-header");
  const progress = document.getElementById("scroll-progress");
  const glow = document.getElementById("cursor-glow");
  const toTop = document.getElementById("to-top");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const bookCallBtns = document.querySelectorAll(
    "#bookCallBtn, #bookCallBtnDesktop",
  );
  const contactForm = document.getElementById("contactForm");
  const modalForm = document.getElementById("modalForm");
  const typingEl = document.getElementById("typing-text");
  const yearEl = document.getElementById("year");

  // ============================================================
  // 1. THEME TOGGLE with localStorage persistence
  // ============================================================
  function initTheme() {
    const saved = localStorage.getItem("intra-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    if (saved === "light") {
      document
        .querySelector(".logo-dark")
        ?.style.setProperty("display", "none");
      document
        .querySelector(".logo-light")
        ?.style.setProperty("display", "block");
    }
  }
  initTheme();

  themeToggle?.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("intra-theme", next);
    // Toggle logo images
    const darkLogo = document.querySelector(".logo-dark");
    const lightLogo = document.querySelector(".logo-light");
    if (darkLogo && lightLogo) {
      if (next === "light") {
        darkLogo.style.display = "none";
        lightLogo.style.display = "block";
      } else {
        darkLogo.style.display = "block";
        lightLogo.style.display = "none";
      }
    }
  });

  // ============================================================
  // 2. SCROLL PROGRESS + HEADER + BACK TO TOP
  // ============================================================
  let ticking = false;

  function handleScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (scrollTop / max) * 100 : 0;

    if (progress) progress.style.width = pct + "%";
    if (header) header.classList.toggle("scrolled", scrollTop > 30);
    if (toTop) toTop.classList.toggle("show", scrollTop > 500);

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true },
  );

  handleScroll();

  toTop?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ============================================================
  // 3. CURSOR GLOW (desktop only, reduced motion aware)
  // ============================================================
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = window.matchMedia("(hover: hover)").matches;

  if (!reduced && hover && glow) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    window.addEventListener("mousemove", function (e) {
      x = e.clientX;
      y = e.clientY;
    });

    function glowLoop() {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      glow.style.transform =
        "translate(" + cx + "px, " + cy + "px) translate(-50%, -50%)";
      requestAnimationFrame(glowLoop);
    }
    glowLoop();
  } else if (glow) {
    glow.style.display = "none";
  }

  // ============================================================
  // 4. HAMBURGER MENU
  // ============================================================
  hamburger?.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks?.classList.toggle("active");
  });

  // Close menu on link click (mobile)
  navLinks?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger?.classList.remove("active");
      navLinks?.classList.remove("active");
    });
  });

  // ============================================================
  // 5. MODAL (Book a Call) - FIXED
  // ============================================================
  function openModal() {
    console.log("Modal opening...");
    if (modalOverlay) {
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      console.error("Modal overlay not found!");
    }
  }

  function closeModal() {
    console.log("Modal closing...");
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Add click events to all Book a Call buttons
  bookCallBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Book a Call button clicked");
      openModal();
    });
  });

  // Close modal on X button
  modalClose?.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
  });

  // Close modal on overlay click (clicking outside the modal)
  modalOverlay?.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Modal form submission
  modalForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("modalName")?.value.trim();
    const email = document.getElementById("modalEmail")?.value.trim();
    const phone = document.getElementById("modalPhone")?.value.trim();

    if (name && email && phone) {
      alert("Thank you, " + name + "! We will contact you within 24 hours.");
      closeModal();
      modalForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });

  // ============================================================
  // 6. CONTACT FORM VALIDATION
  // ============================================================
  function validateField(input, errorId, condition) {
    const errorEl = document.getElementById(errorId);
    if (!condition) {
      input.classList.add("error");
      input.classList.remove("success");
      if (errorEl) errorEl.classList.add("show");
      return false;
    } else {
      input.classList.remove("error");
      input.classList.add("success");
      if (errorEl) errorEl.classList.remove("show");
      return true;
    }
  }

  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameValid = validateField(
      name,
      "nameError",
      name.value.trim().length >= 2,
    );
    const emailValid = validateField(
      email,
      "emailError",
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
    );
    const msgValid = validateField(
      message,
      "messageError",
      message.value.trim().length >= 10,
    );

    if (nameValid && emailValid && msgValid) {
      const success = document.getElementById("form-success");
      if (success) {
        success.classList.add("show");
        contactForm.reset();
        // Remove success class from fields
        document
          .querySelectorAll(".field input, .field textarea")
          .forEach(function (el) {
            el.classList.remove("success", "error");
          });
        // Hide success after 5 seconds
        setTimeout(function () {
          success.classList.remove("show");
        }, 5000);
      }
    }
  });

  // Real-time validation on blur
  document
    .querySelectorAll(".field input, .field textarea")
    .forEach(function (field) {
      field.addEventListener("blur", function () {
        const id = this.id;
        if (id === "name") {
          validateField(this, "nameError", this.value.trim().length >= 2);
        } else if (id === "email") {
          validateField(
            this,
            "emailError",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim()),
          );
        } else if (id === "message") {
          validateField(this, "messageError", this.value.trim().length >= 10);
        }
      });
    });

  // ============================================================
  // 7. TESTIMONIAL SLIDER
  // ============================================================
  const sliderTrack = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");

  if (sliderTrack) {
    const slides = sliderTrack.querySelectorAll(".slide");
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.setAttribute("data-index", i);
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", function () {
          goToSlide(parseInt(this.getAttribute("data-index")));
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      sliderTrack.style.transform = "translateX(-" + currentIndex * 100 + "%)";

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll("button").forEach(function (dot, i) {
          dot.classList.toggle("active", i === currentIndex);
        });
      }
    }

    prevBtn?.addEventListener("click", function () {
      goToSlide(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", function () {
      goToSlide(currentIndex + 1);
    });

    // Auto-play (pause on hover)
    let autoPlay = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, 5000);

    const slider = document.getElementById("testimonialSlider");
    slider?.addEventListener("mouseenter", function () {
      clearInterval(autoPlay);
    });
    slider?.addEventListener("mouseleave", function () {
      autoPlay = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
  }

  // ============================================================
  // 8. REVEAL ON SCROLL (IntersectionObserver)
  // ============================================================
  const revealEls = document.querySelectorAll(".reveal-up");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ============================================================
  // 9. PORTFOLIO TILT CARDS
  // ============================================================
  const pfGrid = document.getElementById("pf-grid");
  if (pfGrid && !reduced) {
    const cards = pfGrid.querySelectorAll("[data-tilt]");

    cards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        pfGrid.classList.add("hovering");
      });

      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 14;
        const ry = (px - 0.5) * 14;
        card.style.transform =
          "rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(8px)";
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
        pfGrid.classList.remove("hovering");
      });
    });
  }

  // ============================================================
  // 10. FOOTER TYPING EFFECT
  // ============================================================
  if (typingEl) {
    const lines = [
      "Bring your brands into a reality.",
      "Ideas, given visual form.",
      "Branding. Design. Photography. Videography.",
      "Stories worth stopping to look at.",
    ];
    let li = 0;
    let ci = 0;
    let deleting = false;

    function typeTick() {
      const full = lines[li];
      ci += deleting ? -1 : 1;
      typingEl.textContent = full.slice(0, ci);

      let delay = deleting ? 35 : 60;

      if (!deleting && ci === full.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
        delay = 300;
      }

      setTimeout(typeTick, delay);
    }
    typeTick();
  }

  // ============================================================
  // 11. DYNAMIC YEAR
  // ============================================================
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 12. MAGNETIC BUTTONS (desktop only)
  // ============================================================
  if (!reduced && hover) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width / 2;
        const relY = e.clientY - r.top - r.height / 2;
        btn.style.transform =
          "translate(" + relX * 0.25 + "px, " + relY * 0.35 + "px) scale(1.04)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  // ============================================================
  // 13. SMOOTH ANCHOR SCROLL (for internal links)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 80;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  console.log("✅ Intra Creative Studios - All scripts loaded!");
})();
