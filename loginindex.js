/* =========================
   FIREBASE IMPORTS
========================= */
import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   UI STATE
========================= */
let isLogin = true;

/* =========================
   TAB SWITCH
========================= */
function showLogin() {
  isLogin = true;
  document.querySelector(".login-btn").innerText = "Log In";
  setActiveTab(0);
  document.getElementById("nameGroup").style.display = "none";
}

function showSignup() {
  isLogin = false;
  document.querySelector(".login-btn").innerText = "Sign Up";
  setActiveTab(1);
  document.getElementById("nameGroup").style.display = "block";
}

function setActiveTab(index) {
  document.querySelectorAll(".tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
}

/* =========================
   PASSWORD TOGGLE
========================= */
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggle.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    password.type = "password";
    toggle.classList.replace("fa-eye", "fa-eye-slash");
  }
});

/* =========================
   LOGIN / SIGNUP
========================= */
async function handleAuth() {
  const email = document.getElementById("email").value.trim();
  const pass = password.value.trim();

  if (!email || !pass) {
    alert("Please fill all fields ❗");
    return;
  }

  try {
    if (isLogin) {
      // 🔹 LOGIN
      await signInWithEmailAndPassword(auth, email, pass);
      alert("Login successful 🎉");
      window.location.href = "dashboard.html";

    } else {
      // 🔹 SIGN UP
      const name = document.getElementById("name").value.trim();
      if (!name) {
        alert("Please enter your name ❗");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      // 🔹 CREATE USER DOCUMENT IN FIRESTORE
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: serverTimestamp()
      });

      alert("Account created successfully 🎉\nPlease login now");
      showLogin();
    }
  } catch (error) {
    alert(error.message);
  }
}

/* =========================
   FORGOT PASSWORD
========================= */
async function forgotPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Enter your email first ❗");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent to " + email);
  } catch (error) {
    alert(error.message);
  }
}

/* =========================
   GOOGLE LOGIN (PLACEHOLDER)
========================= */
function googleLogin() {
  alert("Google Login – Coming Soon 🚀");
}

/* =========================
   MAKE FUNCTIONS GLOBAL
========================= */
window.handleAuth = handleAuth;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.forgotPassword = forgotPassword;
window.googleLogin = googleLogin;
