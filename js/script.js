
const pages = [
    ["Home", "index.html"],
    ["Earn Extra", "earn.html"],
    ["Investment", "investment.html"],
    ["Startups", "startups.html"],
    ["Markets", "markets.html"],
    ["Tokens", "tokens.html"],
    ["Airdrops", "airdrops.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
];

const currentPage = location.pathname.split("/").pop() || "index.html";

// HEADER

const header = document.createElement("header");

header.innerHTML = `
    <a class="logo" href="index.html">
        <img src="images/logo.png" alt="WealthWise">
        WealthWise
    </a>

    <button class="menu-btn"
        id="menuBtn"
        aria-label="Toggle navigation"
        aria-expanded="false">☰</button>

    <nav id="navigation">
        <ul>
            ${pages.map(([name, url]) => `
                <li>
                    <a href="${url}"
                    class="${currentPage === url ? "active" : ""}"
                    ${currentPage === url ? 'aria-current="page"' : ""}>
                    ${name}
                    </a>
                </li>
            `).join("")}
        </ul>
    </nav>
`;

document.body.prepend(header);

// NEWS TICKER

const ticker = document.createElement("div");

ticker.className = "news";

ticker.innerHTML = `
    <strong>WEALTHWISE:</strong>
    <marquee scrollamount="4">
        Welcome to WealthWise |
        Explore financial markets |
        Learn about investment opportunities |
        Make informed financial decisions.
    </marquee>
`;

header.after(ticker);

// FOOTER

const footer = document.createElement("footer");

footer.innerHTML = `
    <h3>WealthWise</h3>

    <p>Your Gateway to Financial Knowledge and Opportunities.</p>

    <br>

    <div>
        ${pages.map(([name, url]) =>
            `<a href="${url}">${name}</a>`
        ).join(" | ")}
    </div>

    <br>

    <p>
        &copy; ${new Date().getFullYear()}
        WealthWise. All Rights Reserved.
    </p>

    <p>
        Investments involve risk. Returns are not guaranteed.
    </p>
`;

document.body.append(footer);

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
    const opened = navigation.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", opened);
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// ANIMATED COUNTERS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            counter.textContent =
                Math.floor(target * eased).toLocaleString() + "+";

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// DEMO CONTACT FORM

document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const message = form.querySelector("[data-form-message]");

        if (message) {
            message.textContent =
                "Thank you! This is a demo form. Connect a backend to receive submissions.";
        }

        form.reset();
    });
});
