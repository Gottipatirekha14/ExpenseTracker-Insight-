
// Charts (same as before)
new Chart(document.getElementById("trendChart"), {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      data: [40,60,55,90,50,80,65],
      borderColor: "#1fd365",
      backgroundColor: "rgba(31,211,101,0.2)",
      fill: true,
      tension: 0.4
    }]
  },
  options: { plugins: { legend: { display: false } } }
});

new Chart(document.getElementById("categoryChart"), {
  type: "doughnut",
  data: {
    labels: ["Food","Transport","Shopping","Others"],
    datasets: [{
      data: [35,25,20,20],
      backgroundColor: ["#1fd365","#48cae4","#ffb703","#9aa0a6"]
    }]
  },
  options: {
    plugins: { legend: { labels: { color: "#ffffff" } } }
  }
});

/* TAB + CALENDAR LOGIC */
let currentType = "day";

const tabs = document.querySelectorAll(".tab");
const dayBox = document.getElementById("dayBox");
const monthBox = document.getElementById("monthBox");
const yearBox = document.getElementById("yearBox");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentType = tab.dataset.type;
    updateCalendar();
  });
});

function updateCalendar() {
  dayBox.classList.add("hidden");
  monthBox.classList.add("hidden");
  yearBox.classList.add("hidden");

  if (currentType === "day") dayBox.classList.remove("hidden");
  if (currentType === "month") monthBox.classList.remove("hidden");
  if (currentType === "year") yearBox.classList.remove("hidden");
}

updateCalendar();
function goBack() {
  window.location.href = "dashboard.html";
}