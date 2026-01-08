/* =========================
   FIREBASE IMPORTS
========================= */
import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const signoutBtn = document.getElementById("signoutBtn");
  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const profileImgEl = document.getElementById("profileImg");
  const userIconEl = document.querySelector(".user-icon");
  const streakEl = document.getElementById("streakCount");
  const totalEl = document.querySelector(".total-box h1");

  /* =========================
     CURRENCY RATES
     (BASE = INR)
  ========================= */
  const rates = {
    INR: 1,
    USD: 1 / 83,
    EUR: 1 / 90
  };

  /* =========================
     APPLY CURRENCY
  ========================= */
  function applyCurrency() {
    let saved = JSON.parse(localStorage.getItem("currency"));

    // ✅ DEFAULT TO INR
    if (!saved) {
      saved = { code: "INR", symbol: "₹" };
      localStorage.setItem("currency", JSON.stringify(saved));
    }

    const balanceINR = Number(localStorage.getItem("balance")) || 0;
    const converted = balanceINR * rates[saved.code];

    totalEl.innerText = `${saved.symbol}${converted.toFixed(2)}`;
  }

  window.setCurrency = function (code, symbol) {
    localStorage.setItem("currency", JSON.stringify({ code, symbol }));
    closeCurrency();
    applyCurrency();
  };

  window.openCurrency = () =>
    document.getElementById("currencyModal").classList.remove("hidden");

  window.closeCurrency = () =>
    document.getElementById("currencyModal").classList.add("hidden");

  /* =========================
     LOAD PROFILE DATA
  ========================= */
  async function loadProfile() {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      userNameEl.innerText = data.name || user.email.split("@")[0];
      userEmailEl.innerText = data.email;
    }

    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) {
      profileImgEl.src = savedImg;
      profileImgEl.classList.remove("hidden");
      userIconEl.classList.add("hidden");
    }
  }

  /* =========================
     STREAK CALCULATION
  ========================= */
  function calculateStreak() {
    const transactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    if (transactions.length === 0) {
      streakEl.innerText = "0 Days";
      return;
    }

    const uniqueDays = new Set(
      transactions.map(t => {
        const d = new Date(t.time);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );

    const days = [...uniqueDays].sort((a, b) => b - a);
    let streak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day of days) {
      const diff = (today - day) / 86400000;
      if (diff === streak) streak++;
      else break;
    }

    streakEl.innerText = `${streak} Day${streak !== 1 ? "s" : ""}`;
  }

  /* =========================
     LOGOUT
  ========================= */
  signoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.href = "loginindex.html";
    } catch {
      alert("Logout failed");
    }
  });

  /* =========================
     NAVIGATION
  ========================= */
  window.goBack = () => window.location.href = "dashboard.html";
  window.editProfile = () => alert("Edit profile coming soon");

  /* =========================
     AUTH STATE CHECK
  ========================= */
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "loginindex.html";
    } else {
      loadProfile();
      applyCurrency();     // ✅ SAME AS DASHBOARD
      calculateStreak();
    }
  });

});
