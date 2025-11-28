/* ---------------------------------------------------------
   SCROLL SUAVE + FIX NAVBAR
--------------------------------------------------------- */

const navbar = document.querySelector(".navbar-new");
const navbarHeight = navbar.offsetHeight;

// Scroll con compensación para todos los enlaces #
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const offsetTop = target.offsetTop - navbarHeight;

        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });

        // Cerrar menú móvil si está abierto
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
        }
    });
});

// Botón "Ver Planes"
const heroBtn = document.querySelector(".btn");
if (heroBtn) {
    heroBtn.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector("#planes");
        if (target) {
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: "smooth"
            });
        }
    });
}


/* ---------------------------------------------------------
   MENÚ MÓVIL
--------------------------------------------------------- */

const mobileBtn = document.getElementById("hamburger-new");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", e => {
    e.stopPropagation();
    mobileMenu.classList.toggle("open");
});

// Cerrar si clicas fuera
document.addEventListener("click", e => {
    if (!mobileMenu.contains(e.target) && e.target !== mobileBtn) {
        mobileMenu.classList.remove("open");
    }
});


/* ---------------------------------------------------------
   DROPDOWNS DE ESCRITORIO + MÓVIL
--------------------------------------------------------- */

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    const title = drop.querySelector(".dropdown-title");

    if (title) {
        title.addEventListener("click", e => {
            e.stopPropagation();

            dropdowns.forEach(d => {
                if (d !== drop) d.classList.remove("open");
            });

            drop.classList.toggle("open");
        });
    }

    // Activar dropdowns en el menú móvil también
    drop.addEventListener("click", e => {
        if (window.innerWidth < 992) {
            e.stopPropagation();
            drop.classList.toggle("open");
        }
    });
});

// Cerrar dropdowns cuando se hace click fuera
document.addEventListener("click", () => {
    dropdowns.forEach(drop => drop.classList.remove("open"));
});


/* ---------------------------------------------------------
   CARRUSEL 3D DE PLANES
--------------------------------------------------------- */

const cards = document.querySelectorAll(".price-carousel .card");
const leftBtn = document.querySelector(".carousel-controls .left");
const rightBtn = document.querySelector(".carousel-controls .right");

let index = 1; // Siempre empieza en la carta central

function updateCards() {
    cards.forEach(card => card.classList.remove("prev", "active", "next"));

    const prev = (index - 1 + cards.length) % cards.length;
    const next = (index + 1) % cards.length;

    cards[prev].classList.add("prev");
    cards[index].classList.add("active");
    cards[next].classList.add("next");
}

// Mover derecha
rightBtn.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateCards();
});

// Mover izquierda
leftBtn.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCards();
});

// Inicializar carrusel
updateCards();


/* ---------------------------------------------------------
   AUTO-REPARACIÓN EN TELEVISIÓN Y PANTALLAS > 2000px
--------------------------------------------------------- */

function adjustForLargeScreens() {
    if (window.innerWidth > 1900) {
        document.querySelectorAll(".card").forEach(card => {
            card.style.transformOrigin = "center";
        });
    }
}

adjustForLargeScreens();
window.addEventListener("resize", adjustForLargeScreens);


/* ---------------------------------------------------------
   EVITAR BLOQUEOS DEL OVERLAY DEL HERO
--------------------------------------------------------- */

const heroOverlay = document.querySelector(".hero-overlay");
if (heroOverlay) {
    heroOverlay.style.pointerEvents = "none";
}