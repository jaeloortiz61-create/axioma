/* ============================================================
   PLOMERÍA 24 HRS LA LLAVE
   Interacciones: reveal on scroll, menú móvil y formulario
   que abre WhatsApp con el mensaje armado.
   ============================================================ */

// WhatsApp del negocio
const WHATSAPP = "524442580965";

/* ---------- Reveal on scroll (con stagger entre hermanos) ---------- */

const reveals = document.querySelectorAll(".reveal");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => {
  const hermanos = el.parentElement
    ? [...el.parentElement.children].filter((h) => h.classList.contains("reveal"))
    : [el];
  const indice = hermanos.indexOf(el);
  el.style.setProperty("--delay", `${Math.min(indice * 0.08, 0.4)}s`);
  observador.observe(el);
});

/* ---------- Menú móvil ---------- */

const burger = document.getElementById("navBurger");
const links = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const abierto = links.classList.toggle("is-open");
  burger.classList.toggle("is-open", abierto);
  burger.setAttribute("aria-expanded", String(abierto));
  burger.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});

links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Formulario → WhatsApp ---------- */

const form = document.getElementById("formPlomeria");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(form);
  const nombre = (datos.get("nombre") || "").toString().trim();
  const colonia = (datos.get("colonia") || "").toString().trim();
  const urgencia = (datos.get("urgencia") || "").toString();
  const problema = (datos.get("problema") || "").toString();
  const mensaje = (datos.get("mensaje") || "").toString().trim();

  const texto =
    `Hola, necesito un plomero.\n\n` +
    `*Nombre:* ${nombre}\n` +
    (colonia ? `*Colonia:* ${colonia}\n` : "") +
    `*Urgencia:* ${urgencia}\n` +
    `*Problema:* ${problema}\n` +
    (mensaje ? `*Detalles:* ${mensaje}` : "");

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
});

/* ---------- Año del footer ---------- */

document.getElementById("anio").textContent = new Date().getFullYear();
