//For background sky image change based on time of day
const roomSky = document.querySelector(".room-sky img");
const hour = new Date().getHours();

if (hour >= 4 && hour <= 7) {
    roomSky.src = "image/background/window-sunset.png";
}
else if (hour >= 8 && hour <= 16) {
    roomSky.src = "image/background/window-day.png";
}
else if (hour >= 17 && hour <= 18) {
    roomSky.src = "image/background/window-sunset.png";
}
else {
    roomSky.src = "image/background/window-night.png";
}

console.log("Current Hour:", hour);
//For live clock and date display
const liveTime = document.getElementById("live-time");
const liveDate = document.getElementById("live-date");
function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;
    minutes = minutes.toString().padStart(2, "0");
    liveTime.textContent = `${hours}:${minutes} ${period}`;

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    liveDate.textContent =
        now.toLocaleDateString("en-US", options);

}
setInterval(updateClock, 1000);


