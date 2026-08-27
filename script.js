const configs = {

  pseudo: {
    label: "Pseudo à rechercher",
    placeholder: "ex. shadow_42",

    links: (q) => [
      ["Google", `https://www.google.com/search?q=${encodeURIComponent('"' + q + '"')}`],

      ["Reddit", `https://www.reddit.com/search/?q=${encodeURIComponent(q)}`],

      ["GitHub", `https://github.com/search?q=${encodeURIComponent(q)}&type=users`],

      ["DuckDuckGo", `https://duckduckgo.com/?q=${encodeURIComponent('"' + q + '"')}`]
    ]
  },

  email: {
    label: "Adresse e-mail à rechercher",
    placeholder: "exemple@mail.com",

    links: (q) => [
      ["Google", `https://www.google.com/search?q=${encodeURIComponent('"' + q + '"')}`],

      ["DuckDuckGo", `https://duckduckgo.com/?q=${encodeURIComponent('"' + q + '"')}`],

      ["Have I Been Pwned", "https://haveibeenpwned.com/"],

      ["Gravatar", `https://en.gravatar.com/site/check/${encodeURIComponent(q)}`]
    ]
  },

  domain: {
    label: "Domaine à analyser",
    placeholder: "example.com",

    links: (q) => {

      let domain = q
        .replace("https://", "")
        .replace("http://", "")
        .split("/")[0];

      return [
        ["Google", `https://www.google.com/search?q=${encodeURIComponent("site:" + domain)}`],

        ["ICANN Lookup", `https://lookup.icann.org/en/lookup?name=${encodeURIComponent(domain)}`],

        ["DNSlytics", `https://dnslytics.com/domain/${encodeURIComponent(domain)}`],

        ["SecurityTrails", `https://securitytrails.com/domain/${encodeURIComponent(domain)}`]
      ];
    }
  },

  url: {
    label: "URL à analyser",
    placeholder: "https://example.com",

    links: (q) => [
      ["Google", `https://www.google.com/search?q=${encodeURIComponent(q)}`],

      ["VirusTotal", `https://www.virustotal.com/gui/search/${encodeURIComponent(q)}`],

      ["URLScan", `https://urlscan.io/search/#${encodeURIComponent(q)}`],

      ["Wayback Machine", `https://web.archive.org/web/*/${encodeURIComponent(q)}`]
    ]
  }
};


let currentType = "pseudo";

const tabs = document.querySelectorAll(".tab");
const label = document.getElementById("label");
const input = document.getElementById("query");
const button = document.getElementById("searchButton");
const results = document.getElementById("results");
const grid = document.getElementById("resultGrid");


tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    currentType = tab.dataset.type;

    tabs.forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    label.textContent = configs[currentType].label;

    input.placeholder = configs[currentType].placeholder;

    input.value = "";

  });

});


button.addEventListener("click", search);


input.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    search();
  }

});


function search() {

  const value = input.value.trim();

  if (!value) {
    alert("Entre une recherche.");
    return;
  }

  const links = configs[currentType].links(value);

  grid.innerHTML = "";

  links.forEach(([name, url]) => {

    const element = document.createElement("a");

    element.className = "result";

    element.href = url;

    element.target = "_blank";

    element.rel = "noopener noreferrer";

    element.innerHTML = `
      <div class="result-name">
        ${name} ↗
      </div>

      <div class="result-url">
        Ouvrir la recherche publique
      </div>
    `;

    grid.appendChild(element);

  });

  results.classList.remove("hidden");

  results.scrollIntoView({
    behavior: "smooth"
  });

}
