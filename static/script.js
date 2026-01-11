/* ===============SCROLL REVEAL (Optimized)============= */
function initScrollReveal() {
  const sections = document.querySelectorAll("section");
  let ticking = false;

  function reveal() {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        sec.classList.add("visible");
      }
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(reveal);
      ticking = true;
    }
  }, { passive: true });

  reveal(); // initial trigger
}

/* =========================================================
   MODALS
   ========================================================= */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "";
}

function initModalSafety() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal").forEach(m => closeModal(m.id));
    }
  });
}

/* =========================================================
   MOBILE MENU (BODY LOCKED)
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
   FAQ ACCORDION (MATCHES .faq-item)
   ========================================================= */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

/* =========================================================
   PRODUCT FILTERS (SAFE)
   ========================================================= */
function normalize(text) {
  return (text || "").toLowerCase().trim();
}

function applyProductFilters() {
  const category = document.getElementById("category-filter");
  const search = document.getElementById("search-bar");
  const cards = document.querySelectorAll(".product-card");

  if (!category || !search || !cards.length) return;

  const catVal = category.value;
  const query = normalize(search.value);

  cards.forEach(card => {
    const title = normalize(card.querySelector("h4")?.textContent);
    const desc = normalize(card.querySelector("p")?.textContent);
    const cardCat = card.dataset.category || "all";

    const matchCat = catVal === "all" || cardCat === catVal;
    const matchText = !query || title.includes(query) || desc.includes(query);

    card.style.display = matchCat && matchText ? "" : "none";
  });
}

/* =========================================================
   FLASH AUTO DISMISS
   ========================================================= */
function initFlashDismiss() {
  setTimeout(() => {
    document.querySelectorAll(".flash-message").forEach(msg => {
      msg.style.opacity = "0";
      msg.style.transform = "translateY(-10px)";
      setTimeout(() => msg.remove(), 400);
    });
  }, 3000);
}

/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* =========================================================
   RESPONSIVE SAFETY
   ========================================================= */
function initResizeSafety() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document.querySelector(".mobile-menu")?.classList.remove("open");
      document.querySelector(".overlay")?.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* Force safe default UI state */
  document.querySelector(".mobile-menu")?.classList.remove("open");
  document.querySelector(".overlay")?.classList.remove("open");
  document.body.style.overflow = "";

  initScrollReveal();
  initModalSafety();
  initFAQ();
  initFlashDismiss();
  initSmoothScroll();
  initResizeSafety();

  /* Filters (safe) */
  document.getElementById("category-filter")
    ?.addEventListener("change", applyProductFilters);

  document.getElementById("search-bar")
    ?.addEventListener("input", applyProductFilters);

  applyProductFilters();

  /* Close mobile menu on link click */
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
  });

  document.querySelector(".overlay")
    ?.addEventListener("click", toggleMobileMenu);
});
