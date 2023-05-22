const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function getNumberSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export const getXAxisDate = (
  currentyear: number,
  currentmonth: number,
  currentday: number
) => {
  const x_axis_dates = [];
  currentday = currentday + 1;
  for (let i = 0; i < 7; i++) {
    currentday = currentday - 1;
    if (currentday < 1) {
      const nextMonth: any = new Date(currentyear, currentmonth, 1);
      const lastDay = new Date(nextMonth - 1);

      currentmonth = currentmonth - 1;
      currentday = lastDay.getDate();
    }

    const suffix = getNumberSuffix(currentday);
    x_axis_dates.push([`${currentday}${suffix} ${months[currentmonth]}`]);
  }
  x_axis_dates.reverse();
  return x_axis_dates;
};
