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
  const hourAndMinute =
    date.getHours() < 12
      ? `${date.getHours()}:${date.getMinutes()}am`
      : `${date.getHours() - 12}:${date.getMinutes()}pm`;
  return {
    hourAndMinute,
    date: date.getDate(),
    day: day,
    month: month,
    year: date.getFullYear(),
  };
};

export default changeDateFormat;
