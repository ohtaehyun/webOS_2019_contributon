const calender = document.querySelector(".calender");
const colGroup = document.querySelector(".col-group");
const calenderHead = document.querySelector(".calender-head");
const calenderBody = document.querySelector(".calender-body");
const calenderRows = document.querySelectorAll(".calender-body tr");
const decButton = document.querySelector(".dec-button");
const incButton = document.querySelector(".inc-button");
const dateText = document.querySelector(".date-text");
const monthButton = document.querySelector(".month-button");
const weekButton = document.querySelector(".week-button");

const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dayInfo = [];
const ZELLER_DAY = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const ZELLER_MONTH = [13, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let IS_CALENDER_EXTEND = false;

function initDayInfo() {
  var d = new Date();
  var date = d.getDate();
  var month = d.getMonth(); // Since getMonth() returns month from 0-11 not 1-12.
  var year = d.getFullYear();
  dayInfo.push(year);
  dayInfo.push(month);
  dayInfo.push(date);
}

function getDayOfWeek() {
  let year;
  const month = dayInfo[1];
  const day = dayInfo[2];
  console.log(month);
  // Zeller's congurence rule
  if (month < 2) {
    year = dayInfo[0] - 1;
  } else year = dayInfo[0];
  const K = parseInt(year % 100);
  const J = parseInt(year / 100);

  // ZELLER's congruence
  result =
    day +
    parseInt((13 * (ZELLER_MONTH[month] + 1)) / 5) +
    K +
    parseInt(K / 4) +
    parseInt(J / 4) +
    5 * J;
  result = result % 7;
  return ZELLER_DAY[result];
}

function getFirstDay() {
  const month = dayInfo[1];
  let year;

  // Zeller's congurence rule
  if (month < 2) year = dayInfo[0] - 1;
  else year = dayInfo[0];

  const day = 1;
  const K = parseInt(year % 100);
  const J = parseInt(year / 100);
  // ZELLER's congruence
  result =
    day +
    parseInt((13 * (ZELLER_MONTH[month] + 1)) / 5) +
    K +
    parseInt(K / 4) +
    parseInt(J / 4) +
    5 * J;
  result = result % 7;
  return ZELLER_DAY[result];
}

function getMonthDays(month) {
  const year = dayInfo[0];
  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      return 29;
    } else {
      return 28;
    }
  } else if (month == -1) {
    return 31;
  } else {
    return monthDays[month];
  }
}

function calenderExtend(thisMonthDays, monthStart) {
  if (
    thisMonthDays - (7 - monthStart) - 28 > 0 &&
    IS_CALENDER_EXTEND == false
  ) {
    IS_CALENDER_EXTEND = true;
    if (calenderBody.childNodes.length == 6) {
      return;
    }
    tr = document.createElement("tr");
    for (let index = 0; index < 7; index++) {
      tr.appendChild(document.createElement("td"));
    }
    calenderBody.appendChild(tr);
  } else if (
    thisMonthDays - (7 - monthStart) - 28 < 0 &&
    IS_CALENDER_EXTEND == true
  ) {
    IS_CALENDER_EXTEND = false;
    if (calenderBody.childNodes.length == 5) {
      return;
    }
    calenderBody.removeChild(calenderBody.lastChild);
  }
}
function drawWeekCalender() {
  console.log(dayInfo);
  const dayOfWeek = getDayOfWeek();
  const month = dayInfo[1];
  const standardDay = dayInfo[2];
  console.log(dayOfWeek);
  const idx = dayList.indexOf(dayOfWeek);
  console.log("idx:", idx);
  let startWeek = standardDay - idx;
  let lastMonthDays;
  const thisMonthDays = getMonthDays(month);
  if (startWeek < 1) {
    lastMonthDays = getMonthDays(month - 1);
  }

  const calenderCells = document.querySelectorAll(".calender-body td");
  for (let index = 0; index < calenderCells.length; index++) {
    calenderCells[index].innerHTML = "";
    p = document.createElement("p");
    if (startWeek < 1) {
      p.textContent = lastMonthDays + startWeek;
      if (month === 0) {
        p.setAttribute(
          "id",
          dayInfo[0] - 1 + "-" + 12 + "-" + (lastMonthDays + startWeek)
        );
      } else {
        p.setAttribute(
          "id",
          dayInfo[0] + "-" + month + "-" + (lastMonthDays + startWeek)
        );
      }
    } else if (startWeek > thisMonthDays) {
      p.textContent = startWeek - thisMonthDays;
      if (month === 11) {
        p.setAttribute(
          "id",
          dayInfo[0] + 1 + "-" + 1 + "-" + (startWeek - thisMonthDays)
        );
      } else {
        p.setAttribute(
          "id",
          dayInfo[0] + "-" + (month + 2) + "-" + (startWeek - thisMonthDays)
        );
      }
    } else {
      p.textContent = startWeek;
      p.setAttribute("id", dayInfo[0] + "-" + (month + 1) + "-" + startWeek);
    }
    calenderCells[index].appendChild(p);
    startWeek++;
  }
}

function drawMonthCalender() {
  console.log(dayInfo);
  firstDay = getFirstDay();
  const monthStart = dayList.indexOf(firstDay);
  const month = dayInfo[1];

  const thisMonthDays = getMonthDays(month);
  const lastMonthDays = getMonthDays(month - 1);
  calenderExtend(thisMonthDays, monthStart);
  const calenderCells = document.querySelectorAll(".calender-body td");

  for (let index = 0; index < calenderCells.length; index++) {
    const p = document.createElement("p");
    calenderCells[index].innerHTML = "";
    if (index < monthStart) {
      p.classList.add("text-gray");
      p.textContent = lastMonthDays - (monthStart - index) + 1;
      calenderCells[index].appendChild(p);
    } else if (monthStart + thisMonthDays <= index) {
      p.classList.add("text-gray");
      p.textContent = index - (monthStart + thisMonthDays) + 1;
      calenderCells[index].appendChild(p);
    } else {
      p.textContent = index - monthStart + 1;
      calenderCells[index].appendChild(p);
      div = document.createElement("div");
      div.textContent = "Something To do";
      calenderCells[index].appendChild(div);
    }
  }
}

function increaseMonth() {
  const year = dayInfo[0];
  const month = dayInfo[1];
  let nextMonth;
  let nextYear;
  if (month == 11) {
    nextMonth = 0;
    nextYear = year + 1;
    dayInfo[0] = nextYear;
  } else {
    nextMonth = month + 1;
  }
  dayInfo[1] = nextMonth;

  drawMonthCalender();
  setDateText("month");
}

function decreaseMonth() {
  const year = dayInfo[0];
  const month = dayInfo[1];
  let nextMonth;
  let nextYear;
  if (month == 0) {
    nextMonth = 11;
    nextYear = year - 1;
    dayInfo[0] = nextYear;
  } else {
    nextMonth = month - 1;
  }
  dayInfo[1] = nextMonth;
  drawMonthCalender();
  setDateText("month");
}
function setDateText(calenderType) {
  if (calenderType === "month") {
    dateText.innerHTML = dayInfo[0] + "-" + (dayInfo[1] + 1);
  } else if (calenderType === "week") {
    const dayOfWeek = getDayOfWeek();
    const month = dayInfo[1];
    const standardDay = dayInfo[2];
    const idx = dayList.indexOf(dayOfWeek);
    let startWeek = standardDay - idx;
    let lastMonthDays;
    const thisMonthDays = getMonthDays(month);
  }
}

function initMonthCalender() {
  dayInfo[2] = 1;
  incButton.removeEventListener("click", increaseWeek);
  decButton.removeEventListener("click", decreaseWeek);
  incButton.addEventListener("click", increaseMonth);
  decButton.addEventListener("click", decreaseMonth);
  calenderBody.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    tr = document.createElement("tr");
    for (let index = 0; index < 7; index++) {
      td = document.createElement("td");
      tr.appendChild(td);
    }
    calenderBody.appendChild(tr);
  }
  drawMonthCalender();
  setDateText("month");
}

function increaseWeek() {
  const year = dayInfo[0];
  const month = dayInfo[1];
  const day = dayInfo[2];
  const thisMonthDays = getMonthDays(month);

  if (month === 11 && day + 7 > 31) {
    // 연도가 늘어남
    dayInfo[0] = year + 1;
    dayInfo[1] = 0;
    dayInfo[2] = day + 7 - thisMonthDays - 1;
  } else if (day + 7 > thisMonthDays) {
    dayInfo[1] = month + 1;
    dayInfo[2] = day + 7 - thisMonthDays;
  } else {
    dayInfo[2] = day + 7;
  }
  drawWeekCalender();
  setDateText("week");
}
function decreaseWeek() {
  const year = dayInfo[0];
  const month = dayInfo[1];
  const day = dayInfo[2];
  const lastMonthDays = getMonthDays(month - 1);

  if (month === 0 && day - 7 < 1) {
    // 연도가 늘어남
    dayInfo[0] = year - 1;
    dayInfo[1] = 11;
    dayInfo[2] = day - 7 + lastMonthDays;
  } else if (day - 7 < 1) {
    dayInfo[1] = month - 1;
    dayInfo[2] = day - 7 + lastMonthDays;
  } else {
    dayInfo[2] = day - 7;
  }
  drawWeekCalender();
  setDateText("week");
}

function setDayInfoToMonday() {}

function initWeekCalender() {
  // setDayInfoToMonday();
  dayInfo[2] = 1;
  incButton.removeEventListener("click", increaseMonth);
  decButton.removeEventListener("click", decreaseMonth);
  incButton.addEventListener("click", increaseWeek);
  decButton.addEventListener("click", decreaseWeek);
  calenderBody.innerHTML = "";
  tr = document.createElement("tr");
  for (let index = 0; index < 7; index++) {
    td = document.createElement("td");
    tr.appendChild(td);
  }
  calenderBody.appendChild(tr);
  drawWeekCalender();
}

function init() {
  initDayInfo();
  initMonthCalender();
  drawMonthCalender();
  setDateText();
  monthButton.addEventListener("click", initMonthCalender);
  weekButton.addEventListener("click", initWeekCalender);
}

init();
