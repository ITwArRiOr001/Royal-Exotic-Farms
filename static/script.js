/* =========================================================
   SCROLL REVEAL – SECTIONS
   ========================================================= */
function initScrollReveal() {
  const sections = document.querySelectorAll("section, .surface");

  const reveal = () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        sec.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", reveal, { passive: true });
  reveal();
}

/* =========================================================
   MODALS
   ========================================================= */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.showModal();
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.close();
  document.body.style.overflow = "";
}

function initModalSafety() {
  document.querySelectorAll("dialog.modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.close();
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog.modal").forEach(m => m.close());
      document.body.style.overflow = "";
    }
  });
}

/* =========================================================
   MOBILE MENU
   ========================================================= */
function toggleMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  if (!menu || !overlay) return;

  const isOpen = menu.classList.toggle("open");
  overlay.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
}

/* =========================================================
   FAQ
   ========================================================= */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

/* =========================================================
   FLASH MESSAGES
   ========================================================= */
function initFlashDismiss() {
  setTimeout(() => {
    document.querySelectorAll(".flash-message").forEach(msg => {
      msg.style.opacity = "0";
      setTimeout(() => msg.remove(), 400);
    });
  }, 3000);
}

/* =========================================================
   VIDEO FADE-IN
   ========================================================= */
function initVideoFadeIn() {
  document.querySelectorAll(".card video").forEach(video => {
    video.addEventListener(
      "loadeddata",
      () => video.classList.add("is-loaded"),
      { once: true }
    );
  });
}

/* =========================================================
   PAUSE VIDEOS OFF-SCREEN (DESKTOP ONLY)
   ========================================================= */
function initCardVideoObserver() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const videos = document.querySelectorAll(".card video");
  if (!videos.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target;

        if (!entry.isIntersecting) {
          video.pause();
          video.currentTime = 0;
          video.dataset.visible = "false";
        } else {
          video.dataset.visible = "true";
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach(video => observer.observe(video));
}

/* =========================================================
   HOVER PLAY (DESKTOP ONLY)
   ========================================================= */
function initCardVideoHover() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".card").forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    card.addEventListener("mouseenter", () => {
      if (video.dataset.visible === "true") {
        video.play().catch(() => {});
      }
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

/* =========================================================
   IMAGE-ONLY SCROLL REVEAL (ELITE)
   ========================================================= */
function initImageReveal() {
  const images = document.querySelectorAll(".image-block");

  if (!("IntersectionObserver" in window) || images.length === 0) {
    images.forEach(img => img.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -120px 0px",
      threshold: 0.15
    }
  );

  images.forEach(img => observer.observe(img));
}

/* =========================================================
   INIT – SINGLE SOURCE OF TRUTH (RENDER SAFE)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  // Reset mobile state
  document.querySelector(".mobile-menu")?.classList.remove("open");
  document.querySelector(".overlay")?.classList.remove("open");
  document.body.style.overflow = "";

  // Core UX
  initScrollReveal();
  initModalSafety();
  initFAQ();
  initFlashDismiss();

  // Media polish
  initVideoFadeIn();
  initCardVideoObserver();
  initCardVideoHover();
  initImageReveal();

  // Mobile nav links
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
  });

  document.querySelector(".overlay")
    ?.addEventListener("click", toggleMobileMenu);
});
