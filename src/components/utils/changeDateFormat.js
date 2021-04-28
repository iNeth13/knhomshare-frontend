const changeDateFormat = (createdAt) => {
  const date = new Date(new Date(createdAt));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    date: date.getDate(),
    day: day,
    month: month,
    year: date.getFullYear(),
  };
};

export default changeDateFormat;
