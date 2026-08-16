const d = document;
/*
------------------------------------------------------------
Navigation Bar Functionality
------------------------------------------------------------
*/
const menuBtn = d.getElementById("menuBtn");
const navLinks = d.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "×" : "☰";
});

d.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

/*
------------------------------------------------------------
Dark Mode Toggle Functionality
------------------------------------------------------------
*/
const themeToggle = d.getElementById("themeToggle");
const currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  }
});
/*
------------------------------------------------------------
Loader
------------------------------------------------------------
*/
d.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    // Hide the loader
    var loader = d.getElementById("loader");
    loader.style.display = "none";

    // Show the main content
    var mainContent = d.querySelector("main");
    mainContent.style.display = "block";
  });
});
