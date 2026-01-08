/* LOGIN → DASHBOARD */
function login() {
  localStorage.setItem("loggedIn", "true");
  window.location.href = "dashboard.html";
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

/* NAVIGATION */
function goToDashboard() {
  window.location.href = "dashboard.html";
}

function goToAddTransaction() {
  window.location.href = "add-transaction.html";
}

function goToCategories() {
  window.location.href = "categories.html";
}

/* BACK */
function goBack() {
  window.history.back();
}

/* PAGE PROTECTION */
function protectPage() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
}
