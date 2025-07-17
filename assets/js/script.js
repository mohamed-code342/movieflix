'use strict';
/*BUTTON SWITCH TEXT AFTER LOGIN */

document.addEventListener("DOMContentLoaded", function () {
  const signInBtn = document.getElementById("sign-in-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (signInBtn && user && isLoggedIn) {
    signInBtn.textContent = `Hi, ${user.name}`;
    signInBtn.removeAttribute("href");
    signInBtn.style.cursor = "default";

    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";

      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("loggedIn");

        window.location.href = "signin.html";
      });
    }
  } else {
    if (logoutBtn) {
      logoutBtn.style.display = "none";
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {

  /**
   * navbar
   */
  const navOpenBtn = document.querySelector("[data-menu-open-btn]");
  const navCloseBtn = document.querySelector("[data-menu-close-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");
  const navElemArr = [navOpenBtn, navCloseBtn, overlay];

  navElemArr.forEach(elem => {
    elem.addEventListener("click", () => {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("active");
    });
  });

  /**
   * header sticky
   */
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => {
    window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");
  });

  /**
   * go top
   */
  const goTopBtn = document.querySelector("[data-go-top]");
  window.addEventListener("scroll", () => {
    window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");
  });

});

  /**
   * filter
   */
  const searchInput = document.querySelector('.search-input input');
  const yearSelect = document.querySelectorAll('.filter-dropdown select')[0];
  const genreSelect = document.querySelectorAll('.filter-dropdown select')[1];
  const movieCards = document.querySelectorAll('.movie-card');

  function filterMovies() {
    const searchValue = searchInput?.value.trim().toLowerCase();
    const selectedYear = yearSelect?.value;
    const selectedGenre = genreSelect?.value;

    movieCards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.trim().toLowerCase();
      const year = card.querySelector('time').getAttribute('datetime');
      const genreTag = card.querySelector('.genre-tag')?.textContent.trim();

      const matchesSearch = searchValue === '' || title.includes(searchValue);
      const matchesYear = selectedYear === 'Select Year' || year === selectedYear;
      const matchesGenre = selectedGenre === 'Select Genre' || genreTag === selectedGenre;

      if (matchesSearch && matchesYear && matchesGenre) {
        card.parentElement.style.display = 'block';
      } else {
        card.parentElement.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterMovies);
    yearSelect.addEventListener('change', filterMovies);
    genreSelect.addEventListener('change', filterMovies);
  }

  /**
   * FAQ
   */
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      faqItem.classList.toggle('active');
    });
  });

  /**
   * typing text effect
   */
  const words = ["Movies", "TV Shows", "Documentaries", "Series", "Originals"];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = words[i].split("");
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;

    const loopTyping = function () {
      if (word.length > 0) {
        typedText.innerHTML += word.shift();
        timer = setTimeout(loopTyping, 150);
      } else {
        setTimeout(deletingEffect, 1000);
      }
    };
    loopTyping();
  }

  function deletingEffect() {
    let word = words[i].split("");
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;

    const loopDeleting = function () {
      if (word.length > 0) {
        word.pop();
        typedText.innerHTML = word.join("");
        timer = setTimeout(loopDeleting, 100);
      } else {
        i++;
        if (i >= words.length) { i = 0; }
        typingEffect();
      }
    };
    loopDeleting();
  }

  typingEffect();


/*CHECKOUT*/

    const buttons = document.querySelectorAll('.plan-btn');
    const planText = document.getElementById('selected-plan');
    const totalText = document.getElementById('total-amount');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const price = btn.textContent.includes('PREMIUM') ? '$14.99' : '$9.99';
        planText.textContent = price;
        totalText.textContent = price;
      });
    });

