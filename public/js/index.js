const date_end = document.querySelector("#date-end");
const date_start = document.getElementById("date-start");
const period = document.querySelector("#period");

// автозаполнение срока действия

// date-end
date_end.addEventListener("change", () => {
  const dateStart = new Date(date_start.value);
  const dateEnd = new Date(date_end.value);

  if (date_start.value != "" && dateStart < dateEnd) {
    period.value = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  } else if (date_start.value != "" && date_end.value != "") {
    period.value = 1;
  }
});

// date start
date_start.addEventListener("change", () => {
  const dateStart = new Date(date_start.value);
  const dateEnd = new Date(date_end.value);

  if (date_end.value != "" && dateStart < dateEnd) {
    period.value = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  } else if (date_start.value != "" && date_end.value != "") {
    period.value = 1;
  }
});

// period
period.addEventListener("change", () => {
  const dateEnd = new Date(date_end.value);
  const dateStart = new Date(date_start.value);

  if (date_end.value != "" && date_start.value != "" && dateStart < dateEnd) {
    const newDate = new Date(
      dateStart.setDate(dateStart.getDate() + Number(period.value))
    );

    // console.log(
    //   newDate,
    //   newDate.getFullYear(),
    //   newDate.getMonth(),
    //   newDate.getDate()
    // );
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    date_end.value = `${year}-${month / 10 >= 1 ? month : `0${month}`}-${
      date / 10 >= 1 ? date : `0${date}`
    }`;
  }
});
