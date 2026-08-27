:root {
  --bg: #070a10;
  --panel: #0d111a;
  --panel2: #111722;
  --border: #1c2634;

  --text: #eef4ff;
  --muted: #8995a8;

  --accent: #55e6a5;
  --accent2: #38c98d;

  --danger: #ff667d;

  --radius: 16px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    radial-gradient(
      circle at 80% 0%,
      rgba(61, 220, 150, 0.07),
      transparent 30%
    ),
    var(--bg);

  color: var(--text);

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  display: flex;
}


/* SIDEBAR */

.sidebar {
  width: 265px;
  flex-shrink: 0;

  background:
    linear-gradient(
      180deg,
      #0b0f17,
      #080b11
    );

  border-right: 1px solid var(--border);

  padding: 22px 15px;

  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;

  height: 100vh;

  z-index: 100;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 8px;
}

.brand-logo {
  width: 40px;
  height: 40px;

  border: 1px solid rgba(85, 230, 165, 0.35);

  border-radius: 12px;

  display: grid;
  place-items: center;

  color: var(--accent);

  background: rgba(85, 230, 165, 0.06);

  font-size: 23px;
}

.brand strong {
  display: block;
  font-size: 17px;
  letter-spacing: 1px;
}

.brand strong span {
  color: var(--accent);
}

.brand small {
  display: block;
  margin-top: 2px;

  color: var(--muted);

  font-size: 9px;
  letter-spacing: 2px;
}

.status {
  margin: 22px 8px 15px;

  padding: 8px 11px;

  border-radius: 8px;

  background: rgba(85, 230, 165, 0.05);

  color: #91a0b4;

  font-size: 10px;
  letter-spacing: 1.5px;
}

.status-dot {
  display: inline-block;

  width: 7px;
  height: 7px;

  margin-right: 7px;

  border-radius: 50%;

  background: var(--accent);

  box-shadow: 0 0 10px var(--accent);
}


/* NAV */

.navigation {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  width: 100%;

  border: 0;
  background: transparent;

  color: var(--muted);

  display: flex;
  align-items: center;

  gap: 13px;

  text-align: left;

  padding: 11px 10px;

  border-radius: 11px;

  transition: 0.2s ease;
}

.nav-item > span {
  width: 25px;

  text-align: center;

  font-size: 17px;
}

.nav-item b {
  display: block;

  font-size: 13px;
  color: inherit;
}

.nav-item small {
  display: block;

  font-size: 10px;

  margin-top: 2px;

  color: #606d80;
}

.nav-item:hover {
  background: rgba(255,255,255,0.035);
  color: white;
}

.nav-item.active {
  background: rgba(85, 230, 165, 0.09);
  color: var(--accent);
}

.nav-item.active small {
  color: #789785;
}


/* HISTORY */

.sidebar-bottom {
  margin-top: auto;
}

.mini-title {
  font-size: 9px;

  letter-spacing: 2px;

  color: #556174;

  margin: 15px 8px 8px;
}

.history-list {
  max-height: 150px;

  overflow-y: auto;
}

.empty-history {
  color: #4f5b6c;

  font-size: 11px;

  padding: 10px 8px;
}

.history-entry {
  display: flex;

  align-items: center;

  gap: 7px;

  padding: 7px 8px;

  border-radius: 7px;

  color: #8290a4;

  font-size: 11px;

  cursor: pointer;
}

.history-entry:hover {
  background: rgba(255,255,255,0.03);
}

.history-type {
  color: var(--accent);
}

.clear-history {
  width: 100%;

  margin-top: 8px;

  padding: 7px;

  background: transparent;

  border: 1px solid var(--border);

  color: #69768a;

  border-radius: 8px;

  font-size: 10px;
}


/* MAIN */

.main {
  min-width: 0;

  flex: 1;
}

.topbar {
  height: 70px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 34px;

  border-bottom: 1px solid var(--border);

  background: rgba(7,10,16,0.8);

  backdrop-filter: blur(12px);

  position: sticky;
  top: 0;

  z-index: 50;
}

.top-title span {
  display: block;

  color: #647186;

  font-size: 9px;

  letter-spacing: 2px;
}

.top-title strong {
  font-size: 13px;

  font-weight: 600;
}

.clock {
  color: var(--accent);

  font-family: monospace;

  font-size: 12px;

  padding: 7px 10px;

  border: 1px solid var(--border);

  border-radius: 8px;
}

.menu-button {
  display: none;

  border: 0;
  background: transparent;

  color: white;

  font-size: 22px;
}


/* CONTENT */

.content {
  width: min(1150px, 100%);

  margin: auto;

  padding: 45px 35px 80px;
}

.page {
  display: none;

  animation: pageIn 0.25s ease;
}

.page.active {
  display: block;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* HERO */

.hero {
  min-height: 310px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 30px;

  padding: 35px;

  border: 1px solid var(--border);

  border-radius: 22px;

  background:
    radial-gradient(
      circle at 80% 40%,
      rgba(85,230,165,0.12),
      transparent 35%
    ),
    var(--panel);

  overflow: hidden;

  position: relative;
}

.eyebrow {
  color: var(--accent);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 2px;
}

.hero h1 {
  font-size: clamp(38px, 6vw, 65px);

  line-height: 0.98;

  margin: 13px 0;

  letter-spacing: -3px;
}

.hero h1 span {
  color: var(--accent);
}

.hero p {
  color: var(--muted);

  max-width: 550px;

  line-height: 1.6;

  font-size: 14px;
}

.hero-orb {
  width: 180px;
  height: 180px;

  border-radius: 50%;

  border: 1px solid rgba(85,230,165,0.25);

  display: grid;

  place-items: center;

  box-shadow:
    0 0 70px rgba(85,230,165,0.08),
    inset 0 0 40px rgba(85,230,165,0.04);

  animation: float 4s ease-in-out infinite;
}

.orb-inner {
  width: 125px;
  height: 125px;

  border-radius: 50%;

  display: grid;

  place-items: center;

  border: 1px solid rgba(85,230,165,0.35);

  color: var(--accent);

  font-family: monospace;

  font-size: 13px;

  letter-spacing: 2px;
}

@keyframes float {
  50% {
    transform: translateY(-8px);
  }
}


/* QUICK */

.quick-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;

  margin-top: 15px;
}

.quick-card {
  display: grid;

  grid-template-columns: 45px 1fr auto;

  align-items: center;

  gap: 12px;

  padding: 17px;

  border-radius: 14px;

  border: 1px solid var(--border);

  background: var(--panel);

  color: white;

  text-align: left;

  transition: 0.2s;
}

.quick-card:hover {
  transform: translateY(-2px);

  border-color: rgba(85,230,165,0.35);

  background: var(--panel2);
}

.quick-icon {
  width: 43px;
  height: 43px;

  display: grid;
  place-items: center;

  border-radius: 11px;

  background: rgba(85,230,165,0.08);

  color: var(--accent);

  font-size: 20px;
}

.quick-card strong {
  display: block;

  font-size: 13px;
}

.quick-card p {
  margin: 4px 0 0;

  color: var(--muted);

  font-size: 11px;
}

.quick-card > span {
  color: #596779;
}


/* INFO */

.info-panel {
  margin-top: 15px;

  display: flex;

  gap: 13px;

  padding: 15px;

  border-radius: 12px;

  border: 1px solid var(--border);

  background: rgba(255,255,255,0.015);
}

.info-icon {
  color: var(--accent);
}

.info-panel strong {
  font-size: 12px;
}

.info-panel p {
  margin: 5px 0 0;

  color: var(--muted);

  font-size: 11px;

  line-height: 1.5;
}


/* HEADINGS */

.page-heading {
  margin-bottom: 25px;
}

.page-heading h2 {
  font-size: 32px;

  margin: 7px 0;

  letter-spacing: -1px;
}

.page-heading p {
  margin: 0;

  color: var(--muted);

  font-size: 13px;
}


/* TOOL CARD */

.tool-card {
  background: var(--panel);

  border: 1px solid var(--border);

  border-radius: var(--radius);

  padding: 20px;

  margin-bottom: 18px;
}

.input-tabs {
  display: flex;

  gap: 6px;

  margin-bottom: 15px;
}

.type-tab {
  border: 1px solid var(--border);

  background: transparent;

  color: #718096;

  padding: 8px 12px;

  border-radius: 8px;

  font-size: 11px;
}

.type-tab.active {
  background: rgba(85,230,165,0.08);

  border-color: rgba(85,230,165,0.25);

  color: var(--accent);
}

.search-box {
  display: flex;

  gap: 8px;
}

.search-box input {
  flex: 1;

  min-width: 0;

  background: #080c13;

  border: 1px solid var(--border);

  color: white;

  padding: 13px 14px;

  border-radius: 10px;

  outline: none;

  transition: 0.2s;
}

.search-box input:focus,
input:focus,
select:focus {
  border-color: rgba(85,230,165,0.5);

  box-shadow: 0 0 0 3px rgba(85,230,165,0.06);
}

.search-box button,
.primary-button {
  border: 0;

  border-radius: 10px;

  padding: 0 20px;

  background: var(--accent);

  color: #06130d;

  font-weight: 800;

  font-size: 11px;

  letter-spacing: .5px;
}

.search-box button:hover,
.primary-button:hover {
  background: #73efb8;
}

.examples {
  display: flex;

  gap: 6px;

  margin-top: 10px;
}

.examples button {
  border: 0;

  background: transparent;

  color: #637084;

  font-size: 10px;
}

.examples button:hover {
  color: var(--accent);
}


/* RESULTS */

.results {
  display: grid;

  gap: 10px;
}

.empty-state {
  text-align: center;

  padding: 60px 20px;

  border: 1px dashed var(--border);

  border-radius: var(--radius);

  background: rgba(255,255,255,0.01);
}

.empty-icon {
  font-size: 30px;

  color: #394657;

  margin-bottom: 10px;
}

.empty-state h3 {
  margin: 0;

  font-size: 14px;
}

.empty-state p {
  color: var(--muted);

  font-size: 11px;
}


/* RESULT CARD */

.result-card {
  padding: 17px;

  border: 1px solid var(--border);

  border-radius: 13px;

  background: var(--panel);

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  animation: resultIn .25s ease;
}

@keyframes resultIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
}

.result-left {
  min-width: 0;
}

.result-title {
  font-size: 13px;

  font-weight: 700;

  display: flex;

  align-items: center;

  gap: 8px;
}

.result-title span {
  color: var(--accent);
}

.result-url {
  color: #68768a;

  font-size: 10px;

  margin-top: 5px;

  overflow-wrap: anywhere;
}

.result-action {
  flex-shrink: 0;

  border: 1px solid var(--border);

  background: #101722;

  color: white;

  padding: 8px 11px;

  border-radius: 8px;

  font-size: 10px;
}

.result-action:hover {
  border-color: var(--accent);

  color: var(--accent);
}


/* IMAGE */

.upload-area {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 7px;

  border: 1px dashed #293444;

  border-radius: 12px;

  padding: 28px;

  margin-bottom: 12px;

  cursor: pointer;
}

.upload-area:hover {
  border-color: rgba(85,230,165,0.4);
}

.upload-icon {
  font-size: 25px;

  color: var(--accent);
}

.upload-area strong {
  font-size: 13px;
}

.upload-area span {
  color: var(--muted);

  font-size: 11px;
}


/* DORKS */

.form-grid {
  display: grid;

  grid-template-columns: 1.5fr 1fr 1fr;

  gap: 10px;

  margin-bottom: 15px;
}

.form-grid label,
.utility-card label {
  display: flex;

  flex-direction: column;

  gap: 6px;
}

.form-grid label > span {
  color: #7c899b;

  font-size: 10px;
}

.form-grid input,
.form-grid select,
.utility-card input {
  background: #080c13;

  color: white;

  border: 1px solid var(--border);

  border-radius: 9px;

  padding: 11px;

  outline: none;
}

.hidden {
  display: none !important;
}

.dork-output {
  margin-top: 15px;

  border: 1px solid var(--border);

  border-radius: 11px;

  overflow: hidden;

  background: #080c13;
}

.dork-top {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 9px 12px;

  border-bottom: 1px solid var(--border);

  color: #68768a;

  font-size: 9px;

  letter-spacing: 1px;
}

.dork-top button {
  background: transparent;

  border: 0;

  color: var(--accent);

  font-size: 9px;
}

.dork-output code {
  display: block;

  padding: 17px;

  color: #dbe5f2;

  white-space: pre-wrap;

  word-break: break-word;

  font-size: 12px;
}

.secondary-button {
  margin: 0 15px 15px;

  border: 1px solid var(--border);

  background: #101722;

  color: white;

  padding: 9px 12px;

  border-radius: 8px;

  font-size: 10px;
}

.dork-presets {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
}

.dork-presets button {
  text-align: left;

  border: 1px solid var(--border);

  background: var(--panel);

  color: white;

  border-radius: 12px;

  padding: 14px;
}

.dork-presets strong {
  display: block;

  color: var(--accent);

  font-family: monospace;

  font-size: 13px;
}

.dork-presets span {
  display: block;

  color: var(--muted);

  font-size: 10px;

  margin-top: 5px;
}


/* UTILITIES */

.utility-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 12px;
}

.utility-card {
  background: var(--panel);

  border: 1px solid var(--border);

  border-radius: 14px;

  padding: 18px;
}

.utility-icon {
  color: var(--accent);

  font-size: 23px;

  margin-bottom: 10px;
}

.utility-card h3 {
  margin: 0;

  font-size: 14px;
}

.utility-card p {
  color: var(--muted);

  font-size: 11px;

  line-height: 1.5;

  min-height: 34px;
}

.utility-card input {
  width: 100%;

  margin-bottom: 7px;
}

.utility-card > button {
  width: 100%;

  border: 0;

  border-radius: 8px;

  padding: 9px;

  background: #151d29;

  color: white;

  font-size: 10px;
}

.utility-card > button:hover {
  color: var(--accent);
}

.validation {
  margin-top: 9px;

  font-size: 10px;

  padding: 7px;

  border-radius: 7px;
}

.validation.ok {
  background: rgba(85,230,165,0.08);

  color: var(--accent);
}

.validation.bad {
  background: rgba(255,102,125,0.08);

  color: var(--danger);
}


/* TOAST */

.toast {
  position: fixed;

  right: 20px;
  bottom: 20px;

  background: #151d29;

  border: 1px solid var(--border);

  padding: 11px 15px;

  border-radius: 10px;

  color: white;

  font-size: 11px;

  opacity: 0;

  transform: translateY(10px);

  pointer-events: none;

  transition: .25s;

  z-index: 1000;
}

.toast.show {
  opacity: 1;

  transform: translateY(0);
}


/* MOBILE */

@media (max-width: 850px) {

  .sidebar {
    position: fixed;

    left: -280px;

    transition: .25s;

    box-shadow: 20px 0 50px rgba(0,0,0,.4);
  }

  .sidebar.open {
    left: 0;
  }

  .menu-button {
    display: block;
  }

  .topbar {
    padding: 0 16px;

    gap: 12px;
  }

  .top-title {
    flex: 1;
  }

  .content {
    padding: 25px 15px 60px;
  }

  .hero {
    min-height: auto;

    padding: 25px;

    border-radius: 17px;
  }

  .hero-orb {
    display: none;
  }

  .hero h1 {
    font-size: 43px;
  }

  .quick-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .dork-presets {
    grid-template-columns: 1fr 1fr;
  }

  .utility-grid {
    grid-template-columns: 1fr;
  }

  .result-card {
    align-items: flex-start;

    flex-direction: column;
  }

  .result-action {
    width: 100%;
  }

}

@media (max-width: 500px) {

  .clock {
    display: none;
  }

  .hero {
    padding: 22px;
  }

  .hero h1 {
    font-size: 37px;

    letter-spacing: -2px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-box button {
    min-height: 43px;
  }

  .dork-presets {
    grid-template-columns: 1fr;
  }

  .page-heading h2 {
    font-size: 27px;
  }

}
