/* Countdown Functions */
const getDate = async () => {
  try {
    const res = await fetch(
      "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Manila"
    );

    if(!res.ok) return null;
    const data = await res.json();
    return data.dateTime.slice(0, 23);
  }
  catch(error) { return null; }
}

const getTimeOffset = async () => {
  const apiDate = await getDate();
  if(!apiDate) return 0;
  return new Date(apiDate).getTime() - Date.now();
}

const updateCountdown = (weddingDate, timeOffset) => {
  const countdownEl = document.querySelector(".countdown");
  const finishedEl = document.querySelector(".countdown-finished");

  const now = new Date(Date.now() + timeOffset);
  const gap = weddingDate - now;

  if(gap <= 0) {
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const weddingDay = new Date(weddingDate);
    weddingDay.setHours(0, 0, 0, 0);

    if(today > weddingDay) { //day after wedding
      const textSpan = document.querySelector(".finished-text span");
      const textH2 = document.querySelector(".finished-text h2");

      textSpan.textContent = "With Love & Gratitude";
      textH2.textContent = "Thank You for Celebrating";
    }

    countdownEl.classList.add("hidden");
    finishedEl.classList.remove("hidden");
    return;
  }
  countdownEl.classList.remove("hidden");
  finishedEl.classList.add("hidden");

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(gap / day);
  const hours = Math.floor((gap % day) / hour);
  const minutes = Math.floor((gap % hour) / minute);
  const seconds = Math.floor((gap % minute) / second);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}

/* Initiate timer countdown */
const runWeddingTimer = (weddingDateData) => {
  const weddingDate = new Date(weddingDateData).getTime();
  let timeOffset = 0;

  // start countdown immediately
  const interval = setInterval(() => {
    updateCountdown(weddingDate, timeOffset);
  }, 1000);

  updateCountdown(weddingDate, timeOffset);

  // fetch offset in background
  getTimeOffset().then((offset) => {
    timeOffset = offset;
  });
};




