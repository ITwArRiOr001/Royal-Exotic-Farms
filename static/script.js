/* ---------------------------   SCROLL REVEAL (Section)--------------------------- */
function initScrollReveal() {
  const sections = document.querySelectorAll("section");

  const reveal = () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        sec.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", reveal, { passive: true });
  reveal(); // initial trigger
}

/* ---------------------------
   MODALS (Open / Close)
--------------------------- */
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

/* Close modal on outside click + ESC */
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

/* ---------------------------
   MOBILE MENU (SAFE & ALIGNED)
--------------------------- */
function toggleMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const hamburger = document.querySelector(".hamburger");

  if (!menu || !overlay) return;

  menu.classList.toggle("open");
  overlay.classList.toggle("open");
  hamburger?.classList.toggle("open");
}

/* ---------------------------
   ACCORDION (FAQ)
--------------------------- */
function initAccordion() {
  document.querySelectorAll(".accordion-button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");
    });
  });
}

/* ---------------------------
   PRODUCT FILTERS (SAFE IF PAGE EXISTS)
--------------------------- */
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

/* ---------------------------
   FLASH MESSAGE AUTO DISMISS
--------------------------- */
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
   INIT ON LOAD – SAFE, ORDERED, GUARDED
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* 🔒 FORCE SAFE UI STATE ON LOAD */
  document.querySelector(".mobile-menu")?.classList.remove("open");
  document.querySelector(".overlay")?.classList.remove("open");

  /* Core initializers */
  initScrollReveal();
  initModalSafety();
  initAccordion();
  initFlashDismiss();

  /* Product filters (safe if page doesn’t have them) */
  document.getElementById("category-filter")
    ?.addEventListener("change", applyProductFilters);

  document.getElementById("search-bar")
    ?.addEventListener("input", applyProductFilters);

  applyProductFilters();

  /* Mobile menu close on navigation */
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.querySelector(".mobile-menu");
      if (menu?.classList.contains("open")) {
        toggleMobileMenu();
      }
    });
  });

  document.querySelector(".overlay")
    ?.addEventListener("click", toggleMobileMenu);
});
