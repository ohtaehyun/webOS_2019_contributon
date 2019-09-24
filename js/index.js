const calender = document.querySelector(".calender");
const colGroup = document.querySelector(".col-group");
const calenderHead = document.querySelector(".calender-head");
const calenderBody = document.querySelector(".calender-body");
const calenderRows = document.querySelectorAll(".calender-body tr");

const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const todayInfo = [];
const ZELLER_DAY = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const ZELLER_MONTH = [13, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function getTodayInfo() {
  var d = new Date();
  var date = d.getDate();
  var month = d.getMonth(); // Since getMonth() returns month from 0-11 not 1-12.
  var year = d.getFullYear();
  todayInfo.push(year);
  todayInfo.push(month);
  todayInfo.push(date);
}
function getDayOfWeek(dateStr) {
  console.log(todayInfo);
  const year = todayInfo[0];
  return;
}

function init() {
  getTodayInfo();
  console.log(getDayOfWeek());
}

init();
