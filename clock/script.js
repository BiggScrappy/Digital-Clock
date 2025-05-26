const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const ampm = document.getElementById("ampm");
const dateEl = document.getElementById("date");

const toggleFormatBtn = document.getElementById("toggleFormatBtn");
const toggleSecondsBtn = document.getElementById("toggleSecondsBtn");
const themeSelector = document.getElementById("themeSelector");

let is24Hour = false;
let showSeconds = true;

// Format time with leading zero
function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPmText = "";

  if (!is24Hour) {
    amPmText = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  }

  hrs.textContent = formatTimeUnit(hours);
  min.textContent = formatTimeUnit(minutes);

  if (showSeconds) {
    sec.textContent = formatTimeUnit(seconds);
    sec.style.display = "inline-block";
    document.querySelectorAll(".colon")[1].style.display = "inline-block"; // second colon
  } else {
    sec.style.display = "none";
    document.querySelectorAll(".colon")[1].style.display = "none"; // hide colon after minutes if no seconds
  }

  ampm.textContent = is24Hour ? "" : amPmText;

  // Update date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

// Initial update
updateClock();

// Update every second
setInterval(updateClock, 1000);

// Toggle 12/24 hour format
toggleFormatBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;
  toggleFormatBtn.textContent = is24Hour
    ? "Switch to 12-hour"
    : "Switch to 24-hour";
  updateClock();
});

// Toggle seconds display
toggleSecondsBtn.addEventListener("click", () => {
  showSeconds = !showSeconds;
  toggleSecondsBtn.textContent = showSeconds ? "Hide Seconds" : "Show Seconds";
  updateClock();
});

// Theme selector
themeSelector.addEventListener("change", (e) => {
  if (e.target.value === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
});
