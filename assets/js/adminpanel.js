'use strict';

/*admin panel form/table */
document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.getElementById("user-table-body");
  const userForm = document.getElementById("admin-user-form");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  function renderUsers() {
    userTableBody.innerHTML = "";
    users.forEach((user, index) => {
      userTableBody.innerHTML += `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td class="admin-actions">
            <button class="admin-btn delete" onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>
      `;
    });
  }

  /*admin panel delete user */
  window.deleteUser = function(index) {
    if (confirm("Are you sure you want to delete this user?")) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      renderUsers();
    }
  };

  /*add users form*/
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value;
    const role = document.getElementById("newRole").value;

    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
    userForm.reset();
  });

  renderUsers();
});

/*prevent others to login into admin panel */
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn || !user || user.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "moviedashboard.html";
  }
});