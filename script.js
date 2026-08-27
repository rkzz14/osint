"use strict";

/*
  OSINT.WEB V3
  Front-end only.

  IMPORTANT :
  Ce site utilise uniquement des recherches publiques.
  Il ne prétend pas avoir trouvé une information
  lorsqu'aucun résultat réel n'a été obtenu.
*/


/* =========================
   HELPERS
========================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [...document.querySelectorAll(selector)];


function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}


function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================
   CLOCK
========================= */

function updateClock() {
  const clock = $("#clock");

  if (!clock) return;

  const now = new Date();

  clock.textContent = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

updateClock();

setInterval(updateClock, 1000);


/* =========================
   SIDEBAR MOBILE
========================= */

const sidebar = $("#sidebar");
const menuButton = $(".menu-button");

if (menuButton && sidebar) {
  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}


/* =========================
   NAVIGATION
========================= */

const navItems = $$(".nav-item");
const pages = $$(".page");

function openPage(pageName) {
  if (!pageName) return;

  pages.forEach((page) => {
    page.classList.toggle(
      "active",
      page.dataset.page === pageName
    );
  });

  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.page === pageName
    );
  });

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


navItems.forEach((item) => {
  item.addEventListener("click", () => {
    openPage(item.dataset.page);
  });
});


/* =========================
   QUICK CARDS
========================= */

$$("[data-open-page]").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.openPage);
  });
});


/* =========================
   IDENTITY SEARCH
========================= */

let identityType = "username";

const typeTabs = $$(".type-tab");

typeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {

    typeTabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    identityType = tab.dataset.type || "username";

    const input = $("#identityInput");

    if (!input) return;

    if (identityType === "email") {
      input.placeholder = "exemple@email.com";
    } else {
      input.placeholder = "Entrez un pseudo...";
    }
  });
});


function searchIdentity() {

  const input = $("#identityInput");

  if (!input) return;

  const value = input.value.trim();

  if (!value) {
    showToast("Entre un pseudo ou une adresse e-mail.");
    input.focus();
    return;
  }

  addHistory(identityType, value);

  const results = $("#identityResults");

  if (!results) return;

  const encoded = encodeURIComponent(value);

  const label =
    identityType === "email"
      ? "Recherche publique e-mail"
      : "Recherche publique username";

  results.innerHTML = `
    <div class="result-card">
      <div class="result-left">
        <div class="result-title">
          <span>◉</span>
          ${escapeHTML(label)}
        </div>

        <div class="result-url">
          Requête : ${escapeHTML(value)}
        </div>
      </div>

      <button
        class="result-action"
        data-search-url="https://www.google.com/search?q=${encoded}"
      >
        Ouvrir
      </button>
    </div>

    <div class="result-card">
      <div class="result-left">
        <div class="result-title">
          <span>◎</span>
          Recherche DuckDuckGo
        </div>

        <div class="result-url">
          Sources publiques indexées
        </div>
      </div>

      <button
        class="result-action"
        data-search-url="https://duckduckgo.com/?q=${encoded}"
      >
        Ouvrir
      </button>
    </div>
  `;

  bindResultButtons();

  showToast("Recherche préparée.");
}


const identitySearchButton = $("#identitySearch");

if (identitySearchButton) {
  identitySearchButton.addEventListener(
    "click",
    searchIdentity
  );
}


const identityInput = $("#identityInput");

if (identityInput) {
  identityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      searchIdentity();
    }

  });
}


/* =========================
   RESULT BUTTONS
========================= */

function bindResultButtons() {

  $$("[data-search-url]").forEach((button) => {

    button.addEventListener("click", () => {

      const url = button.dataset.searchUrl;

      if (!url) return;

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  });
}


/* =========================
   EXAMPLE BUTTONS
========================= */

$$("[data-example]").forEach((button) => {

  button.addEventListener("click", () => {

    const input = $("#identityInput");

    if (!input) return;

    input.value = button.dataset.example;

    input.focus();

  });

});


/* =========================
   NETWORK SEARCH
========================= */

function searchNetwork() {

  const input = $("#networkInput");

  if (!input) return;

  const value = input.value.trim();

  if (!value) {
    showToast("Entre une IP, un domaine ou une URL.");
    input.focus();
    return;
  }

  const encoded = encodeURIComponent(value);

  addHistory("network", value);

  const results = $("#networkResults");

  if (!results) return;

  results.innerHTML = `
    <div class="result-card">

      <div class="result-left">

        <div class="result-title">
          <span>◈</span>
          Recherche réseau
        </div>

        <div class="result-url">
          Cible : ${escapeHTML(value)}
        </div>

      </div>

      <button
        class="result-action"
        data-search-url="https://www.google.com/search?q=${encoded}"
      >
        Rechercher
      </button>

    </div>

    <div class="result-card">

      <div class="result-left">

        <div class="result-title">
          <span>▣</span>
          Informations publiques
        </div>

        <div class="result-url">
          Recherche de sources indexées
        </div>

      </div>

      <button
        class="result-action"
        data-search-url="https://duckduckgo.com/?q=${encoded}"
      >
        Ouvrir
      </button>

    </div>
  `;

  bindResultButtons();

  showToast("Recherche réseau préparée.");
}


const networkButton = $("#networkSearch");

if (networkButton) {
  networkButton.addEventListener(
    "click",
    searchNetwork
  );
}


const networkInput = $("#networkInput");

if (networkInput) {

  networkInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        searchNetwork();
      }

    }
  );

}


/* =========================
   IMAGE SEARCH
========================= */

const imageInput = $("#imageInput");
const uploadArea = $(".upload-area");
const imageName = $("#imageName");

if (uploadArea && imageInput) {

  uploadArea.addEventListener("click", () => {
    imageInput.click();
  });

}


if (imageInput) {

  imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    if (imageName) {
      imageName.textContent =
        `${file.name} — ${(file.size / 1024 / 1024).toFixed(2)} MB`;
    }

    showToast("Image sélectionnée.");

  });

}


/* =========================
   DORK GENERATOR
========================= */

function generateDork() {

  const target = $("#dorkTarget");
  const type = $("#dorkType");
  const keyword = $("#dorkKeyword");

  const output = $("#dorkOutput");

  if (!target || !type || !keyword || !output) {
    return;
  }

  const targetValue = target.value.trim();
  const typeValue = type.value;
  const keywordValue = keyword.value.trim();

  if (!targetValue && !keywordValue) {
    showToast("Ajoute un domaine ou un mot-clé.");
    return;
  }

  let query = "";

  if (targetValue) {
    query += `site:${targetValue}`;
  }

  if (keywordValue) {
    query += ` "${keywordValue}"`;
  }

  if (typeValue === "pdf") {
    query += " filetype:pdf";
  }

  if (typeValue === "doc") {
    query += " filetype:doc OR filetype:docx";
  }

  if (typeValue === "login") {
    query += ' inurl:login';
  }

  output.textContent = query.trim();

  showToast("Dork généré.");
}


const dorkButton = $("#generateDork");

if (dorkButton) {
  dorkButton.addEventListener(
    "click",
    generateDork
  );
}


/* =========================
   DORK PRESETS
========================= */

$$("[data-dork]").forEach((button) => {

  button.addEventListener("click", () => {

    const target = $("#dorkTarget");
    const output = $("#dorkOutput");

    if (!output) return;

    const dork = button.dataset.dork || "";

    if (target && target.value.trim()) {

      output.textContent =
        dork.replace(
          "{domain}",
          target.value.trim()
        );

    } else {

      output.textContent = dork;

    }

    showToast("Dork chargé.");

  });

});


/* =========================
   COPY DORK
========================= */

const copyDorkButton = $("#copyDork");

if (copyDorkButton) {

  copyDorkButton.addEventListener("click", async () => {

    const output = $("#dorkOutput");

    if (!output) return;

    const text = output.textContent.trim();

    if (!text) {
      showToast("Aucun dork à copier.");
      return;
    }

    try {

      await navigator.clipboard.writeText(text);

      showToast("Dork copié.");

    } catch {

      showToast("Copie impossible.");
    }

  });

}


/* =========================
   UTILITIES
========================= */

function checkUrl() {

  const input = $("#urlInput");
  const result = $("#urlResult");

  if (!input || !result) return;

  const value = input.value.trim();

  if (!value) {
    result.textContent = "URL manquante.";
    result.className = "validation bad";
    return;
  }

  try {

    const url = new URL(value);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      throw new Error();
    }

    result.textContent =
      `URL valide — ${url.hostname}`;

    result.className = "validation ok";

  } catch {

    result.textContent = "URL invalide.";

    result.className = "validation bad";

  }

}


const urlCheckButton = $("#checkUrl");

if (urlCheckButton) {

  urlCheckButton.addEventListener(
    "click",
    checkUrl
  );

}


/* =========================
   ENCODE / DECODE
========================= */

function encodeText() {

  const input = $("#encodeInput");
  const output = $("#encodeOutput");

  if (!input || !output) return;

  output.value =
    encodeURIComponent(input.value);

}


function decodeText() {

  const input = $("#encodeInput");
  const output = $("#encodeOutput");

  if (!input || !output) return;

  try {

    output.value =
      decodeURIComponent(input.value);

  } catch {

    output.value =
      "Impossible de décoder cette valeur.";

  }

}


const encodeButton = $("#encodeButton");
const decodeButton = $("#decodeButton");

if (encodeButton) {
  encodeButton.addEventListener(
    "click",
    encodeText
  );
}

if (decodeButton) {
  decodeButton.addEventListener(
    "click",
    decodeText
  );
}


/* =========================
   HISTORY
========================= */

const HISTORY_KEY = "osint_web_history_v3";

function getHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(HISTORY_KEY)
    ) || [];

  } catch {

    return [];

  }

}


function saveHistory(history) {

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history)
  );

}


function addHistory(type, value) {

  const history = getHistory();

  history.unshift({
    type,
    value,
    time: Date.now()
  });

  const limited =
    history.slice(0, 20);

  saveHistory(limited);

  renderHistory();
}


function renderHistory() {

  const container = $(".history-list");

  if (!container) return;

  const history = getHistory();

  if (!history.length) {

    container.innerHTML = `
      <div class="empty-history">
        No searches yet
      </div>
    `;

    return;
  }

  container.innerHTML =
    history
      .map((item) => {

        return `
          <div
            class="history-entry"
            data-history-value="${escapeHTML(item.value)}"
          >
            <span class="history-type">
              ${item.type === "network" ? "◈" : "◉"}
            </span>

            <span>
              ${escapeHTML(item.value)}
            </span>
          </div>
        `;

      })
      .join("");

}


renderHistory();


const clearHistoryButton =
  $(".clear-history");

if (clearHistoryButton) {

  clearHistoryButton.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        HISTORY_KEY
      );

      renderHistory();

      showToast("Historique supprimé.");

    }
  );

}


/* =========================
   GLOBAL SEARCH SHORTCUT
========================= */

document.addEventListener("keydown", (event) => {

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    const input =
      $("#identityInput");

    if (input) {

      openPage("identity");

      input.focus();

    }

  }

});


/* =========================
   STARTUP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "OSINT.WEB V3 — SYSTEM ONLINE"
    );

  }
);
