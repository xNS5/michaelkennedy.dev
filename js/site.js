"use strict";

function documentReadyCallback() {

  if (localStorage.getItem("theme") === "dark") {
    document.body.setAttribute("theme", "dark");
    document.querySelectorAll("img, picture, video, pre").forEach(img => img.setAttribute("theme", "dark"));
    document.querySelectorAll(".vimeo, .youtube, .chart").forEach(video => video.setAttribute("theme", "dark"));
    document.getElementById("dark-mode").setAttribute("title", "Switch to light theme");
  }

  document.querySelector(".navbar-burger").addEventListener("click", () => {
    document.querySelector(".navbar-burger").classList.toggle("is-active");
    document.querySelector(".navbar-menu").classList.toggle("is-active");
  });

  document.querySelectorAll("div.navbar-end > .navbar-item").forEach((el) => {
    if (location.href.includes(el.getAttribute("href"))) {
      document.querySelectorAll("a.navbar-item.is-active").forEach(itm => itm.classList.remove("is-active"));
      el.classList.add("is-active");
    }
  })

  if (typeof renderMathInElement !== "undefined") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ]
    });
  }
}

if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', documentReadyCallback);
} else {  // `DOMContentLoaded` has already fired
  documentReadyCallback();
}
