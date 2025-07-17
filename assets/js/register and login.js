'use strict';

/*Register*/
document.addEventListener("DOMContentLoaded", function () {
  const regForm = document.querySelector(".register-form");
  if (!regForm) return;

  regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = document.querySelectorAll(".input-field");
    const name = fields[0].value.trim();
    const email = fields[1].value.trim();
    const password = fields[2].value;
    const confirmPassword = fields[3].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
      alert("Email already registered.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("✅ Registration successful!");
    console.log("✅ User registered:", newUser);
    window.location.href = "moviedashboard.html";
  });
});

/*login*/

document.addEventListener("DOMContentLoaded", function () {
const loginBtn = document.getElementById("real-signin-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const fields = document.querySelectorAll(".input-field");
    const email = fields[0].value.trim();
    const password = fields[1].value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user =>
      user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(foundUser));

      if (foundUser.role === "admin") {
        window.location.href = "adminpanel.html";
      } else {
        window.location.href = "moviedashboard.html";
      }

    } else {
      alert("Incorrect email or password.");
    }
  });
}
});
