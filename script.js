// selected element of Dom
const dados = Array(document.querySelectorAll(".box_birthday input"));
const enviar = document.querySelector("button");
const txtErrorDay = document.querySelector(".dados_day p");
const txtErrorMonth = document.querySelector(".dados_month p");
const txtErrorYear = document.querySelector(".dados_year p");
const colorErrorDay = Array(document.querySelectorAll(".box_birthday div"));
const textresultYear = document.querySelector(".years");
const textresultMonth = document.querySelector(".months");
const textresultDay = document.querySelector(".days");

// list event for submit button
enviar.addEventListener("click", () => {
  // getting input values
  const day = dados[0][0].value;
  const month = dados[0][1].value;
  const year = dados[0][2].value;

  // variable to control error message number
  const colorErrorDays = colorErrorDay[0][0];
  const colorErrorMonths = colorErrorDay[0][1];
  const colorErrorYears = colorErrorDay[0][2];

  // getting the current year
  const date = new Date();
  const currentYear = date.getFullYear();

  // finding months with less than 31 days
  const isFebruary = month == 2 ? true : false;
  const validMonths = ["4", "6", "9", "11"].includes(month);

  // function to check if a year is a leap year
  isLeapYear = (year) => {
    return (year % 4 === 0 && year % 400 === 0) || year % 100 != 0;
  };

  // result days, months and years
  const resultYears = currentYear - year;
  const resultMonths = resultYears * 12 - month;
  let numberOfLeapYears = 0;
  for (let i = year; i < currentYear; i++) {
    if (isLeapYear(i)) {
      numberOfLeapYears++;
    }
  }
  // result days, months and years
  const resultDays = 31 * resultMonths - day - 7 + numberOfLeapYears;

  if (day != "" && month != "" && year != "") {
    // checking day

    if (
      day < 1 ||
      day > 31 ||
      (isFebruary && day > 28 && isLeapYear(year) == false) ||
      (isFebruary && day > 29 && isLeapYear(year)) ||
      (validMonths && day > 30)
    ) {
      txtErrorDay.innerHTML = "Must be a valid day";
      colorErrorDays.classList.add("active");
    } else {
      colorErrorDays.classList.remove("active");
      txtErrorDay.innerHTML = "";
      textresultDay.textContent = `${resultDays}`;
    }
    // checking months
    if (month < 1 || month > 12) {
      colorErrorMonths.classList.add("active");
      txtErrorMonth.innerHTML = "Must be a valid month";
    } else {
      colorErrorMonths.classList.remove("active");
      txtErrorMonth.innerHTML = "";
      textresultMonth.textContent = `${resultMonths}`;
    }
    // checking years
    if (year < 1970 || year > currentYear) {
      colorErrorYears.classList.add("active");
      txtErrorYear.innerHTML = "Must be a valid year";
    } else {
      colorErrorYears.classList.remove("active");
      txtErrorYear.innerHTML = "";
      textresultYear.textContent = `${resultYears}`;
    }
    //  if any error occurs
    if (
      txtErrorYear.textContent != "" ||
      txtErrorMonth.textContent != "" ||
      txtErrorDay.textContent != ""
    ) {
      textresultYear.textContent = "--";
      textresultMonth.textContent = "--";
      textresultDay.textContent = "--";
    }
  }
});
