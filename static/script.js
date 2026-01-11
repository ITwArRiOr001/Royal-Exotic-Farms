/* ---- SCROLL REVEAL (Sections)---- */
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
  reveal(); // initial
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
   MOBILE MENU
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
   PRODUCT FILTERS (If Exists)
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
   FLASH AUTO DISMISS
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

/* ---------------------------
   INIT ON LOAD
--------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initModalSafety();
  initAccordion();
  initFlashDismiss();

  /* Product filter bindings (safe if missing) */
  document.getElementById("category-filter")?.addEventListener("change", applyProductFilters);
  document.getElementById("search-bar")?.addEventListener("input", applyProductFilters);
  applyProductFilters();

  /* Mobile menu close on link click */
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
  });

  document.querySelector(".overlay")?.addEventListener("click", toggleMobileMenu);
});
