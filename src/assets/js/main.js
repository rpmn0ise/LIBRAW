/* ═══════════════════════════════════════════════════════════════
   LIBRAW — main.js
   Recherche client-side, filtres niveau, nav mobile
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSearch();
  initFilters();
  initNiveauFilters();
});

/* ─── Mobile nav ──────────────────────────────────────────────── */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ─── Search ──────────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  const cards = document.querySelectorAll(".ressource-card, .guide-card");
  const noResults = document.querySelector(".no-results");

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;

    cards.forEach((card) => {
      if (card.classList.contains("filter-hidden")) return;

      const title = (card.dataset.title || card.querySelector(".card-title, .guide-card-link")?.textContent || "").toLowerCase();
      const desc = (card.dataset.description || card.querySelector(".card-description, .guide-card-description")?.textContent || "").toLowerCase();
      const cat = (card.dataset.categorie || "").toLowerCase();
      const tags = Array.from(card.querySelectorAll(".tag")).map((t) => t.textContent.toLowerCase()).join(" ");

      const match = !q || title.includes(q) || desc.includes(q) || cat.includes(q) || tags.includes(q);

      card.classList.toggle("hidden", !match);
      if (match) visible++;
    });

    if (noResults) {
      noResults.classList.toggle("visible", visible === 0 && q.length > 0);
    }
  });
}

/* ─── Category filters (categorie page) ──────────────────────── */
function initFilters() {
  const filterBar = document.getElementById("filter-bar");
  if (!filterBar) return;

  const btns = filterBar.querySelectorAll(".filter-btn[data-filter]");
  if (!btns.length) return;

  const isNiveauFilter = Array.from(btns).some((b) =>
    ["debutant", "avance", "expert", "all"].includes(b.dataset.filter)
  );
  if (isNiveauFilter) return; // Handled by initNiveauFilters

  const cards = document.querySelectorAll(".ressource-card");
  const noResults = document.querySelector(".no-results");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.filter;
      let visible = 0;

      cards.forEach((card) => {
        const match = f === "all" || card.dataset.categorie === f;
        card.classList.toggle("filter-hidden", !match);
        card.classList.toggle("hidden", !match);
        if (match) visible++;
      });

      if (noResults) {
        noResults.classList.toggle("visible", visible === 0);
      }
    });
  });
}

/* ─── Niveau filters (guides page) ───────────────────────────── */
function initNiveauFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn[data-niveau]");
  if (!filterBtns.length) return;

  const cards = document.querySelectorAll(".guide-card");
  const noResults = document.querySelector(".no-results");
  const searchInput = document.getElementById("search-input");

  function applyFilters() {
    const activeNiveau = document.querySelector(".filter-btn[data-niveau].active")?.dataset.niveau || "all";
    const activeCategorie = document.querySelector(".filter-btn[data-categorie].active")?.dataset.categorie || "all";
    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let visible = 0;

    cards.forEach((card) => {
      const niveauMatch = activeNiveau === "all" || card.dataset.niveau === activeNiveau;
      const catMatch = activeCategorie === "all" || card.dataset.categorie === activeCategorie;

      const title = (card.querySelector(".guide-card-link")?.textContent || "").toLowerCase();
      const desc = (card.querySelector(".guide-card-description")?.textContent || "").toLowerCase();
      const searchMatch = !q || title.includes(q) || desc.includes(q);

      const show = niveauMatch && catMatch && searchMatch;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });

    if (noResults) {
      noResults.classList.toggle("visible", visible === 0);
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.niveau !== undefined ? "[data-niveau]" : "[data-categorie]";
      document.querySelectorAll(`.filter-btn${group}`).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  const catBtns = document.querySelectorAll(".filter-btn[data-categorie]");
  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
}

/* ─── Smooth anchor scroll ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
