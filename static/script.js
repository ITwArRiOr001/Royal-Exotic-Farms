/* ===================== SCROLL REVEAL ===================== */
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

/* ===================== MODALS ===================== */
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

/* ===================== MOBILE MENU ===================== */
function toggleMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  if (!menu || !overlay) return;

  const isOpen = menu.classList.toggle("open");
  overlay.classList.toggle("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
}

/* ===================== FAQ ===================== */
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

/* ===================== FLASH ===================== */
function initFlashDismiss() {
  setTimeout(() => {
    document.querySelectorAll(".flash-message").forEach(msg => {
      msg.style.opacity = "0";
      setTimeout(() => msg.remove(), 400);
    });
  }, 3000);
}

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {

  // Force safe defaults
  document.querySelector(".mobile-menu")?.classList.remove("open");
  document.querySelector(".overlay")?.classList.remove("open");
  document.body.style.overflow = "";

  initScrollReveal();
  initModalSafety();
  initFAQ();
  initFlashDismiss();

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
  });

  document.querySelector(".overlay")
    ?.addEventListener("click", toggleMobileMenu);
});
