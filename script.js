alert("SCRIPT JS CHARGE !");

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

  clock.textContent = new Date().toLocaleTimeString("fr-FR");
}

updateClock();
setInterval(updateClock, 1000);


/* =========================
   MOBILE MENU
========================= */

const menuButton = $("#menuButton");
const sidebar = $("#sidebar");

if (menuButton && sidebar) {
  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}


/* =========================
   NAVIGATION
========================= */

function openPage(pageId) {
  const page = document.getElementById(pageId);

  if (!page) return;

  $$(".page").forEach((item) => {
    item.classList.remove("active");
  });

  page.classList.add("active");

  $$(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.page === pageId
    );
  });

  sidebar?.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* SIDEBAR BUTTONS */

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});


/* DASHBOARD QUICK BUTTONS */

$$(".quick-card").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});


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
  if (!value) return;

  let history = getHistory();

  history = history.filter(
    (item) =>
      !(item.type === type && item.value === value)
  );

  history.unshift({
    type,
    value,
    time: Date.now()
  });

  saveHistory(history.slice(0, 20));

  renderHistory();
}

function renderHistory() {
  const container = $("#historyList");

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

  container.innerHTML = history.map((item) => `
    <div class="history-entry">
      <span class="history-type">
        ${item.type === "network" ? "◈" : "◉"}
      </span>

      <span>${escapeHTML(item.value)}</span>
    </div>
  `).join("");
}

renderHistory();


/* CLEAR HISTORY */

const clearHistory = $("#clearHistory");

if (clearHistory) {
  clearHistory.addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    showToast("Historique supprimé.");
  });
}


/* =========================
   IDENTITY
========================= */

let identityType = "username";

$$(".type-tab").forEach((button) => {

  button.addEventListener("click", () => {

    $$(".type-tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    button.classList.add("active");

    identityType =
      button.dataset.type || "username";

    const input = $("#identityInput");

    if (!input) return;

    if (identityType === "email") {
      input.placeholder = "exemple@email.com";
      input.type = "email";
    } else {
      input.placeholder = "Exemple : kz4626";
      input.type = "text";
    }
  });

});


/* IDENTITY SEARCH */

const identityForm = $("#identityForm");

if (identityForm) {

  identityForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const input = $("#identityInput");
    const results = $("#identityResults");

    if (!input || !results) return;

    const value = input.value.trim();

    if (!value) {
      showToast(
        identityType === "email"
          ? "Entre une adresse e-mail."
          : "Entre un pseudo."
      );

      input.focus();
      return;
    }

    addHistory(identityType, value);

    const encoded =
      encodeURIComponent(value);

    const googleURL =
      `https://www.google.com/search?q=${encoded}`;

    const duckURL =
      `https://duckduckgo.com/?q=${encoded}`;

    results.innerHTML = `
      <div class="result-card">

        <div class="result-left">

          <div class="result-title">
            <span>◉</span>
            Recherche Google
          </div>

          <div class="result-url">
            Recherche publique pour :
            ${escapeHTML(value)}
          </div>

        </div>

        <button
          class="result-action"
          data-url="${googleURL}"
        >
          OUVRIR
        </button>

      </div>

      <div class="result-card">

        <div class="result-left">

          <div class="result-title">
            <span>◎</span>
            DuckDuckGo
          </div>

          <div class="result-url">
            Sources publiques indexées
          </div>

        </div>

        <button
          class="result-action"
          data-url="${duckURL}"
        >
          OUVRIR
        </button>

      </div>
    `;

    bindResultButtons();

    showToast("Recherche préparée.");
  });

}


/* EXAMPLES */

$$("[data-example]").forEach((button) => {

  button.addEventListener("click", () => {

    const input = $("#identityInput");

    if (!input) return;

    input.value = button.dataset.example;

    input.focus();

  });

});


/* =========================
   NETWORK
========================= */

const networkForm = $("#networkForm");

if (networkForm) {

  networkForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const input = $("#networkInput");
    const results = $("#networkResults");

    if (!input || !results) return;

    const value = input.value.trim();

    if (!value) {
      showToast("Entre une IP, un domaine ou une URL.");
      input.focus();
      return;
    }

    addHistory("network", value);

    const encoded =
      encodeURIComponent(value);

    results.innerHTML = `
      <div class="result-card">

        <div class="result-left">

          <div class="result-title">
            <span>◈</span>
            Recherche web
          </div>

          <div class="result-url">
            ${escapeHTML(value)}
          </div>

        </div>

        <button
          class="result-action"
          data-url="https://www.google.com/search?q=${encoded}"
        >
          SEARCH
        </button>

      </div>

      <div class="result-card">

        <div class="result-left">

          <div class="result-title">
            <span>◎</span>
            DNS / domaine
          </div>

          <div class="result-url">
            Recherche de sources publiques
          </div>

        </div>

        <button
          class="result-action"
          data-url="https://dns.google/resolve?name=${encoded}"
        >
          OPEN
        </button>

      </div>
    `;

    bindResultButtons();

    showToast("Analyse préparée.");
  });

}


/* =========================
   GENERIC RESULT BUTTONS
========================= */

function bindResultButtons() {

  $$("[data-url]").forEach((button) => {

    button.addEventListener("click", () => {

      const url = button.dataset.url;

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
   IMAGE SEARCH
========================= */

const imageSearchButton =
  $("#imageSearchButton");

if (imageSearchButton) {

  imageSearchButton.addEventListener(
    "click",
    () => {

      const input = $("#imageUrl");
      const results = $("#imageResults");

      if (!input || !results) return;

      const value = input.value.trim();

      if (!value) {
        showToast("Colle d'abord l'URL d'une image.");
        input.focus();
        return;
      }

      try {
        new URL(value);
      } catch {
        showToast("URL d'image invalide.");
        return;
      }

      const encoded =
        encodeURIComponent(value);

      results.innerHTML = `
        <div class="result-card">

          <div class="result-left">

            <div class="result-title">
              <span>▣</span>
              Google Lens
            </div>

            <div class="result-url">
              Recherche inversée
            </div>

          </div>

          <button
            class="result-action"
            data-url="https://lens.google.com/uploadbyurl?url=${encoded}"
          >
            OPEN
          </button>

        </div>

        <div class="result-card">

          <div class="result-left">

            <div class="result-title">
              <span>▣</span>
              Bing Visual Search
            </div>

            <div class="result-url">
              Recherche visuelle
            </div>

          </div>

          <button
            class="result-action"
            data-url="https://www.bing.com/images/search?q=imgurl:${encoded}&view=detailv2&iss=sbi"
          >
            OPEN
          </button>

        </div>
      `;

      bindResultButtons();

      showToast("Moteurs de recherche préparés.");
    }
  );

}


/* =========================
   DORK GENERATOR
========================= */

const dorkType =
  $("#dorkType");

const fileTypeContainer =
  $("#fileTypeContainer");


if (dorkType) {

  dorkType.addEventListener("change", () => {

    if (!fileTypeContainer) return;

    if (dorkType.value === "filetype") {
      fileTypeContainer.classList.remove("hidden");
    } else {
      fileTypeContainer.classList.add("hidden");
    }

  });

}


/* GENERATE DORK */

const generateDorkButton =
  $("#generateDork");

if (generateDorkButton) {

  generateDorkButton.addEventListener(
    "click",
    () => {

      const query =
        $("#dorkQuery")?.value.trim();

      const type =
        $("#dorkType")?.value;

      const fileType =
        $("#fileType")?.value;

      const output =
        $("#dorkOutput");

      const text =
        $("#dorkText");

      if (!query) {
        showToast("Entre une recherche.");
        return;
      }

      let dork = "";

      switch (type) {

        case "site":
          dork = `site:${query}`;
          break;

        case "filetype":
          dork =
            `filetype:${fileType} ${query}`;
          break;

        case "intitle":
          dork =
            `intitle:"${query}"`;
          break;

        case "inurl":
          dork =
            `inurl:${query}`;
          break;

        case "combined":
          dork =
            `site:${query} intitle:"${query}"`;
          break;

        default:
          dork = query;
      }

      if (text) {
        text.textContent = dork;
      }

      if (output) {
        output.classList.remove("hidden");
      }

      showToast("Dork généré.");
    }
  );

}


/* COPY DORK */

const copyDork =
  $("#copyDork");

if (copyDork) {

  copyDork.addEventListener(
    "click",
    async () => {

      const text =
        $("#dorkText")?.textContent.trim();

      if (!text) {
        showToast("Aucun dork.");
        return;
      }

      try {

        await navigator.clipboard.writeText(text);

        showToast("Dork copié.");

      } catch {

        showToast("Copie impossible.");

      }

    }
  );

}


/* OPEN DORK */

const openDork =
  $("#openDork");

if (openDork) {

  openDork.addEventListener(
    "click",
    () => {

      const text =
        $("#dorkText")?.textContent.trim();

      if (!text) {
        showToast("Génère d'abord un dork.");
        return;
      }

      const url =
        `https://www.google.com/search?q=${encodeURIComponent(text)}`;

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================
   DORK PRESETS
========================= */

$$("[data-dork]").forEach((button) => {

  button.addEventListener("click", () => {

    const type =
      button.dataset.dork;

    const query =
      $("#dorkQuery");

    const dorkType =
      $("#dorkType");

    if (!query || !dorkType) return;

    const values = {
      site: "site",
      filetype: "filetype",
      intitle: "intitle",
      inurl: "inurl"
    };

    if (values[type]) {
      dorkType.value = values[type];
    }

    if (type === "filetype") {
      fileTypeContainer?.classList.remove("hidden");
    } else {
      fileTypeContainer?.classList.add("hidden");
    }

    query.focus();

    showToast(`${type}: sélectionné.`);
  });

});


/* =========================
   IP VALIDATOR
========================= */

const validateIP =
  $("#validateIP");

if (validateIP) {

  validateIP.addEventListener(
    "click",
    () => {

      const input =
        $("#ipValidatorInput");

      const result =
        $("#ipValidationResult");

      if (!input || !result) return;

      const value =
        input.value.trim();

      const parts =
        value.split(".");

      const valid =
        parts.length === 4 &&
        parts.every((part) => {

          if (!/^\d+$/.test(part)) {
            return false;
          }

          const number =
            Number(part);

          return number >= 0 &&
            number <= 255;
        });

      if (valid) {

        result.textContent =
          "✓ Adresse IPv4 valide";

        result.className =
          "validation ok";

      } else {

        result.textContent =
          "✕ Adresse IPv4 invalide";

        result.className =
          "validation bad";

      }

    }
  );

}


/* =========================
   EMAIL VALIDATOR
========================= */

const validateEmail =
  $("#validateEmail");

if (validateEmail) {

  validateEmail.addEventListener(
    "click",
    () => {

      const input =
        $("#emailValidatorInput");

      const result =
        $("#emailValidationResult");

      if (!input || !result) return;

      const value =
        input.value.trim();

      const valid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (valid) {

        result.textContent =
          "✓ Format e-mail valide";

        result.className =
          "validation ok";

      } else {

        result.textContent =
          "✕ Format e-mail invalide";

        result.className =
          "validation bad";

      }

    }
  );

}


/* =========================
   URL PARSER
========================= */

const parseURL =
  $("#parseURL");

if (parseURL) {

  parseURL.addEventListener(
    "click",
    () => {

      const input =
        $("#urlParserInput");

      const result =
        $("#urlParserResult");

      if (!input || !result) return;

      const value =
        input.value.trim();

      if (!value) {

        result.textContent =
          "Entre une URL.";

        result.className =
          "validation bad";

        return;
      }

      try {

        const url =
          new URL(value);

        result.innerHTML = `
          <div class="validation ok">
            <strong>URL valide</strong><br>
            Protocole : ${escapeHTML(url.protocol)}<br>
            Domaine : ${escapeHTML(url.hostname)}<br>
            Port : ${escapeHTML(url.port || "défaut")}<br>
            Chemin : ${escapeHTML(url.pathname || "/")}
          </div>
        `;

      } catch {

        result.textContent =
          "✕ URL invalide";

        result.className =
          "validation bad";

      }

    }
  );

}


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      openPage("identity");

      const input =
        $("#identityInput");

      input?.focus();

    }

  }
);


/* =========================
   STARTUP
========================= */

console.log(
  "OSINT.WEB V3 — SYSTEM ONLINE"
   
);


/* =========================
   SOCIAL SEARCH
========================= */

const socialInput = document.getElementById("socialUsername");
const socialSearchButton = document.getElementById("socialSearchButton");
const socialResults = document.getElementById("socialResults");

const socialLinks = {
  instagram: "https://www.google.com/search?q=",
  discord: "https://www.google.com/search?q=",
  snapchat: "https://www.google.com/search?q=",
  tiktok: "https://www.google.com/search?q="
};

document.querySelectorAll(".social-card").forEach(card => {

  card.addEventListener("click", () => {

    const username = socialInput.value.trim();

    if (!username) {
      alert("Entre d'abord un pseudo.");
      socialInput.focus();
      return;
    }

    const cleanUsername = username.replace(/^@/, "");
    const platform = card.dataset.social;

    let query = "";

    if (platform === "instagram") {
      query = `site:instagram.com "${cleanUsername}"`;
    }

    if (platform === "discord") {
      query = `site:discord.com "${cleanUsername}"`;
    }

    if (platform === "snapchat") {
      query = `site:snapchat.com "${cleanUsername}"`;
    }

    if (platform === "tiktok") {
      query = `site:tiktok.com/@ "${cleanUsername}"`;
    }

    const url =
      socialLinks[platform] +
      encodeURIComponent(query);

    socialResults.innerHTML = `
      <div class="result-card">
        <div>
          <h3>Recherche ${platform}</h3>
          <p>Pseudo recherché : <strong>${cleanUsername}</strong></p>
        </div>

        <button
          type="button"
          onclick="window.open('${url}', '_blank')"
        >
          OUVRIR
        </button>
      </div>
    `;

    window.open(url, "_blank");

  });

});


if (socialSearchButton) {

  socialSearchButton.addEventListener("click", () => {

    const username = socialInput.value.trim();

    if (!username) {
      alert("Entre un pseudo.");
      socialInput.focus();
      return;
    }

    socialInput.focus();

    alert(
      "Choisis maintenant Instagram, Discord, Snapchat ou TikTok."
    );

  });

}
