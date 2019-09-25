const calender = document.querySelector(".calender");
const colGroup = document.querySelector(".col-group");
const calenderHead = document.querySelector(".calender-head");
const calenderBody = document.querySelector(".calender-body");
const calenderRows = document.querySelectorAll(".calender-body tr");
const decButton = document.querySelector(".dec-button");
const incButton = document.querySelector(".inc-button");
const dateText = document.querySelector(".date-text");

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
  const year = dayInfo[0];
  const month = dayInfo[1];
  const day = dayInfo[2];
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
  } else {
    return monthDays[month];
  }
}

function calenderExtend(thisMonthDays, monthStart) {
  if (
    thisMonthDays - (7 - monthStart) - 28 > 0 &&
    IS_CALENDER_EXTEND == false
  ) {
    tr = document.createElement("tr");
    for (let index = 0; index < 7; index++) {
      tr.appendChild(document.createElement("td"));
    }
    IS_CALENDER_EXTEND = true;
    calenderBody.appendChild(tr);
  } else if (
    thisMonthDays - (7 - monthStart) - 28 < 0 &&
    IS_CALENDER_EXTEND == true
  ) {
    IS_CALENDER_EXTEND = false;
    calenderBody.removeChild(calenderBody.lastChild);
  }
}

function drawCalender() {
  firstDay = getFirstDay();
  const monthStart = dayList.indexOf(firstDay);
  const month = dayInfo[1];
  let lastMonth;
  if (month == 0) {
    lastMonth = 11;
  } else {
    lastMonth = month - 1;
  }

  const thisMonthDays = getMonthDays(month);
  const lastMonthDays = getMonthDays(lastMonth);
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

  drawCalender();
  setDateText();
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
  drawCalender();
  setDateText();
}
function setDateText() {
  dateText.innerHTML = dayInfo[0] + "-" + (dayInfo[1] + 1);
}
function init() {
  initDayInfo();
  drawCalender();
  setDateText();
  incButton.addEventListener("click", increaseMonth);
  decButton.addEventListener("click", decreaseMonth);
}

init();
