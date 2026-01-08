
document.querySelectorAll(".category").forEach(category => {
  const progressBar = category.querySelector(".progress-bar");
  const icon = category.querySelector(".icon");
  const rightText = category.querySelector(".cat-right span");

  if (!progressBar) return;

  // Read percentage from width
  const percent = parseInt(progressBar.style.width);

  // ❗ REMOVE ALL POSSIBLE OLD COLORS (IMPORTANT)
  progressBar.classList.remove(
    "red", "green", "orange", "yellow", "purple", "blue"
  );
  icon.classList.remove(
    "red", "green", "orange", "yellow", "purple", "blue"
  );
  rightText.classList.remove(
    "red-text", "green-text", "orange-text", "yellow-text"
  );

  // ✅ APPLY NEW THRESHOLD COLORS
  if (percent < 50) {
    progressBar.classList.add("red");
    icon.classList.add("red");
    rightText.classList.add("red-text");
  } 
  else if (percent <= 75) {
    progressBar.classList.add("yellow");
    icon.classList.add("yellow");
    rightText.classList.add("yellow-text");
  } 
  else {
    progressBar.classList.add("green");
    icon.classList.add("green");
    rightText.classList.add("green-text");
  }
});