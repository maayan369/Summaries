if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

document.addEventListener("contextmenu", e => e.preventDefault());

const summaryPages = {
  1: 2,
  2: 1,
  3: 1,
  4: 0
};

function showSummary(num) {
  const container = document.getElementById("summaryImage");
  container.innerHTML = "";

  const pages = summaryPages[num] || 1;

  for (let i = 1; i <= pages; i++) {
    const img = document.createElement("img");
    img.src = `images/summary${num}.${i}.jpg`;
    img.alt = `סיכום ${num} עמוד ${i}`;
    img.className = "summary-page";
    container.appendChild(img);
  }

  document.getElementById("summaryButtons").style.display = "none";
  document.getElementById("backButton").style.display = "inline-block";
}

function goBack() {
  document.getElementById("summaryImage").innerHTML = "";
  document.getElementById("summaryButtons").style.display = "block";
  document.getElementById("backButton").style.display = "none";
}

function detectDevTools() {
  const start = new Date();
  debugger;
  const end = new Date();
  if (end - start > 100) {
    showBlocker();
  }
}
setInterval(detectDevTools, 1000);

// זיהוי לחיצה על Print Screen (לא מונע באמת, רק מזהה ומגיב)
window.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen") {
    showBlocker();
  }
});

function showBlocker() {
  const blocker = document.getElementById("blockScreen");
  blocker.style.display = "flex";
  setTimeout(() => {
    blocker.style.display = "none";
  }, 3000);
}
