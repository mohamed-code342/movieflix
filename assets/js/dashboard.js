'use strict';
document.addEventListener("DOMContentLoaded", function () {
  /*add a log out button when logged in on dashboard*/ 
  const signInBtn = document.getElementById("sign-in-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (signInBtn && user && isLoggedIn) {
    signInBtn.textContent = `Hi, ${user.name}`;
    signInBtn.removeAttribute("href");
    signInBtn.style.cursor = "pointer";

    if (logoutBtn) {
      logoutBtn.style.display = "none";

      signInBtn.addEventListener("click", () => {
        logoutBtn.style.display = logoutBtn.style.display === "block" ? "none" : "block";
      });
    }
  }
});

/*access only if logged in*/
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      alert("You must be logged in to access your dashboard.");
      window.location.href = "signin.html";
    }
  });
