/* ═══════════════════════════════════════════════════════════════
   LIBRAW — main.js v3.0
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSearch();
  initFilters();
  initNiveauFilters();
  initTOC();
  initGlobalSearch();
});

/* ─── Mobile nav (sidebar toggle) ───────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const sidebar = document.getElementById("site-sidebar");
  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !sidebar.contains(e.target)) {
      sidebar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ─── Search (cat pages, row-based) ──────────────────────────── */
function initSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  const rows = document.querySelectorAll(".ressource-row");
  const noResults = document.querySelector(".no-results");
  if (!rows.length) return;

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;

    rows.forEach((row) => {
      if (row.classList.contains("filter-hidden")) return;
      const title = (row.dataset.title || "").toLowerCase();
      const desc = (row.dataset.description || "").toLowerCase();
      const cat = (row.dataset.categorie || "").toLowerCase();
      const tags = Array.from(row.querySelectorAll(".tag"))
        .map((t) => t.textContent.toLowerCase()).join(" ");
      const match = !q || title.includes(q) || desc.includes(q) || cat.includes(q) || tags.includes(q);
      row.classList.toggle("hidden", !match);
      if (match) visible++;
    });

    if (noResults) noResults.classList.toggle("visible", visible === 0 && q.length > 0);
  });
}

/* ─── Filter buttons (niveau on cat pages) ───────────────────── */
function initFilters() {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;

  const btns = document.querySelectorAll(".filter-btn[data-filter]");
  if (!btns.length) return;

  const rows = document.querySelectorAll(".ressource-row");
  const noResults = document.querySelector(".no-results");
  const searchInput = document.getElementById("search-input");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.filter;
      const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
      let visible = 0;

      rows.forEach((row) => {
        const niveauMatch = f === "all" || row.dataset.niveau === f;
        const title = (row.dataset.title || "").toLowerCase();
        const desc = (row.dataset.description || "").toLowerCase();
        const searchMatch = !q || title.includes(q) || desc.includes(q);
        const show = niveauMatch && searchMatch;
        row.classList.toggle("filter-hidden", !niveauMatch);
        row.classList.toggle("hidden", !show);
        if (show) visible++;
      });

      if (noResults) noResults.classList.toggle("visible", visible === 0);
    });
  });
}

/* ─── Niveau + catégorie filters (guides page) ───────────────── */
function initNiveauFilters() {
  const niveauBtns = document.querySelectorAll(".filter-btn[data-niveau]");
  const catBtns = document.querySelectorAll(".filter-btn[data-categorie]");
  if (!niveauBtns.length) return;

  const rows = document.querySelectorAll(".guide-row");
  const noResults = document.querySelector(".no-results");
  const searchInput = document.getElementById("search-input");

  function apply() {
    const activeNiveau = document.querySelector(".filter-btn[data-niveau].active")?.dataset.niveau || "all";
    const activeCategorie = document.querySelector(".filter-btn[data-categorie].active")?.dataset.categorie || "all";
    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let visible = 0;

    rows.forEach((row) => {
      const niveauMatch = activeNiveau === "all" || row.dataset.niveau === activeNiveau;
      const catMatch = activeCategorie === "all" || row.dataset.categorie === activeCategorie;
      const title = (row.querySelector(".guide-row-title")?.textContent || "").toLowerCase();
      const desc = (row.querySelector(".guide-row-desc")?.textContent || "").toLowerCase();
      const searchMatch = !q || title.includes(q) || desc.includes(q);
      const show = niveauMatch && catMatch && searchMatch;
      row.classList.toggle("hidden", !show);
      if (show) visible++;
    });

    if (noResults) noResults.classList.toggle("visible", visible === 0);
  }

  niveauBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      niveauBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply();
    });
  });

  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply();
    });
  });

  if (searchInput) searchInput.addEventListener("input", apply);
}

/* ─── Guide TOC ──────────────────────────────────────────────── */
function initTOC() {
  const body = document.getElementById("guide-body");
  const tocLinks = document.getElementById("toc-links");
  if (!body || !tocLinks) return;

  const headings = body.querySelectorAll("h2, h3");
  if (headings.length === 0) {
    document.getElementById("toc")?.style.setProperty("display", "none");
    return;
  }

  headings.forEach((h) => {
    if (!h.id) {
      h.id = h.textContent.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = `toc-link toc-${h.tagName.toLowerCase()}`;
    tocLinks.appendChild(a);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = tocLinks.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) link.classList.toggle("active", entry.isIntersecting);
      });
    },
    { rootMargin: "0px 0px -70% 0px" }
  );
  headings.forEach((h) => observer.observe(h));
}

/* ─── Global search (header) — Ctrl+K focus ─────────────────── */
function initGlobalSearch() {
  const input = document.getElementById("global-search");
  if (!input) return;

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === "Escape") input.blur();
  });
}

/* ─── Smooth anchor scroll ───────────────────────────────────── */
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
