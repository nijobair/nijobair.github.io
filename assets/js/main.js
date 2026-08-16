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
/*
------------------------------------------------------------
Form Submission Handling
------------------------------------------------------------
*/
d.addEventListener("DOMContentLoaded", function () {
  var form = d.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector(".form-submit");
    var emailInput = form.querySelector("#email").value;
    var allowedDomains = [
      "gmail.com",
      "outlook.com",
      "yahoo.com",
      "hotmail.com",
      "icloud.com",
    ];
    var emailDomain = emailInput.split("@")[1].toLowerCase();

    // Client-side domain validation
    if (!allowedDomains.includes(emailDomain)) {
      alert(
        "Only well-known email providers (Gmail, Outlook, Yahoo, etc.) are accepted.",
      );
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // URLSearchParams is used to avoid CORS preflight errors with Google Scripts
    var formData = new FormData(form);
    var data = new URLSearchParams(formData);

    // The copied Web App URL must be inserted here
    var webAppUrl = "https://script.google.com/macros/s/AKfycby23hACQebMybzq9fauJKvHmnP8BMvaDf2g_IuB1kcNBwldXo4dh4uBDGLMdd8Dd60D/exec";

    fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors", // This is important to avoid CORS issues
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.result === "success") {
          alert("Message sent successfully.");
          form.reset();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch(function (error) {
        alert("An error occurred while sending the message.");
      })
      .finally(function () {
        submitBtn.textContent = "Send Message →";
        submitBtn.disabled = false;
      });
  });
});
