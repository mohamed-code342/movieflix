'use strict';

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("playlist-container");
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  /* Render the Watchlist if the container exists */
  function renderWatchlist() {
    if (!container) return;

    container.innerHTML = "";

    if (watchlist.length === 0) {
      container.innerHTML = "<p class='empty-msg'>No movies added yet.</p>";
      return;
    }

    watchlist.forEach((movie, index) => {
      const card = document.createElement("div");
      card.classList.add("movie-card-library");
      card.setAttribute("data-index", index);
      card.innerHTML = `
        <div class="card-banner-library">
          <img src="${movie.img}" alt="${movie.title}" />
        </div>
        <h3 class="card-title-library">${movie.title}</h3>
        <button class="remove-btn">Remove</button>
      `;
      container.appendChild(card);
    });
  }

  renderWatchlist();

  /* Remove from Watchlist when clicking remove button */
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const card = e.target.closest(".movie-card-library");
      const index = parseInt(card.getAttribute("data-index"));

      watchlist.splice(index, 1);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      renderWatchlist();
    }
  });

  /* Add to Watchlist when clicking a watchlist button in movie details*/
  document.querySelectorAll(".watchlist-btn").forEach(button => {
    button.addEventListener("click", () => {
      const movie = {
        title: button.dataset.title,
        img: button.dataset.img,
      };

      let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

      if (!watchlist.some(item => item.title === movie.title)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Added to Watchlist!");
      } else {
        alert("Already in Watchlist!");
      }
    });
  });

});
