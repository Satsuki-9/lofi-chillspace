const calendarGrid = document.getElementById("calendar-grid");
const calendarMonth = document.getElementById("calendar-month");

const today = new Date(); //date for calendar

const monthNames = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

calendarMonth.textContent =
`${monthNames[today.getMonth()]} ${today.getFullYear()}`;

const daysInMonth =
new Date(
today.getFullYear(),
today.getMonth()+1,
0
).getDate();

for(let day=1; day<=daysInMonth; day++){

    const cell =
    document.createElement("div");
    cell.classList.add("calendar-day");
    cell.textContent = day;
    if(day === today.getDate()){
        cell.classList.add("today");
    }
    calendarGrid.appendChild(cell);
}