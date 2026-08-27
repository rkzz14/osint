* {
    box-sizing: border-box;
}


:root {

    --bg: #070b10;
    --panel: #0d131b;
    --panel2: #111923;
    --border: #202b38;

    --text: #edf3f8;
    --muted: #7f8c9d;

    --green: #39df87;
    --green-dark: #123b27;

    --blue: #55a9ff;
    --purple: #a477ff;
    --orange: #ffad5c;

}


body {

    margin: 0;

    min-height: 100vh;

    background:

        radial-gradient(
            circle at 20% 0%,
            rgba(48, 170, 100, .10),
            transparent 30%
        ),

        radial-gradient(
            circle at 90% 20%,
            rgba(60, 100, 200, .08),
            transparent 30%
        ),

        var(--bg);

    color: var(--text);

    font-family:
        Inter,
        Arial,
        Helvetica,
        sans-serif;

}


/* TOPBAR */

.topbar {

    height: 64px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 25px;

    border-bottom: 1px solid var(--border);

    background: rgba(7, 11, 16, .92);

    backdrop-filter: blur(15px);

    position: sticky;

    top: 0;

    z-index: 100;

}


.brand {

    display: flex;

    align-items: center;

    gap: 10px;

    font-size: 17px;

    letter-spacing: 2px;

}


.brand span {

    color: var(--muted);

}


.brand-icon {

    color: var(--green);

    font-size: 18px;

    text-shadow:
        0 0 15px rgba(57, 223, 135, .8);

}


.top-status {

    color: var(--muted);

    font-size: 10px;

    letter-spacing: 1px;

}


.status-dot {

    display: inline-block;

    width: 7px;

    height: 7px;

    margin-right: 5px;

    border-radius: 50%;

    background: var(--green);

    box-shadow:
        0 0 10px var(--green);

}


/* LAYOUT */

.layout {

    display: flex;

    min-height: calc(100vh - 64px);

}


/* SIDEBAR */

.sidebar {

    width: 230px;

    flex-shrink: 0;

    padding: 25px 14px;

    border-right: 1px solid var(--border);

    background: rgba(9, 13, 19, .85);

}


.side-title {

    padding: 0 10px;

    margin: 5px 0 10px;

    color: #526071;

    font-size: 9px;

    font-weight: bold;

    letter-spacing: 2px;

}


.nav {

    width: 100%;

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 12px;

    margin-bottom: 4px;

    border: 1px solid transparent;

    border-radius: 9px;

    background: transparent;

    color: var(--muted);

    text-align: left;

    cursor: pointer;

    font-size: 13px;

}


.nav span {

    width: 20px;

    text-align: center;

}


.nav:hover {

    color: white;

    background: #101720;

}


.nav.active {

    color: var(--green);

    background: var(--green-dark);

    border-color: rgba(57, 223, 135, .15);

}


.side-separator {

    height: 1px;

    margin: 25px 10px;

    background: var(--border);

}


.history {

    max-height: 300px;

    overflow: auto;

}


.history-item {

    padding: 9px 10px;

    color: var(--muted);

    font-size: 11px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

}


.empty-history {

    padding: 10px;

    color: #465362;

    font-size: 11px;

}


/* CONTENT */

.content {

    width: 100%;

    max-width: 1250px;

    margin: auto;

    padding: 45px;

}


.page {

    display: none;

}


.active-page {

    display: block;

}


.page-head {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    margin-bottom: 30px;

}


.eyebrow {

    margin-bottom: 9px;

    color: var(--green);

    font-size: 10px;

    font-weight: bold;

    letter-spacing: 3px;

}


h1 {

    margin: 0;

    font-size: clamp(35px, 5vw, 55px);

    letter-spacing: -2px;

}


.page-head p {

    margin-top: 10px;

    color: var(--muted);

    font-size: 14px;

}


.clock {

    padding: 10px 14px;

    border: 1px solid var(--border);

    border-radius: 8px;

    color: var(--green);

    font-family: monospace;

}


/* SEARCH */

.main-search {

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 8px;

    border: 1px solid var(--border);

    border-radius: 14px;

    background: var(--panel);

}


.search-icon {

    padding-left: 10px;

    color: var(--green);

    font-size: 20px;

}


.main-search input {

    flex: 1;

    min-width: 0;

    padding: 14px 5px;

    border: 0;

    outline: 0;

    background: transparent;

    color: white;

    font-size: 14px;

}


.main-search select {

    padding: 11px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: #080c11;

    color: var(--muted);

}


#globalButton {

    padding: 13px 20px;

    border: 0;

    border-radius: 9px;

    background: var(--green);

    color: #041008;

    font-weight: 900;

    cursor: pointer;

}


/* SECTION */

.section-heading {

    display: flex;

    align-items: center;

    justify-content: space-between;

    margin: 35px 0 15px;

}


.section-heading h2 {

    margin: 0;

    font-size: 18px;

}


/* CARDS */

.tool-grid {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 12px;

}


.tool-card {

    display: flex;

    align-items: center;

    gap: 13px;

    padding: 17px;

    border: 1px solid var(--border);

    border-radius: 12px;

    background: var(--panel);

    color: white;

    text-align: left;

    cursor: pointer;

    transition: .15s;

}


.tool-card:hover {

    transform: translateY(-2px);

    border-color: var(--green);

}


.tool-card strong {

    display: block;

    font-size: 13px;

}


.tool-card small {

    display: block;

    margin-top: 5px;

    color: var(--muted);

    font-size: 10px;

}


.tool-icon {

    width: 40px;

    height: 40px;

    display: grid;

    place-items: center;

    border-radius: 10px;

    font-size: 18px;

}


.green {

    background: rgba(57,223,135,.12);

    color: var(--green);

}


.blue {

    background: rgba(85,169,255,.12);

    color: var(--blue);

}


.purple {

    background: rgba(164,119,255,.12);

    color: var(--purple);

}


.orange {

    background: rgba(255,173,92,.12);

    color: var(--orange);

}


/* RESULTS */

.results {

    min-height: 180px;

}


.empty-results {

    min-height: 220px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 8px;

    border: 1px dashed var(--border);

    border-radius: 14px;

    color: var(--muted);

}


.empty-icon {

    margin-bottom: 5px;

    color: var(--green);

    font-size: 30px;

}


.result-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 12px;

}


.result {

    display: block;

    padding: 17px;

    border: 1px solid var(--border);

    border-radius: 12px;

    background: var(--panel);

    color: white;

    text-decoration: none;

    transition: .15s;

}


.result:hover {

    border-color: var(--green);

    transform: translateY(-2px);

}


.result-title {

    font-weight: bold;

    margin-bottom: 7px;

}


.result-sub {

    color: var(--muted);

    font-size: 11px;

}


/* BUTTONS */

.small-button {

    padding: 8px 12px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: var(--panel);

    color: var(--muted);

    cursor: pointer;

}


.small-button:hover {

    color: white;

    border-color: var(--green);

}


/* MODULE */

.module {

    padding: 22px;

    border: 1px solid var(--border);

    border-radius: 14px;

    background: var(--panel);

}


.module h3 {

    margin-top: 0;

}


.module-tabs {

    display: flex;

    gap: 8px;

    margin-bottom: 18px;

}


.module-tab {

    padding: 9px 15px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: #090e14;

    color: var(--muted);

    cursor: pointer;

}


.module-tab.active {

    color: var(--green);

    border-color: var(--green);

}


.big-input {

    width: 100%;

    padding: 14px;

    margin-bottom: 12px;

    border: 1px solid var(--border);

    border-radius: 9px;

    outline: 0;

    background: #080c11;

    color: white;

    font-size: 14px;

}


.big-input:focus {

    border-color: var(--green);

}


textarea {

    width: 100%;

    min-height: 100px;

    resize: vertical;

    padding: 13px;

    margin-bottom: 12px;

    border: 1px solid var(--border);

    border-radius: 9px;

    outline: 0;

    background: #080c11;

    color: white;

    font-family: monospace;

}


.primary-button {

    width: 100%;

    padding: 13px;

    border: 0;

    border-radius: 9px;

    background: var(--green);

    color: #041008;

    font-weight: bold;

    cursor: pointer;

}


.secondary-button {

    width: 100%;

    padding: 13px;

    border: 1px solid var(--border);

    border-radius: 9px;

    background: #101720;

    color: white;

    cursor: pointer;

}


/* NETWORK */

.network-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 14px;

}


/* IMAGE */

.image-module {

    max-width: 700px;

    text-align: center;

    margin: auto;

}


.upload-icon {

    margin-bottom: 15px;

    color: var(--purple);

    font-size: 45px;

}


/* DORK */

.dork-builder {

    max-width: 750px;

    padding: 25px;

    border: 1px solid var(--border);

    border-radius: 14px;

    background: var(--panel);

}


.dork-builder label {

    display: block;

    margin: 13px 0 7px;

    color: var(--muted);

    font-size: 11px;

}


.dork-result {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-top: 20px;

    padding: 14px;

    border: 1px solid var(--border);

    border-radius: 9px;

    background: #080c11;

}


.dork-result span {

    color: var(--muted);

    font-size: 10px;

}


.dork-result code {

    flex: 1;

    overflow: auto;

    color: var(--green);

}


.dork-result button {

    padding: 7px;

    border: 1px solid var(--border);

    border-radius: 6px;

    background: var(--panel);

    color: white;

    cursor: pointer;

}


/* UTILITIES */

.utility-grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 15px;

}


.two-buttons {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 8px;

}


.output {

    min-height: 45px;

    margin-top: 12px;

    padding: 12px;

    border: 1px solid var(--border);

    border-radius: 8px;

    background: #080c11;

    color: var(--green);

    font-family: monospace;

    font-size: 12px;

    word-break: break-all;

}


/* MOBILE */

@media (max-width: 900px) {

    .sidebar {

        width: 190px;

    }

    .content {

        padding: 30px;

    }

    .tool-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

    .network-grid {

        grid-template-columns: 1fr;

    }

    .result-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


@media (max-width: 650px) {

    .topbar {

        padding: 0 15px;

    }

    .layout {

        display: block;

    }

    .sidebar {

        width: 100%;

        padding: 10px;

        border-right: 0;

        border-bottom: 1px solid var(--border);

        overflow-x: auto;

        white-space: nowrap;

    }

    .side-title,
    .side-separator,
    .history {

        display: none;

    }

    .nav {

        width: auto;

        display: inline-flex;

        margin-right: 4px;

    }

    .content {

        padding: 25px 15px;

    }

    .page-head {

        display: block;

    }

    .clock {

        display: inline-block;

        margin-top: 10px;

    }

    .main-search {

        flex-wrap: wrap;

    }

    .main-search input {

        width: 100%;

        flex-basis: 70%;

    }

    .main-search select {

        flex: 1;

    }

    #globalButton {

        width: 100%;

    }

    .tool-grid {

        grid-template-columns: 1fr;

    }

    .result-grid {

        grid-template-columns: 1fr;

    }

    .utility-grid {

        grid-template-columns: 1fr;

    }

    h1 {

        font-size: 38px;

    }

}
